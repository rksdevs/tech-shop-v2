import asyncHandler from "../middlewares/asyncHandler.js";
import PrebuiltPC from "../models/preBuiltPcModel.js";

//@desc - create a prebuilt pc
//@route - /prebuiltpc/configure/create
//@access - admin/protected
const createPrebuiltPc = asyncHandler(async(req, res) => {
    const {pcName, platform, pcCategory, pcUses, pcComponents, pcImage, pcTotalPrice, countInStock} = req.body;

    try {
        const newPrebuiltPc = new PrebuiltPC({
            pcName,
            platform,
            pcCategory,
            pcUses,
            pcComponents,
            pcImage,
            pcTotalPrice,
            countInStock
        })
    
        const updatedPrebuiltPc = await newPrebuiltPc.save();
        res.status(200).json(updatedPrebuiltPc)
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error('Can not create new prebuilt pc! Here is a pancake!')
    }
})

//@desc - update a prebuilt pc
//@route - /prebuiltpc/configure/update/:id
//@access - admin/protected
const updatePrebuiltPc = asyncHandler(async(req, res) => {
    const prebuiltPcId = req.params.id
    const {pcName, platform, pcCategory, pcUses, pcComponents, pcImage, pcTotalPrice, countInStock} = req.body;

    try {
        const prebuiltPc = await PrebuiltPC.findById(prebuiltPcId)

        if(prebuiltPc) {
            prebuiltPc.pcName = pcName;
            prebuiltPc.platform = platform;
            prebuiltPc.pcCategory = pcCategory;
            prebuiltPc.pcUses = pcUses;
            prebuiltPc.pcComponents = pcComponents;
            prebuiltPc.pcImage = pcImage;
            prebuiltPc.pcTotalPrice = pcTotalPrice;
            prebuiltPc.countInStock = countInStock;

            const updatedPrebuiltPc = await prebuiltPc.save();
            res.status(200).json(updatedPrebuiltPc)
        } else {
            res.status(404)
            throw new Error('Can not find the prebuilt to update! Here is a pancake!')
        }
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error('Can not create new prebuilt pc! Here is a pancake!')
    }
})


//@desc - delete a prebuilt pc
//@route - /prebuiltpc/configure/delete/:id
//@access - admin/protected
const deleteOnePrebuiltPc = asyncHandler(async(req, res) => {
    const prebuiltPcId = req.params.id
    const product = await PrebuiltPC.findById(prebuiltPcId);

    if (product) {
        await PrebuiltPC.deleteOne({_id: product._id})
        res.status(200).json({message: 'Prebuilt PC deleted successfully'})
    } else {
        res.status(404);
        throw new Error('Resource not found!')
    }
})


//@desc - get all prebuilt pcs
//@route - /prebuiltpc/configure/all
//@access - admin/protected
const getAllPrebuiltPc = asyncHandler(async(req, res) => {
    const allPrebuiltPc = await PrebuiltPC.find();
    if (allPrebuiltPc.length) {
        res.status(200).json(allPrebuiltPc)
    } else {
        res.status(404);
        throw new Error('Resource not found!')
    }
})

//@desc - get one specific prebuilt pc
//@route - /prebuiltpc/configure/one/:id
//@access - admin/protected
const getSpecificPrebuiltPc = asyncHandler(async(req, res) => {
    const prebuiltPcId = req.params.id
    const product = await PrebuiltPC.findById(prebuiltPcId);
    if (product) {
        res.status(200).json(product)
    } else {
        res.status(404);
        throw new Error('Resource not found!')
    }
})


export {createPrebuiltPc, updatePrebuiltPc, getAllPrebuiltPc, getSpecificPrebuiltPc, deleteOnePrebuiltPc};