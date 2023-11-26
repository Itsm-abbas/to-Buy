import db from "../../config/db";

export default async function handler(req, res) {
  try {
    // Get a connection from the pool
    const connection = await db.getConnection();

    // Query to fetch data from the 'products' table
    const [results] = await connection.query("SELECT * FROM reviews");

    // Send the data as JSON
    res.status(200).json({ data: results });
  } catch (error) {
    console.error("Error fetching data from MySQL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
