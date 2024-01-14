import db from "../../config/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {
        user_name,
        user_location,
        user_comment,
        stars,
        productId,
        product_image,
      } = req.body;

      // Connect to the MySQL database
      console.log(req.body);
      const connection = await db.getConnection();
      // Insert the review into the 'reviews' table
      const result = await connection.query(
        "INSERT INTO reviews (product_id,user_name, user_location, user_comment, stars, product_image) VALUES (?, ?, ?, ?, ?, ?)",
        [
          productId,
          user_name,
          user_location,
          user_comment,
          stars,
          product_image,
        ]
      );

      res.status(201).json({ message: "Review added successfully" });
    } catch (error) {
      console.error("Error adding review:", error);
      res.status(500).json({ error: "Failed to add review" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
