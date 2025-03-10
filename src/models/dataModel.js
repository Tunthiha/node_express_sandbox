import pool from "../config/db.js";
import fs from "fs";
import csvParser from "csv-parser";
import logger from "../config/logger.js";

// upload CSV only to show first 10 rows of data in the frontend
export const uploadCSV = async (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];

        // Read CSV file and extract first 10 rows
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on("data", (data) => {
                if (results.length < 10) results.push(data);
            })
            .on("end", () => {
                logger.info(`CSV uploaded, previewing first ${results.length} rows`);
                resolve(results)
            })
            .on("error", (err) => {
                logger.error("Error reading CSV", { error: err.message });
                reject("Error reading CSV: " + err.message)
            });
    });
};

// if user want after confirming the data in the frontend, then store the data in the database
export const createDataFromCSV = async (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        const invalidRows = []; // Store invalid rows for logging

        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on("data", (row, index) => {
                // empty with NULL
                const formattedRow = {
                    Brand: row.Brand || null,
                    Description: row.Description || null,
                    Price: row.Price ? parseFloat(row.Price) : null,
                    Size: row.Size || null,
                    Volume: row.Volume || null,
                    Classification: row.Classification ? parseInt(row.Classification) : null,
                    PurchasePrice: row.PurchasePrice ? parseFloat(row.PurchasePrice) : null,
                    VendorNumber: row.VendorNumber ? parseInt(row.VendorNumber) : null,
                    VendorName: row.VendorName || null,
                };

                // log the error if fields are missing
                if (!formattedRow.Brand || !formattedRow.Description || formattedRow.Price === null || formattedRow.VendorNumber === null) {
                    invalidRows.push({ index: index + 1, error: "Missing required fields", row });
                    return;
                }

                results.push(formattedRow);
            })
            .on("end", async () => {
                // Log invalid rows
                if (invalidRows.length > 0) {
                    logger.warn("CSV contains invalid rows", { invalidRows });
                }

                // Insert Only Valid Rows into Database
                try {
                    for (const row of results) {
                        try {
                            await pool.query(
                                `INSERT INTO purchase_prices (Brand, Description, Price, Size, Volume, Classification, PurchasePrice, VendorNumber, VendorName)
                                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                                [
                                    row.Brand,
                                    row.Description,
                                    row.Price,
                                    row.Size,
                                    row.Volume,
                                    row.Classification,
                                    row.PurchasePrice,
                                    row.VendorNumber,
                                    row.VendorName,
                                ]
                            );
                        } catch (error) {
                            logger.error("Error inserting row into database", { error: error.message, row });
                            throw new Error("Error inserting row into database: " + error.message);
                        }
                    }

                   
                    resolve(`Data inserted successfully! Rows inserted: ${results.length}`);
                } catch (error) {
                    logger.error("Database insertion error", { error: error.message });
                    reject("Error inserting data: " + error.message);
                }
            })
            .on("error", (err) => {
                logger.error("Error reading CSV file", { error: err.message });
                reject("Error reading CSV: " + err.message);
            });
    });
};

//view all data
export const getAllDataFromDB = async (req, res) => {

    try {
        const result = await pool.query("SELECT * FROM purchase_prices");
        return result.rows;
    } catch (error) {
        logger.error("Error retrieving all data from database", { error: error.message });
        throw new Error("Error retrieving data from database");
    }

}

//view data by id
export const getDataByIdFromDB = async (req, res) => {

    try {
        const id = req;
        const result = await pool.query("SELECT * FROM purchase_prices WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            logger.warn(` No data found for ID: ${id}`);
            return `No record found for ID ${id}`;
        }
        return result.rows;
    } catch (error) {
        logger.error(" Error retrieving data by ID", { error: error.message });
        throw new Error("Error retrieving data by ID");
    }
}
