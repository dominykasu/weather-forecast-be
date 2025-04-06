const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/log", async (req, res) => {
    const { city } = req.body;
    console.log("City selected: ", city)
    if (!city) return res.status(400).json({ error: "City is required" });

    try {
        const result = await pool.query(
            "INSERT INTO logs (city, timestamp) VALUES ($1, NOW()) RETURNING *",
            [city]
        );
        console.log(`Saved city: ${city} at ${new Date().toISOString()}`);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Problem saving city to database:", error);
        res.status(500).json({ error: "Could not save the city" });
    }
});

module.exports = router;