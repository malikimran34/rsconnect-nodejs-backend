// Imports
const express = require("express");

// For accessing http verbs
const router = express.Router();

const Image = require("../models/Image");

// Input validation from request object
const { check, validationResult } = require("express-validator");

// Endpoints

// @route GET api/v1/images
// @desc Get all images
// @access public
router.get("/", async (req, res) => {
  try {
    const images = await Image.find().populate("images").sort({ id: -1 });

    // No content to send
    if (!images) res.status(204).json([]);
    else {
      try {
        res.send(images);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/v1/images
// @desc Post image
// @access public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("url", "Url is required").not().isEmpty(),
    check("width", "Width is required").not().isEmpty(),
    check("height", "Height is required").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Get new image detail from request body
      const { name, height, width, url } = req.body;

      // See if image exist
      let image = await Image.findOne({ name });

      if (image) {
        return res
          .status(400)
          .send({ errors: [{ msg: "image already exists in datastore" }] });
      }

      // New image
      image = new Image({
        name,
        height,
        width,
        url,
      });

      // Save image
      await image.save();

      res.status(200).send("Image detail added to database successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE api/v1/images
// @desc delete by id
// @access public
router.delete("/:id", async (req, res) => {
  try {
    // Retrieve id from query
    const { id } = req.params;

    if (!id) return res.status(500);

    Image.deleteOne({ id }, function (err, obj) {
      if (err) throw err;
      res.send({ result: true, message: "image deleted" });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error in removing entity");
  }
});

module.exports = router;
