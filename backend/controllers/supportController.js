import SupportTicket from "../models/SupportTicket.js";
import User from "../models/User.js";
import sendEmail from "../utils/emailService.js";

// @desc    Create support ticket
// @route   POST /api/v1/support
// @access  Private
export const createTicket = async (req, res, next) => {
  try {
    const { userId } = req;
    const { subject, message, priority } = req.body;

    const ticket = await SupportTicket.create({
      user: userId,
      subject,
      message,
      priority,
    });

    // Get user details
    const user = await User.findById(userId);

    // Send confirmation email
    await sendEmail({
      email: user.email,
      subject: "Support Ticket Created",
      template: "ticket-created",
      context: {
        name: user.name,
        ticketId: ticket._id,
        subject,
        message,
      },
    });

    res.status(201).json({
      success: true,
      data: {
        ticket,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get my support tickets
// @route   GET /api/v1/support/my-tickets
// @access  Private
export const getMyTickets = async (req, res, next) => {
  try {
    const { userId } = req;

    const tickets = await SupportTicket.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: tickets.length,
      data: {
        tickets,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single ticket
// @route   GET /api/v1/support/:id
// @access  Private
export const getTicket = async (req, res, next) => {
  try {
    const { userId } = req;
    const ticket = await SupportTicket.findOne({
      _id: req.params.id,
      user: userId,
    });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        ticket,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all tickets (Admin only)
// @route   GET /api/v1/support
// @access  Private/Admin
export const getTickets = async (req, res, next) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = SupportTicket.find(JSON.parse(queryStr)).populate(
      "user",
      "name email"
    );

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const tickets = await query;

    res.status(200).json({
      success: true,
      count: tickets.length,
      data: {
        tickets,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update ticket (Admin only)
// @route   PUT /api/v1/support/:id
// @access  Private/Admin
export const updateTicket = async (req, res, next) => {
  try {
    const { status, adminNotes } = req.body;

    const ticket = await SupportTicket.findByIdAndUpdate(
      req.params.id,
      {
        status,
        adminNotes,
        ...(status === "resolved" && { resolvedAt: Date.now() }),
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate("user", "name email");

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    // Send status update email if status changed
    if (status && status !== ticket.status) {
      await sendEmail({
        email: ticket.user.email,
        subject: `Support Ticket ${status}`,
        template: "ticket-update",
        context: {
          name: ticket.user.name,
          ticketId: ticket._id,
          subject: ticket.subject,
          status,
          adminNotes,
        },
      });
    }

    res.status(200).json({
      success: true,
      data: {
        ticket,
      },
    });
  } catch (error) {
    next(error);
  }
};
