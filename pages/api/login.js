// /pages/api/login.js
import { compare } from "bcryptjs";
import db from "../../config/db";

export default async function handler(req, res) {
  const connection = await db.getConnection();
  if (req.method === "POST") {
    try {
      // Retrieve user data from the database based on the provided email
      const result = await connection.query(
        "SELECT * FROM users WHERE email = ?",
        [req.body.email]
      );

      if (result?.length > 0) {
        const user = result[0];
        console.log(user);
        const passwordMatch = await compare(
          req.body.password,
          user[0].password
        );
        if (passwordMatch) {
          res.status(200).json({ success: true, message: "Login successful" });
        } else {
          res
            .status(401)
            .json({ success: false, message: "Invalid credentials" });
        }
      } else {
        console.log("user not found");
        res.status(404).json({ success: false, message: "User not found" });
      }
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
