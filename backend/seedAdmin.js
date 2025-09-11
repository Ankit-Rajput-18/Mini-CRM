const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/User");
const dotenv = require("dotenv");

dotenv.config();

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await User.findOne({ email: "admin@crm.com" });
    if (existing) {
      console.log("✅ Admin already exists");
      process.exit(0);
    }

    const hashed = await bcrypt.hash("Admin@123", 10);
const admin = new User({
  name: "Ankit",
  email: "admin@crm.com",
  passwordHash: hashed,  // 👈 hashed password use karna hai
  role: "admin",
});


    await admin.save();
    console.log("🎉 Admin user created:");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding admin:", err);
    process.exit(1);
  }
}

seedAdmin();
