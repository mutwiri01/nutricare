import Booking from "../models/Booking.js";
import User from "../models/User.js";
import sendEmail from "../utils/emailService.js";

// @desc    Create new booking
// @route   POST /api/v1/bookings
// @access  Private
export const createBooking = async (req, res, next) => {
  try {
    const { userId } = req;
    const {
      serviceType,
      consultationType,
      cluster,
      date,
      time,
      condition,
      notes,
    } = req.body;

    // Create booking
    const booking = await Booking.create({
      user: userId,
      serviceType,
      consultationType,
      cluster,
      date,
      time,
      condition,
      notes,
    });

    // Get user details
    const user = await User.findById(userId);

    // Send confirmation email
    await sendEmail({
      email: user.email,
      subject: "Booking Confirmation",
      template: "booking-confirmation",
      context: {
        name: user.name,
        serviceType,
        date: new Date(date).toLocaleDateString(),
        time,
        consultationType,
      },
    });

    res.status(201).json({
      success: true,
      data: {
        booking,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bookings for current user
// @route   GET /api/v1/bookings
// @access  Private
export const getMyBookings = async (req, res, next) => {
  try {
    const { userId } = req;

    const bookings = await Booking.find({ user: userId })
      .sort({ date: 1 })
      .populate("user", "name email phone");

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

// @desc    Get single booking
// @route   GET /api/v1/bookings/:id
// @access  Private
export const getBooking = async (req, res, next) => {
  try {
    const { userId } = req;
    const { id } = req.params;

    const booking = await Booking.findOne({
      _id: id,
      user: userId,
    }).populate("user", "name email phone");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

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

// @desc    Update booking
// @route   PUT /api/v1/bookings/:id
// @access  Private
export const updateBooking = async (req, res, next) => {
  try {
    const { userId } = req;
    const { id } = req.params;
    const { date, time, notes } = req.body;

    let booking = await Booking.findOne({
      _id: id,
      user: userId,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Only allow updating certain fields
    if (date) booking.date = date;
    if (time) booking.time = time;
    if (notes) booking.notes = notes;

    await booking.save();

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

// @desc    Cancel booking
// @route   DELETE /api/v1/bookings/:id
// @access  Private
export const cancelBooking = async (req, res, next) => {
  try {
    const { userId } = req;
    const { id } = req.params;

    const booking = await Booking.findOneAndUpdate(
      {
        _id: id,
        user: userId,
        status: { $ne: "completed" },
      },
      { status: "cancelled" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found or cannot be cancelled",
      });
    }

    // Get user details
    const user = await User.findById(userId);

    // Send cancellation email
    await sendEmail({
      email: user.email,
      subject: "Booking Cancellation",
      template: "booking-cancellation",
      context: {
        name: user.name,
        serviceType: booking.serviceType,
        date: new Date(booking.date).toLocaleDateString(),
        time: booking.time,
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
