import asyncHandler from "../middlewares/asyncHandler.js";
import Offer from "../models/offerModel.js";
import Product from "../models/productModel.js";
import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "../utils/aws.S3bucket.js";

//@desc Fetch all products
//@route GET /api/products
//@access Public
const getAllProducts = asyncHandler(async(req,res)=>{
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword ? {name: {$regex : req.query.keyword, $options: 'i'}} : {};

    const count = await Product.countDocuments({...keyword});
    // let products;
    // if(req.query.pageNumber) {
    //     products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1));  
    // } else {
    //     products = await Product.find();
    // }
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1));
    if (products) {
        return res.json({products, page, pages: Math.ceil(count/pageSize)})
    } else {
        res.status(404);
        throw new Error ('Resources not found! Here is a pancakce..')
    }
})

//@desc Fetch one product by ID
//@route GET /api/products/:id
//@access Public
const getProductById = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);

    if(product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error("Resource not found! Here is a pancake..")
    }
})

//@desc Create a product
//@route POST /api/products
//@access admin/private
const createProduct = asyncHandler(async(req,res)=>{
    const newProduct = new Product({
        name: 'Sample Name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description',
        productDiscount: 0,
        sku: "SAMPLE",
        brand: "AMD",
        category: "Motherboard",
        rating: 0,
        numReviews: 0,
        isOnOffer: false,
        compatibilityDetails: {
            socketType: "",
            powerConsumption: "",
            chipsetModel: "",
            formFactor: "",
            memorySlots: "",
            expansionSlots: "",
            storageInterface: "",
            ramType: "",
            ramFormFactor: "NA",
            wattage: "",
            networkCardInterfaces: ""
        }
    });

    const createdProduct = await newProduct.save();
    res.status(200).json(createdProduct);
})

//@desc   Update a product
//@route  PUT /api/products/:id
//@access Private/Admin
const updateProduct = asyncHandler(async(req,res)=>{
    const {name, price, brand, category, sku, image, countInStock, description, productDiscount, socketType, powerConsumption, chipsetModel, formFactor, memorySlots, ramType, ramFormFactor, warrantyDetails, featureDetails, specificationDetails} = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.brand = brand;
        product.category = category;
        product.price = price;
        product.sku = sku;
        product.image = image;
        product.countInStock = countInStock;
        product.description = description;
        product.compatibilityDetails.socketType = socketType;
        product.compatibilityDetails.powerConsumption = powerConsumption;
        product.compatibilityDetails.chipsetModel = chipsetModel;
        product.compatibilityDetails.formFactor = formFactor;
        product.compatibilityDetails.memorySlots = memorySlots;
        product.compatibilityDetails.ramType = ramType;
        product.compatibilityDetails.ramFormFactor = ramFormFactor;
        product.productDiscount = productDiscount;
        product.warrantyDetails = warrantyDetails;
        product.specificationDetails = specificationDetails;
        product.featureDetails = featureDetails;

        //if product is in offer and we update the discount to 0
        if(product.isOnOffer) {
            if(productDiscount === 0) {
                product.isOnOffer = false;
            } else {
                try {
                    const appliedOffer = await Offer.find({offerName: product.offerName});
                    if (appliedOffer.offerDiscount !== productDiscount) {
                        product.isOnOffer = false;
                        product.offerName = ""
                    }
                } catch (error) {
                    console.log(error);
                    throw new Error('Can not find offer details')
                }
            }
        }

        // if(productDiscount > 0) {
        //     product.price = price - (price * product.productDiscount/100)
        // } else {
        //     product.price = price;
        // }

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Resource not found!')
    }
})

//@desc   Delete a product
//@route  DELETE /api/products/:id
//@access Private/Admin
const deleteProduct = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({_id: product._id})
        res.status(200).json({message: 'Product deleted successfully'})
    } else {
        res.status(404);
        throw new Error('Resource not found!')
    }
})

//@desc Fetch all products by category
//@route GET /api/products/:category
//@access Public
const getProductsByCategory = asyncHandler(async(req,res)=>{
    const categoryToSearch = req.params.category;
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Product.countDocuments({category: categoryToSearch});
    // let products;
    // if(req.query.pageNumber) {
    //     products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1));  
    // } else {
    //     products = await Product.find();
    // }
    const products = await Product.find({category: categoryToSearch}).limit(pageSize).skip(pageSize * (page -1));
    if (products) {
        return res.json({products, page, pages: Math.ceil(count/pageSize)})
    } else {
        res.status(404);
        throw new Error ("Category not found! Here is a pancake..")
    }
})

//@desc   Update a product
//@route  POST /api/products/updateProductStock
//@access Private
const updateProductStock = asyncHandler(async(req,res)=>{
    const order = req.body;
    for (const orderItem of order.orderItems) {
        const product = await Product.findById(orderItem.product);
        if (product) {
            product.countInStock -= orderItem.qty;
            await product.save();
        } else {
            res.status(404);
            throw new Error(`Product with ID ${orderItem.product} not found`);
        }
    }

    res.json({ message: 'Stock updated successfully' });
})

