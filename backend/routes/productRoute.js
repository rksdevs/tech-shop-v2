import express from 'express';
const router = express.Router();
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductsByCategory, updateProductStock, createProductReview, getTopRatedProducts, getAllCategories, getAllBrands, getProductsByBrands, getLatestProducts, getFilteredProducts, getAllProductsAdmin } from '../controller/productController.js';
import {admin, protect} from '../middlewares/authMiddleware.js';

router.get("/", getAllProducts);

router.get("/allProductsAdmin", protect, admin, getAllProductsAdmin);

router.get("/topProducts", getTopRatedProducts);

router.post("/products/filteredProducts", getFilteredProducts);

router.get("/latestProducts", getLatestProducts); 

router.get("/allCategories", getAllCategories);

router.get("/allBrands", getAllBrands);

router.get("/:id", getProductById)

router.get("/category/:category", getProductsByCategory)

router.get("/brand/:brand", getProductsByBrands)

router.post('/', protect, admin, createProduct)

router.put("/:id", protect, admin, updateProduct);

router.post("/updateProductStock", protect, updateProductStock)

router.delete("/:id", protect, admin, deleteProduct);

router.post("/:id/reviews", protect, createProductReview);



export default router;