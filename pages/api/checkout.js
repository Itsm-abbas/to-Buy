// /pages/api/checkout.js
import db from "../../config/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, phone, country, name, address, city, postal_code, cart } =
      req.body;
    try {
      // Connection with database
      const connection = await db.getConnection();
      // Insert data into the 'orders' table
      const result = await connection.query(
        "INSERT INTO orders (email, phone, country, name, address, city, postal_code) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [email, phone, country, name, address, city, postal_code]
      );

      const insertedData = await connection.query(
        "SELECT * FROM orders WHERE phone = ?",
        [phone]
      );
      const currentOrder = insertedData[0];

      // Insert cart data into the 'order_items' table
      for (const {
        product_id,
        title,
        qty,
        newprice,
        price,
        category,
      } of cart) {
        await connection.query(
          `INSERT INTO order_items (order_id, product_id, product_name, category, product_price, quantity, total_price) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            currentOrder[0].order_id,
            product_id,
            title,
            category,
            newprice !== null ? newprice : price, // Use newprice if available, otherwise price
            qty,
            qty * (newprice !== null ? newprice : price), // Calculate total price accordingly
          ]
        );
      }
      res.status(200).json({
        data: currentOrder,
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