//@desc   Create product review
//@route  POST /api/products/:id/reviews
//@access Private
const createProductReview = asyncHandler(async(req,res)=>{
    const {rating, comment} = req.body;
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (product) {
        //check if the user already has a review on the product
        const alreadyReviewed = product.reviews.find((review) => review.user.toString() === req.user._id.toString());

        if(alreadyReviewed) {
            res.status(404);
            throw new Error(`You have already reviewed this product`);  
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review);
        product.numReviews = product.reviews.length;

        product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;
        
        await product.save();

        res.status(201).json({message: "Review added"})

    } else {
        res.status(404);
        throw new Error(`Product with ID ${orderItem.product} not found`);
    }

})

//@desc Fetch top rated products
//@route GET /api/products
//@access Public
const getTopRatedProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find({}).sort({rating: -1}).limit(20)
    if (products) {
        res.status(200).json(products)
    } else {
        res.status(404);
        throw new Error(`Products not found`);
    }

})

//@desc Fetch top rated products
//@route GET /api/products/allCategories
//@access Public
const getAllCategories = asyncHandler(async(req, res) => {
    try {
        const products = (await Product.find());
        if (products.length > 0) {
            const categories = products.map((product)=> product.category)
            const uniqueCategories = [];
            categories.forEach((category)=> {
                if (!uniqueCategories.includes(category)) {
                    uniqueCategories.push(category)
                }
            })
            res.status(200).json(uniqueCategories)
        } else {
            res.status(404);
        throw new Error("Category not found! Here is a pancake..")
        }
    } catch (error) {
        console.log(error);
        res.status(404);
        throw new Error("Category not found! Here is a pancake..")
    }
})

//@desc Fetch top rated products
//@route GET /api/products/allBrands
//@access Public
const getAllBrands = asyncHandler(async(req, res) => {
    try {
        const products = (await Product.find());
        if (products.length > 0) {
            const brands = products.map((product)=> product.brand)
            const uniqueBrands = [];
            brands.forEach((brand)=> {
                if (!uniqueBrands.includes(brand)) {
                    uniqueBrands.push(brand)
                }
            })
            res.status(200).json(uniqueBrands)
        } else {
            res.status(404);
        throw new Error("Brand not found! Here is a pancake..")
        }
    } catch (error) {
        console.log(error);
        res.status(404);
        throw new Error("Brand not found! Here is a pancake..")
    }
})

//@desc Fetch all products by brand
//@route GET /api/products/:brand
//@access Public
const getProductsByBrands = asyncHandler(async(req,res)=>{
    const brandToSearch = req.params.brand;
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;
    try {
    //     const count = await Product.countDocuments({brand: brandToSearch});
    // console.log(count)
    // let products;
    // if(req.query.pageNumber) {
    //     products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1));  
    // } else {
    //     products = await Product.find();
    // }
    const products = await Product.find({brand: req.params.brand});
    if (products) {
        return res.json({products})
    } else {
        res.status(404);
        throw new Error ("Brand not found! Here is a pancake..")
    }
    } catch (error) {
        res.status(404);
        throw new Error ("Brand not found! Here is a pancake..")
    }
})

//@desc Fetch latest products
//@route GET /api/products
//@access Public
const getLatestProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find({}).sort({createdAt: -1}).limit(20)
    if (products) {
        res.status(200).json(products)
    } else {
        res.status(404);
        throw new Error(`Products not found`);
    }

})

//@desc Fetch filtered products
//@route POST /api/products
//@access Public
const getFilteredProducts = asyncHandler(async(req,res)=>{
    const {brandFilter, categoryFilter, priceFilter} = req.body;
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;

    const query = { $and: [] };
    let minPrice = 0;
    let maxPrice = priceFilter || 9999999

if (brandFilter?.length > 0) {
  query.$and.push({ brand: { $in: brandFilter } });
}

if (categoryFilter?.length > 0) {
  query.$and.push({ category: { $in: categoryFilter } });
}

if (minPrice !== null && maxPrice !== null) {
  query.$and.push({ price: { $gte: minPrice, $lte: maxPrice } });
} else if (minPrice !== null) {
  query.$and.push({ price: { $gte: minPrice } });
} else if (maxPrice !== null) {
  query.$and.push({ price: { $lte: maxPrice } });
}

if (query.$and.length === 0) {
  // No filters applied, fetch all products
  delete query.$and;
}

    const keyword = req.query.keyword ? {name: {$regex : req.query.keyword, $options: 'i'}} : {};

    const count = await Product.countDocuments(query);
    // let products;
    // if(req.query.pageNumber) {
    //     products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1));  
    // } else {
    //     products = await Product.find();
    // }
    const products = await Product.find(query).limit(pageSize).skip(pageSize * (page -1));
    if (products) {
        return res.json({products, page, pages: Math.ceil(count/pageSize)})
    } else {
        res.status(404);
        throw new Error ('Resources not found! Here is a pancakce..')
    }
})

