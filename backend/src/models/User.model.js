import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const SALT_ROUNDS = 12;

/**
 * @typedef {Object} UserDocument
 * @property {string} name
 * @property {string} email
 * @property {string} password - Hashed. Never returned in API responses.
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [80, "Name must be at most 80 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      // Reasonably strict but not overly clever email pattern —
      // full format validation also happens at the Zod layer later.
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      // Excluded from query results by default. Must explicitly
      // .select("+password") when the login flow needs it.
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * Hashes the password before saving, but only if it was newly set
 * or modified — avoids re-hashing an already-hashed password on
 * unrelated updates (e.g. changing the user's name).
 */
userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) {
    next();
    return;
  }

  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Compares a plaintext candidate password against the stored hash.
 * @param {string} candidatePassword
 * @returns {Promise<boolean>}
 */
userSchema.methods.comparePassword = async function comparePassword(
  candidatePassword,
) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Strip sensitive/internal fields whenever a document is serialized
// to JSON (e.g. res.json(user)), so the password hash can never
// accidentally leak in an API response.
userSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

export const User = mongoose.model("User", userSchema);