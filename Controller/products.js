const products = require("../Models/ProductSchema");

// ============================

const Home = async (req, res) => {
  try {
    const { category, rating } = req.query;
    const ProductData = await products.find({
      category,
      rating: { $gt: rating },
    });

    ProductData.length === 0
      ? res.status(200).json("Result Not Found")
      : res.status(200).json(ProductData);
  } catch (error) {
    res.status(402).json(error);
  }
};

// ============================

const Testing = async (req, res) => {
  try {
    const { category, title, rating, brand, sort, select } = req.query;
    const queryObject = {};

    if (category) {
      queryObject.category = category;
    }

    if (title) {
      queryObject.title = {
        $regex: title,
        $options: "is",
      };
    }

    if (rating) {
      queryObject.rating = { $gt: rating };
    }
    if (brand) {
      queryObject.brand = brand;
    }

    let ApiResult = products.find(queryObject);

    if (sort) {
      let sortFix = sort.replace(/,/g, " ");
      ApiResult = ApiResult.sort(sortFix);
    }
    if (select) {
      let selectFix = select.replace(/,/g, " ");
      ApiResult = ApiResult.select(selectFix);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    let skip = (page - 1) * limit; // this is a formula of pagination

    ApiResult = ApiResult.skip(skip).limit(limit);

    const ProductData = await ApiResult;

    console.log(queryObject);
    ProductData.length === 0
      ? res.status(200).json("Result Not Found")
      : res
          .status(200)
          .json({ myData: ProductData, nbHits: ProductData.length });
  } catch (error) {
    console.log(error);
    res.status(403).json(error);
  }
};

module.exports = { Home, Testing };
