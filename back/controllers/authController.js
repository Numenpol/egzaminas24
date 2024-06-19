const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { promisify } = require("util");

const signToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  };

  const sendTokenCookie = (token, res) => {
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  
    res.cookie("jwt", token, cookieOptions);
  };

  exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
    });

    const token = signToken(newUser._id);
  
    sendTokenCookie(token, res);

    newUser.password = undefined;
  
    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  });

  exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please provide email and password!", 400));
    }
  
    // 2. check if user exists and password is correct:
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password", 401));
    }
  
    //3. if everything is ok, send the token to client
    const token = signToken(user._id);
  
    //4. send token to client
    sendTokenCookie(token, res);
  
    // password is hidden
    user.password = undefined;
  
    res.status(200).json({
      status: "success",
      token,
      data: user,
    });
  });
  
  exports.protect = catchAsync(async (req, res, next) => {
    // 1. Getting a token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token || token === "null") {
      return next(
        new AppError("You are not logged in! Please login to get access.", 401)
      );
    }
  
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const existingUser = await User.findById(decoded.id);
    if (!existingUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401
        )
      );
    }
    req.user = existingUser;
    next();
  });
  
  //AUTHORIZATION

  exports.restrictTo = (...roles) =>
    catchAsync(async (req, res, next, role) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError("You do not have permission to perform this action", 403)
        );
      }
  
      next();
    });