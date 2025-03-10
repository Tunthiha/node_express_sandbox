import express from 'express';
import multer from 'multer';


import { uploadData, createData,getAllData,getDataById } from '../contollers/dataConroller.js';
const Router = express.Router();

const upload = multer({ dest: "uploads/" });

Router.post("/upload_data",upload.single("file"), uploadData);
Router.post("/store_data",upload.single("file"), createData);
Router.get("/data",getAllData);
Router.get("/data/:id",getDataById);

export default Router;