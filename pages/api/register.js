// /pages/api/register.js
import { hash } from "bcryptjs";
import db from "../../config/db";

export default async function handler(req, res) {
  const connection = await db.getConnection();
  if (req.method === "POST") {
    const { full_name, email, password } = req.body;

    // Hash the password
    const hashedPassword = await hash(password, 20);

    try {
      // Insert user data into the database
      const result = await connection.query(
        "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)",
        [full_name, email, hashedPassword]
      );

      res
        .status(200)
        .json({ success: true, message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
