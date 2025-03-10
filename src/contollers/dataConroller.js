
import multer from "multer";
import { uploadCSV, createDataFromCSV, getAllDataFromDB, getDataByIdFromDB } from "../models/dataModel.js";
import { json } from "express";


const handleReponse = (res, status, message, data = null) => {
    res.status(status).json({
        status: status,
        message: message,
        data: data
    });
}

export const uploadData = async (req, res, next) => {

    
    // console.log("Request object:", req); // Log the entire request object
    console.log("Request file:", req.file); // Log the file property 
    
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    try {
        const previewData = await uploadCSV(req.file.path);
        handleReponse(res, 201, "Data uploaded successfully", previewData);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export const createData = async (req, res, next) => {

    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    try {
        const result = await createDataFromCSV(req.file.path);
        handleReponse(res, 201, result);
    } catch (error) {
        res.status(500).json({ error });
    }

}

export const getAllData = async (req, res, next) => {
    try {
        const result = await getAllDataFromDB();
        handleReponse(res, 200, "Data retrieved successfully", result);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export const getDataById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await getDataByIdFromDB(id);
        handleReponse(res, 200, "Data retrieved successfully", result);
    } catch (error) {
        res.status(500).json({ error });
    }
}
