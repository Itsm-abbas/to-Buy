// /pages/api/checkout.js

import db from "../../path/to/your/db/connection"; // Update the path to your database connection

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, phone, country, name, address, city, postal_code } =
      req.body;

    // Validate the input data as needed

    try {
      const connection = await db.getConnection();

      // Insert data into the 'orders' table
      const result = await connection.query(
        "INSERT INTO orders (email, phone, country, name, address, city, postal_code) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [email, phone, country, name, address, city, postal_code]
      );

      // Retrieve the inserted data
      const insertedData = await connection.query(
        "SELECT * FROM orders WHERE id = ?",
        [result.insertId]
      );

      res.status(200).json({
        data: insertedData[0],
        message: "Order placed successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
