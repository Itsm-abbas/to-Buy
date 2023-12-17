//updateProfile
import db from "../../config/db";
import { compare, hashSync } from "bcryptjs";

export default async function handler(req, res) {
  const connection = await db.getConnection();
  const { id, full_name, password, change_password, user_image, address } =
    req.body;

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

      // Prepare the parameters for the SQL query
      const queryParameters = [];

      let updateQuery = "UPDATE users SET";

      // Add full_name to the query if provided
      if (
        change_password !== null &&
        change_password !== undefined &&
        change_password !== ""
      ) {
        // Hash the new password
        const hashedNewPassword = hashSync(change_password, 10);
        updateQuery += " password = ?,";
        queryParameters.push(hashedNewPassword);
      }
      if (full_name !== null && full_name !== undefined && full_name !== "") {
        updateQuery += " full_name = ?,";
        queryParameters.push(full_name);
      }
      if (address !== null && address !== undefined && address !== "") {
        updateQuery += " address = ?,";
        queryParameters.push(address);
      }

      // Add user_image to the query if provided
      if (
        user_image !== null &&
        user_image !== undefined &&
        user_image !== ""
      ) {
        updateQuery += " user_image = ?,";
        queryParameters.push(user_image);
      }
      // Remove the trailing comma from the query
      updateQuery = updateQuery.replace(/,$/, "");

      // Add WHERE clause for user ID
      if (queryParameters.length == 0) {
        return res.status(402).json({
          message: "You are not updating anything!",
        });
      }
      queryParameters.push(id);
      updateQuery += " WHERE id = ?";

      await connection.query(updateQuery, queryParameters);
      // Updated Result
      const updatedResult = await connection.query(
        "SELECT * FROM users WHERE id = ?",
        [id]
      );

      const updatedUser = updatedResult[0];
      res.status(200).json({
        data: {
          full_name: updatedUser[0].full_name,
          id: updatedUser[0].id,
          user_image: updatedUser[0].user_image,
          address: updatedUser[0].address,
          created_at: user[0]?.created_at,
        },
        message: "Updated Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
