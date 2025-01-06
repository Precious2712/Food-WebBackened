const food = require('../model/food');

// const groupingFood = async (req, res) => {
//     const { name, description, image, price } = req.body;

//     try {
//         const category = await food.create({
//             name, description, image, price,
//             owner: req.endUser,
//         });

//         res.status(201).json({
//             message: 'food category created successfully',
//             data: category
//         })

//         console.log(category);

//     } catch (error) {
//         res.status(500).json({
//             message: `error: ${error}`
//         });

//     }
// }

// const getAllFood = async (req, res) => {
//     try {
//         const snack = await food.find();
//         res.status(201).json({
//             message: 'food category sent successfully',
//             data: snack
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: `error: ${error}`
//         });

//     }
// };

// const getsnackId = async (req, res) => {
//     const { id } = req.params
//     // console.log(id);
//     try {
//         const identity = await food.findOne({ _id: id });
//         res.status(201).json({
//             message: 'food id sent successfully',
//             data: identity
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: `error: ${error}`
//         });
//     }
// };

// const getFood = async (req, res) => {
//     try {
//         const item = await food.findOne({ _id: req.params.id });
//         if (!item) {
//             res.status(404).json({
//                 message: 'item not found'
//             })
//         }
//         res.status(201).json({
//             message: 'item sent successfully',
//             data: item
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: `error: ${error}`
//         })
//     }
// };

const handleCategories = async (req, res) => {

    console.log(req.body);
    try {
        const { name, mainImage, images } = req.body;

        const savedCategories = await food.create({
            name, mainImage, images
        })
        res.status(201).json({
            message: 'Category created successfully',
            data: savedCategories
        })
        // console.log(savedCategories);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: `Error creating category: ${error}`
        })
    }
}

const handleAllCategories = async (req, res) => {
    try {
        const allCategories = await food.find()
        res.status(200).json({
            message: 'All categories sent successfully',
            data: allCategories
        })
        console.log(allCategories);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: `Error creating category: ${error}`
        })
    }
}

const handleFoodImageById = async (req, res) => {
    const { id } = req.params;

    try {
        // Retrieve the food document
        const meal = await food.findOne({ "images._id": id });

        if (!meal) {
            return res.status(404).json({ message: "Image not found" });
        }

        // Find the index of the image with the specific id in the images array
        const imageIndex = meal.images.findIndex(image => image._id.toString() === id);

        // Check if the image was found
        if (imageIndex === -1) {
            return res.status(404).json({ message: "Image not found in images array" });
        }

        // Retrieve the specific image
        const image = meal.images[imageIndex];

        res.status(200).json({
            message: 'Image retrieved successfully',
            data: image
        });
        // console.log(image);
    } catch (error) {
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};


module.exports = {
    // groupingFood,
    // getAllFood,
    // getsnackId,
    // getFood,
    handleCategories,
    handleAllCategories,
    handleFoodImageById
}