import crypto from 'crypto';

const resetToken = crypto
    .randomBytes(20).toString('hex');
const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken).digest("hex");