// File: auth.js (updated)
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "./async.js";
import ErrorResponse from "../utils/errorResponse.js";

// Protect routes
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.refreshToken) {
    token = req.cookies.refreshToken;
  }
  // Also check for token in the body (for registration)
  else if (req.body?.token) {
    token = req.body.token;
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    // Verify token - use the correct secret based on token type
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (accessError) {
      // If access token fails, try refresh token
      decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    }

    // Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new ErrorResponse(
          "The user belonging to this token no longer exists",
          401
        )
      );
    }

    // Grant access to protected route
    req.userId = currentUser._id;
    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});

// Role-based authorization
export const restrictTo = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.userId);

    if (!roles.includes(user.role)) {
      return next(
        new ErrorResponse(
          "You do not have permission to perform this action",
          403
        )
      );
    }

    next();
  });
};
