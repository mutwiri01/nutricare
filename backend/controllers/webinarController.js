import Webinar from "../models/Webinar.js";
import User from "../models/User.js";
import sendEmail from "../utils/emailService.js";

// @desc    Get all webinars
// @route   GET /api/v1/webinars
// @access  Public
export const getWebinars = async (req, res, next) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Webinar.find(JSON.parse(queryStr));

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

    const webinars = await query;

    res.status(200).json({
      success: true,
      count: webinars.length,
      data: {
        webinars,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single webinar
// @route   GET /api/v1/webinars/:id
// @access  Public
export const getWebinar = async (req, res, next) => {
  try {
    const webinar = await Webinar.findById(req.params.id);

    if (!webinar) {
      return res.status(404).json({
        success: false,
        message: "Webinar not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        webinar,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Register for webinar
// @route   POST /api/v1/webinars/:id/register
// @access  Private
export const registerForWebinar = async (req, res, next) => {
  try {
    const { userId } = req;
    const webinar = await Webinar.findById(req.params.id);

    if (!webinar) {
      return res.status(404).json({
        success: false,
        message: "Webinar not found",
      });
    }

    // Check if already registered
    if (webinar.attendees.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "Already registered for this webinar",
      });
    }

    // Check if webinar is full
    if (webinar.attendees.length >= webinar.maxAttendees) {
      return res.status(400).json({
        success: false,
        message: "Webinar is full",
      });
    }

    // Add user to attendees
    webinar.attendees.push(userId);
    await webinar.save();

    // Get user details
    const user = await User.findById(userId);

    // Send confirmation email
    await sendEmail({
      email: user.email,
      subject: "Webinar Registration Confirmation",
      template: "webinar-registration",
      context: {
        name: user.name,
        webinarTitle: webinar.title,
        date: new Date(webinar.date).toLocaleDateString(),
        time: webinar.time,
        meetingLink: webinar.meetingLink || "Will be provided later",
      },
    });

    res.status(200).json({
      success: true,
      message: "Registered for webinar successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get my registered webinars
// @route   GET /api/v1/webinars/my-webinars
// @access  Private
export const getMyWebinars = async (req, res, next) => {
  try {
    const { userId } = req;

    const webinars = await Webinar.find({ attendees: userId }).sort({
      date: 1,
    });

    res.status(200).json({
      success: true,
      count: webinars.length,
      data: {
        webinars,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create webinar (Admin only)
// @route   POST /api/v1/webinars
// @access  Private/Admin
export const createWebinar = async (req, res, next) => {
  try {
    const {
      title,
      description,
      date,
      time,
      duration,
      speaker,
      thumbnail,
      maxAttendees,
    } = req.body;

    const webinar = await Webinar.create({
      title,
      description,
      date,
      time,
      duration,
      speaker,
      thumbnail,
      maxAttendees,
    });

    res.status(201).json({
      success: true,
      data: {
        webinar,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update webinar (Admin only)
// @route   PUT /api/v1/webinars/:id
// @access  Private/Admin
export const updateWebinar = async (req, res, next) => {
  try {
    const webinar = await Webinar.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!webinar) {
      return res.status(404).json({
        success: false,
        message: "Webinar not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        webinar,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete webinar (Admin only)
// @route   DELETE /api/v1/webinars/:id
// @access  Private/Admin
export const deleteWebinar = async (req, res, next) => {
  try {
    const webinar = await Webinar.findByIdAndDelete(req.params.id);

    if (!webinar) {
      return res.status(404).json({
        success: false,
        message: "Webinar not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
