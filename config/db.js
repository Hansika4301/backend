const mysql = require("mysql2/promise");
const cors = require("cors");

app.use(cors({
  origin: "https://donate-connect-website.netlify.app",
  credentials: true
}));
let pool;

try {
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
} catch (err) {
  console.log("DB skipped");
}
app.get("/", (req,res)=>{
  res.send("Backend is running successfully 🚀");
});
module.exports = pool;