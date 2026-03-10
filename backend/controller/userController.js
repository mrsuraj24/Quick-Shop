import handleAsyncError from '../middleware/handleAsyncError.js';
import crypto from 'crypto';
import HandleError from '../utils/handleError.js';
import User from '../models/userModel.js';
import { sendToken } from '../utils/jwtToken.js';
import { sendEmail } from '../utils/sendEmail.js';
import { v2 as cloudinary } from 'cloudinary';
// import jwt from "jsonwebtoken";

// Register
export const registerUser = handleAsyncError(async (req, res, next) => {
    const { name, email, password, avatar } = req.body;
    const myCloud = await cloudinary.uploader.upload(avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale"
    })
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    })
    sendToken(user, 201, res);
})

// Login with Google
// export const loginWithGoogle = handleAsyncError(async (req, res, next) => {
//     const { name, email, avatar } = req.body;
//     if (!email) {
//         return next(new HandleError("Email is required", 400));
//     }
//     // Generate random password for Google users
//     const generatedPassword = crypto.randomBytes(20).toString("hex");
//     // Check if user already exists
//     let user = await User.findOne({ email });

//     if (!user) {
//         user = await User.create({
//             name,
//             email,
//             password: generatedPassword,
//             avatar
//         });
//     }
//     // Create JWT token
//     const token = jwt.sign(
//         { id: user._id, email: user.email },
//         process.env.JWT_SECRET_KEY,
//         { expiresIn: "3d" }
//     );
//     res.status(200).json({
//         success: true,
//         user,
//         token,
//         message: "Login successful"
//     });
// });

// Login
export const loginUser = handleAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new HandleError("Email or Password can't be empty", 400))
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new HandleError("Invalid email or password", 401))
    }
    const isPasswordValid = await user.verifyPassword(password);
    if (!isPasswordValid) {
        return next(new HandleError("Invalid email or password", 401))
    }
    sendToken(user, 200, res)
})

// Logout
export const logout = handleAsyncError(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Successfully logout"
    })
})

// forgot Password
export const requestPasswordReset = handleAsyncError(async (req, res, next) => {
    const { email } = req.body
    const user = await User.findOne({ email });
    if (!user) {
        return next(new HandleError("User doen't exist", 400))
    }
    let resetToken;
    try {
        resetToken = user.generatePasswordResetToken()
        await user.save({ validateBeforeSave: false })
    } catch (error) {
        return next(new HandleError("Could not save reset token, Please try again later", 500))
    }
    const resetPasswordURL = `${req.protocol}://${req.get('host')}/reset/${resetToken}`;
    const message = `You requested to reset your password. Click the link below to set a new password: ${resetPasswordURL}.\n\n This link will expire in 5 minutes.\n\n If you did not request a password reset, you can safely ignore this email.`;
    try {
        // Send Email
        await sendEmail({
            email: user.email,
            subject: `Password reset request`,
            message
        })
        res.status(200).json({
            success: true,
            message: `Email is sent to ${user.email} successfully`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new HandleError("Email couldn't be sent, please try again later", 500))
    }
})

// Reset Password
export const resetPassword = handleAsyncError(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    if (!user) {
        return next(new HandleError("Reset token password is invalid or has been expired", 400))
    }
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return next(new HandleError("Password does not match", 400))
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res)
})

// Get user details
export const getUserDetails = handleAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user
    })
})

// Update password
export const updatePassword = handleAsyncError(async (req, res, next) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const user = await User.findById(req.user.id).select("+password");
    const checkPasswordMatch = await user.verifyPassword(oldPassword);
    if (!checkPasswordMatch) {
        return next(new HandleError("Old password is incorrect", 400))
    }
    if (newPassword !== confirmPassword) {
        return next(new HandleError("New password doesn't match", 400))
    }
    user.password = newPassword;
    await user.save();
    sendToken(user, 200, res);
})

// Update user profile
export const updateProfile = handleAsyncError(async (req, res, next) => {
    const { name, email, avatar } = req.body;
    const updateUserDetails = {
        name,
        email
    }
    if (avatar !== "") {
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id
        await cloudinary.uploader.destroy(imageId)
        const myCloud = await cloudinary.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale"
        })
        updateUserDetails.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    }
    const user = await User.findByIdAndUpdate(req.user.id, updateUserDetails, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user
    })
})

// Admin - Getting user information
export const getUsersList = handleAsyncError(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    })
})

// Admin - Getting single user information
export const getSingleUser = handleAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new HandleError(`User doesn't exist with this id: ${req.params.id}`, 400))
    }
    res.status(200).json({
        success: true,
        user
    })
})

// Admin Changing user role
export const updateUserRole = handleAsyncError(async (req, res, next) => {
    const { role } = req.body;
    const newUserDate = {
        role
    }
    const user = await User.findByIdAndUpdate(req.params.id, newUserDate, {
        new: true,
        runValidators: true
    })
    if (!user) {
        return next(new HandleError("User doesn't exist", 400))
    }
    res.status(200).json({
        success: true,
        user
    })
})

// Admin  - Delete User Profile
export const deleteUser = handleAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new HandleError("User does not exist", 400))
    }
    const imageId = user.avatar.public_id;
    await cloudinary.uploader.destroy(imageId);
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    })
})