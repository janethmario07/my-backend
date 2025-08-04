import express from "express";
const router=express.Router();
import {create,update,deleteRecord,getAllPosts,profileUpdate} from "../controllers/crudcontroller.js";
import {protect} from "../middleware/authmiddleware.js";

router.post('/create',protect,create);
router.put('/update/:id',protect,update);
router.delete('/delete/:id',protect,deleteRecord);
router.get("/all", protect, getAllPosts);
router.put('/profileUpdate/:id',protect,profileUpdate);


export default router;