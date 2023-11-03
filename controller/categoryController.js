import categoryModel from "../model/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    //If name is not passing then
    if (!name) {
      return res.status(401).send({
        success: false,
        message: "Nmae is Required",
      });
    }

    //Category Already Exist
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exist",
      });
    }

    //Create Category
    const createCategory = await new categoryModel({
      name,
      slug: slugify(name),
    });

    createCategory.save();
    res.status(200).send({
      success: true,
      message: "Category created successfully",
      category: createCategory,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Category",
      error,
    });
  }
};

export const updateCategoryControler = async (req, res) => {
  try {
    const { name } = req.body;
    const id = req.params.id;
    console.log(id);
    if (!name) {
      return res.status(401).status({
        success: false,
        message: "Name is Required",
      });
    }

    const updateCategory = await categoryModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    if (!updateCategory) {
      return res.status(404).send({
        success: false,
        message: "Category Not Exist",
      });
    }
    res.status(200).send({
      success: true,
      message: "Updated Successfully",
      category: updateCategory,
    });
    console.log("working inside ");
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Update Category",
    });
  }
};

export const categoryController = async (req, res) => {
  const category = await categoryModel.find();
  res.status(200).send({
    success: true,
    message: "Get All Category List successfully",
    category,
  });
  try {
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in All category",
      error,
    });
  }
};

export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({
      slug: req.params.slug,
    });
    if (category) {
      res.status(200).send({
        success: true,
        message: "Single Category got successfully",
        category,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting single category",
      error,
    });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while deleting category",
      error,
    });
  }
};
