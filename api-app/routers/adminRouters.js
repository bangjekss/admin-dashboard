const express = require("express");
const router = express.Router();
const {
	sentPackage,
	approveBukti,
	rejectBukti,
	kirimBarang,
	getProducts,
	addProduct,
	getCategoriesAndWarehouse,
} = require("../controllers/adminControllers");
const { getDashboard } = require("../controllers/adminControllers");

router.get("/dashboard", getDashboard);
router.post("/products", addProduct);
router.get("/products", getProducts);
router.get("/product-categories-and-warehouse", getCategoriesAndWarehouse);
router.get("/sent-package", sentPackage);
router.patch("/approve-bukti/:transactionId", approveBukti);
router.patch("/reject-bukti/:transactionId", rejectBukti);
router.patch("/kirim-barang/:transactionId", kirimBarang);

module.exports = router;
