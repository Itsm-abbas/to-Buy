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
      if (result[0]?.length > 0) {
        const user = result[0];
        const hashedPassword = user[0]?.password;
        // Decrypt
        const passwordMatch = await compare(req.body.password, hashedPassword); //True or false
        if (passwordMatch) {
          res.status(200).json({
            data: {
              full_name: user[0]?.full_name,
              id: user[0]?.id,
              user_image: user[0]?.user_image,
              created_at: user[0]?.created_at,
            },
          });
        } else {
          res
            .status(401)
            .json({ success: false, message: "Invalid credentials" });
        }
      } else {
        res.status(404).json({ success: false, message: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    } finally {
      if (connection) {
        connection.release();
      }
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
