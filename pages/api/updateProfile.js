import db from "../../config/db";
import { compare, hashSync } from "bcryptjs";

export default async function handler(req, res) {
  const connection = await db.getConnection();
  const { id, full_name, password, change_password, avatar } = req.body;

  if (req.method === "POST") {
    try {
      // Retrieve user data from the database based on the provided user ID
      const result = await connection.query(
        "SELECT * FROM users WHERE id = ?",
        [id]
      );

      // Check if user exists
      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = result[0];

      // Compare the current password
      const passwordMatch = await compare(password, user[0]?.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid current password" });
      }

      // Hash the new password
      const hashedNewPassword = hashSync(change_password, 10);

      // Update user's password and name
      await connection.query(
        "UPDATE users SET password = ?, full_name = ? WHERE id = ?",
        [hashedNewPassword, full_name, id]
      );

      res.status(200).json({
        data: { full_name: full_name },
        message: "Updated Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

// compare(password, user.password, (err, isMatch) => {
//   if (err) {
//     res.status(500).json({ error: err });
//   }
//   if (isMatch) {
//     if (name) {
//       user.name = name;
//     }
//     if (change_password) {
//       user.password = hashSync(change_password, 10);
//     }
//     if (avatar) {
//       user.avatar = avatar;
//     }
//     user.save();
//     res.status(200).json({
//       message: "Updated successfully",
//       user,
//     });
//   } else {
//     res.status(400).json({
//       message: "Password is incorrect",
//     });
//   }
// });
// if (!user) {
//   res.status(404).json({ message: "User not found" });
// }
