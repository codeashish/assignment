const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, 'Please add a name'],
			trim: true,
			maxlength: [50, 'Username cannot exceed 50 characters'],
		},

		password: {
			type: String,
			required: [true, 'Please add a password'],
			minlength: [6, 'Min 6 digit password is needed'],
		},
	},
	{ timestamps: true }
);

//Hashing password
UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getJwtToken = function () {
	return jwt.sign({ id: this._id, username: this.username }, process.env.JWT_SECRET_KEY, {
		expiresIn: process.env.JWT_EXPIRES,
	});
};

module.exports = mongoose.model('User', UserSchema);
