require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");
const app = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('Connection Error:', err));

// Routes
app.use('/api/register/assessor', require('./routes/assessorRoutes'));
app.use('/api/register/consultant', require('./routes/consultantRoutes'));
app.use('/api/register/ib', require('./routes/ibRoutes'));
app.use('/api', require('./routes/apiRoutes'));

// Excel Generation Route
app.post("/api/generate-excel", async (req, res) => {
    try {
        const { data, filename } = req.body; // Object with array
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ error: "Invalid data format. Expected an array." });
        }

        // Create a new workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Sheet 1");

        // Add Header Row
        const headers = Object.keys(data[0]);
        worksheet.addRow(headers);

        // Add Data Rows
        data.forEach(row => {
            worksheet.addRow(Object.values(row));
        });

        // Define file path
        const filePath = path.join(__dirname, `${filename || "output"}.xlsx`);
        
        // Save the file
        await workbook.xlsx.writeFile(filePath);

        // Send the file as a response
        res.download(filePath, `${filename || "output"}.xlsx`, (err) => {
            if (err) {
                console.error("File download error:", err);
                res.status(500).json({ error: "File download failed" });
            }
            // Delete file after sending
            fs.unlinkSync(filePath);
        });
    } catch (error) {
        console.error("Error generating Excel:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

module.exports = app;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
