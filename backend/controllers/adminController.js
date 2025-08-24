import Booking from "../models/Booking.js";
import Webinar from "../models/Webinar.js";
import User from "../models/User.js";
import SupportTicket from "../models/SupportTicket.js";
import sendEmail from "../utils/emailService.js";

// @desc    Get all bookings (Admin)
// @route   GET /api/v1/admin/bookings
// @access  Private/Admin
export const getBookings = async (req, res, next) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Booking.find(JSON.parse(queryStr)).populate(
      "user",
      "name email phone"
    );

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("date");
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const bookings = await query;

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: {
        bookings,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Confirm booking (Admin)
// @route   PUT /api/v1/admin/bookings/:id/confirm
// @access  Private/Admin
export const confirmBooking = async (req, res, next) => {
  try {
    const { meetingLink } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: "confirmed",
        ...(meetingLink && { meetingLink }),
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate("user", "name email phone");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Send confirmation email
    await sendEmail({
      email: booking.user.email,
      subject: "Booking Confirmed",
      template: "booking-confirmed",
      context: {
        name: booking.user.name,
        serviceType: booking.serviceType,
        date: new Date(booking.date).toLocaleDateString(),
        time: booking.time,
        meetingLink: booking.meetingLink || "N/A",
      },
    });

    res.status(200).json({
      success: true,
      data: {
        booking,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users (Admin)
// @route   GET /api/v1/admin/users
// @access  Private/Admin
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password -refreshToken");

    res.status(200).json({
      success: true,
      count: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user role (Admin)
// @route   PUT /api/v1/admin/users/:id
// @access  Private/Admin
export const updateUser = async (req, res, next) => {
  try {
    const { isAdmin } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isAdmin },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password -refreshToken");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard stats (Admin)
// @route   GET /api/v1/admin/stats
// @access  Private/Admin
export const getStats = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalBookings,
      totalWebinars,
      pendingBookings,
      openTickets,
    ] = await Promise.all([
      User.countDocuments(),
      Booking.countDocuments(),
      Webinar.countDocuments(),
      Booking.countDocuments({ status: "pending" }),
      SupportTicket.countDocuments({ status: "open" }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalBookings,
          totalWebinars,
          pendingBookings,
          openTickets,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