//@desc Fetch all products
//@route GET /api/products
//@access Admin
const getAllProductsAdmin = asyncHandler(async(req,res)=>{
    // const pageSize = process.env.PAGINATION_LIMIT;
    // const page = Number(req.query.pageNumber) || 1;

    // const keyword = req.query.keyword ? {name: {$regex : req.query.keyword, $options: 'i'}} : {};

    // const count = await Product.countDocuments({...keyword});
    // let products;
    // if(req.query.pageNumber) {
    //     products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1));  
    // } else {
    //     products = await Product.find();
    // }
    const products = await Product.find()
    if (products) {
        return res.json(products)
    } else {
        res.status(404);
        throw new Error ('Resources not found! Here is a pancakce..')
    }
})

const addAllProductsWarranty = asyncHandler(async(req,res)=>{
    // const pageSize = process.env.PAGINATION_LIMIT;
    // const page = Number(req.query.pageNumber) || 1;

    // const keyword = req.query.keyword ? {name: {$regex : req.query.keyword, $options: 'i'}} : {};

    // const count = await Product.countDocuments({...keyword});
    // let products;
    // if(req.query.pageNumber) {
    //     products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1));  
    // } else {
    //     products = await Product.find();
    // }
    const products = await Product.find()
    if (products) {
        for (const eachProduct of products) {
            const product = await Product.findById(eachProduct._id);
            if (product) {
                product.warrantyDetails.warrantyPeriod = "1";
                product.warrantyDetails.returnPeriod = "7";
                await product.save();
            } else {
                res.status(404);
                throw new Error(`Product with ID ${orderItem.product} not found`);
            }
        }
        // return res.json(products)
    } else {
        res.status(404);
        throw new Error ('Resources not found! Here is a pancakce..')
    }
})

//@desc Fetch all products
//@route GET /api/products
//@access Public
const getProductFeatureDetails= asyncHandler(async(req,res)=>{
    const productId = req.params.id;
    // const pageSize = process.env.PAGINATION_LIMIT;
    // const page = Number(req.query.pageNumber) || 1;

    // const keyword = req.query.keyword ? {name: {$regex : req.query.keyword, $options: 'i'}} : {};

    // const count = await Product.countDocuments({...keyword});
    // let products;
    // if(req.query.pageNumber) {
    //     products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1));  
    // } else {
    //     products = await Product.find();
    // }
    const product = await Product.findById(productId)
    if (product) {
        let updatedFeatures = Object.values(product?.featureDetails).filter((item)=>item !== "" && item !== null && item !== undefined);
        return res.json(updatedFeatures)
    } else {
        res.status(404);
        throw new Error ('Resources not found! Here is a pancakce..')
    }
})

//@desc Fetch all products
//@route GET /api/products
//@access Admin
const getProductsByCategoryWithoutPage = asyncHandler(async(req,res)=>{
    const categoryToSearch = req.params.category;
    
    try {
        const products = await Product.find({category: categoryToSearch})
        if (products) {
            return res.json(products)
        } else {
            res.status(404);
            throw new Error ('Resources not found! Here is a pancakce..')
        }
    } catch (error) {
        console.log(error)
    }
})

//@desc Fetch all products
//@route GET /api/products
//@access Admin --//optional
const updateManyProducts = asyncHandler(async(req, res)=>{
    try {
        const result = await Product.updateMany(
            { category: 'CPU' },
            { $mul: { price: 1.00783 } }
        );
        res.status(200).json({ message: 'Prices updated successfully', result });
      } catch (error) {
        res.status(500).json({ message: 'Error updating prices', error });
      }
})

const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'myawsbucket-computermaker',
      acl: 'public-read', // or private based on your use case
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + '-' + file.originalname); // unique file name
      },
    }),
  });

//   const generateSignedUrl = (key) => {
//     const params = {
//       Bucket: 'myawsbucket-computermaker',
//       Key: key,
//       Expires: 60 * 5, // URL expires in 5 minutes
//     };
  
//     return s3.getSignedUrl('getObject', params);
//   };

  const uploadImage = asyncHandler(async(req,res)=>{
    // const signedUrl = generateSignedUrl(req.file.key);
    res.status(200).json({ message: 'Image uploaded successfully', data: req.file.location });
  })

export {getAllProducts, getProductById, updateManyProducts, createProduct,getProductsByCategoryWithoutPage, updateProduct, deleteProduct, getProductsByCategory, updateProductStock, createProductReview, getTopRatedProducts, getAllCategories, getAllBrands, getProductsByBrands, getLatestProducts, getFilteredProducts, getAllProductsAdmin, addAllProductsWarranty, getProductFeatureDetails, upload, uploadImage}