import mongoose from "mongoose";
import express from "express";
import formidable from "express-formidable";
import { isAdmin, requireSignin } from "../middelwares/authMiddleware.js";
import {
  createProductController,
  getSingleProductController,
  productPhotoController,
  getAllProductController,
  updateProductController,
  deleteProductController,
} from "../controller/productController.js";

const router = express.Router();

router.post(
  "/create-product",
  requireSignin,
  isAdmin,
  formidable(),
  createProductController
);
router.get("/getallproduct", requireSignin, isAdmin, getAllProductController);
router.get(
  "/getsingleproduct/:slug",
  requireSignin,
  isAdmin,
  getSingleProductController
);
router.get(
  "/getphotoproduct/:pid",
  requireSignin,
  isAdmin,
  productPhotoController
);
router.delete(
  "/deleteproduct/:slug",
  requireSignin,
  isAdmin,
  deleteProductController
);
router.put(
  "/updateproduct/:pid",
  requireSignin,
  isAdmin,
  formidable(),
  updateProductController
);

export default router;
