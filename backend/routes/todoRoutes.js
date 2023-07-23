const express = require("express");
const {
  getAllLists,
  postOne,
  getOne,
  updateOne,
  deleteOne,
} = require("../controllers/todoController");
const tokenAuth = require("../middleware/tokenAuth");
const router = express.Router();

//this is authentication,only authenticated users can make requests below
router.use(tokenAuth);
//GET
router.get("/", getAllLists);

//GET ONE
router.get("/:id", getOne);

//POST
router.post("/", postOne);

//PATCH
router.patch("/:id", updateOne);

//DELETE
router.delete("/:id", deleteOne);

module.exports = router;
