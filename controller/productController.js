import dotenv from "dotenv";
import OrderModel from "../model/orderModel.js";
import ProductModel from "../model/ProductModel.js";
import categoryModel from "../model/categoryModel.js";
import fs from "fs";
import slugify from "slugify";
import mongoose from "mongoose";
import { log } from "console";
import braintree from "braintree";
import { json } from "express";

dotenv.config();
//Payment Gateway

let gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
  try {
    const { name, description, slug, category, price, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res
          .status(500)
          .send({ success: false, error: "Name is Required" });
      case !description:
        return res
          .status(500)
          .send({ success: false, error: "description is Required" });
      case !category:
        return res
          .status(500)
          .send({ success: false, error: "category is Required" });
      case !price:
        return res
          .status(500)
          .send({ success: false, error: "Price is Required" });
      case !quantity:
        return res
          .status(500)
          .send({ success: false, error: "Quanitiy is Required" });
      case !shipping:
        return res
          .status(500)
          .send({ success: false, error: "shipping is Required" });
      case !photo && photo.size > 1000000:
        return res.status(500).send({
          success: false,
          error: "Photo is Required and should be less than 1MB",
        });
    }
    const product = await new ProductModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(200).send({
      success: true,
      message: "Product created succesfully",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Creating Product",
      error,
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const product = await ProductModel.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All product ",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error: error.message,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await ProductModel.findOne({
      slug: req.params.slug,
    })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Got it single product successfully",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting single product",
      error: error.message,
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.pid).select("photo");
    if (product?.photo?.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};

//deleting Product
export const deleteProductController = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.pid).select(
      "-photo"
    );
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in while Deleting Product",
      error,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, description, slug, category, price, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res
          .status(500)
          .send({ success: false, error: "Name is Required" });
      case !description:
        return res
          .status(500)
          .send({ success: false, error: "description is Required" });
      case !category:
        return res
          .status(500)
          .send({ success: false, error: "category is Required" });
      case !price:
        return res
          .status(500)
          .send({ success: false, error: "Price is Required" });
      case !quantity:
        return res
          .status(500)
          .send({ success: false, error: "Quanitiy is Required" });
      case !shipping:
        return res
          .status(500)
          .send({ success: false, error: "shipping is Required" });
      case !photo && photo.size > 10000000:
        return res.status(500).send({
          success: false,
          error: "Photo is Required and should be less than 1MB",
        });
    }

    const product = await ProductModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (!product) {
      res.status(404).send({
        success: false,
        message: "Product Not FOund",
      });
    }
    if (photo) {
      product.photo.data = await fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
      await product.save();
    }
    res.status(200).send({
      success: true,
      message: "updated Product succesfully",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in updatinng Product",
      error: error.message,
    });
  }
};

//Product filter controller
export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    const arg = {};
    if (checked.length > 0) {
      arg.category = checked;
    }
    if (radio != undefined && radio.length) {
      arg.price = {
        $gte: +radio[0],
        $lte: +radio[1],
      };
    }
    const product = await ProductModel.find(arg);
    res.status(200).send({
      success: true,
      message: "Successfully filter",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in filtering Product" + error.message,
      error,
    });
  }
};

//pagination of products
//Total product
export const productCountController = async (req, res) => {
  try {
    const total = await ProductModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      message: "successfully get total number of docs in mongodb",
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting total product",
      error,
    });
  }
};

//number of products per page
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await ProductModel.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(6)
      .sort({ createdAt: -1 })
      .populate("category");
    res.status(200).send({
      success: true,
      message: "successfully get Product in pagination",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error comming in pagination",
      error,
    });
  }
};

//Product Searching
export const productSearchCotroller = async (req, res) => {
  try {
    const { keywords } = req.params;
    const product = await ProductModel.find({
      $or: [
        { name: { $regex: keywords, $options: "i" } },
        { description: { $regex: keywords, $options: "i" } },
      ],
    }).select("-photo");
    res.status(200).send({
      success: true,
      message: "successfully search product",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error coming in product searching",
      error: error.message,
    });
  }
};

//related products
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const product = await ProductModel.find({
      category: cid,
      _id: { $ne: pid },
    })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      message: "related producted successfully gotted",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: error.message,
      error,
    });
  }
};

//get Product Category wise
export const productCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    console.log(slug);
    const category = await categoryModel.find({ slug });
    const product = await ProductModel.find({
      category: category,
    })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "successfully Got Product category wise",
      product,
      category,
    });
  } catch (error) {
    res.status(400).res({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

//Payment Gateway
//Token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//Payment
export const braintreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    console.log("req.user : " + JSON.stringify(req.user));
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async function (error, result) {
        if (result) {
          const order = await new OrderModel({
            products: cart,
            payment: result,
            buyer: req.user.id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
