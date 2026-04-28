
const db = require('../config/db');

exports.donateItem = async (req, res) => {
  try {
    const { campaign_id, item_name, quantity, description } = req.body;

    const user_id = req.user.id;

    if (!item_name || !quantity) {
      return res.status(400).json({ message: "Item name and quantity required" });
    }
await db.query(
  "INSERT INTO donations (user_id, campaign_id, item_name, quantity, description) VALUES (?, ?, ?, ?, ?)",
  [user_id, campaign_id, item_name, quantity, description]
);

    res.status(200).json({ message: "Item donated successfully" });

  } catch (err) {
    console.error("DONATION ERROR:", err);  // 👈 IMPORTANT
    res.status(500).json({ message: "Server error" });
  }
};
exports.getMyDonations = async (req, res) => {
  try {
    const user_id = req.user.id;

    const [rows] = await db.query(
      "SELECT * FROM donations WHERE user_id = ?",
      [user_id]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching donations" });
  }
};


exports.getAllDonations = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM donations");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching all donations" });
  }
};