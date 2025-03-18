const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;
const PC_SERVER_URL = "http://192.168.216.1:4000"; // Change this to your PC's local IP

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Soundboard API is running!"));

app.get("/sounds", async (req, res) => {
    try {
        const response = await axios.get(`${PC_SERVER_URL}/sounds`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "PC server unreachable." });
    }
});

app.post("/play", async (req, res) => {
    try {
        await axios.post(`${PC_SERVER_URL}/play`, req.body);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: "PC server error." });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
