// pages/api/get-order-details.js
import db from "../../config/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const orderId = req.query.orderId;

    try {
      const connection = await db.getConnection();

      const orderDetails = await connection.query(
        "SELECT * FROM orders WHERE order_id = ?",
        [orderId]
      );
      if (orderDetails[0].length > 0) {
        res.status(200).json(orderDetails[0]);
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
