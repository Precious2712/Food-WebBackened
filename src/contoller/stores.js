const moreMeals = require('../model/stores');

const allFoodVendors = async (req, res) => {
    // console.log('body', req.body);

    try {
        const { name, mainImage, picture } = req.body;

        const dish = await moreMeals.create({
            name,
            mainImage,
            picture
        })

        res.status(200).json({
            message: 'food created successfully',
            product: dish
        })
    } catch (error) {
        console.log(`bad response : ${error}`);
    }
};

const gettingFoodDelivery = async (req, res) => {
    try {
        const data = await moreMeals.find()
        // console.log(data);

        res.status(200).json({
            message: 'All food vendors sent successfully',
            data: data
        });
    } catch (error) {
        res.status(404).json({ message: `bad response : ${error}` });
    }
};

const gettingFoodVendors = async (req, res) => {
    const { id } = req.params

    const foodId = await moreMeals.findOne({ 'picture._id': id });

    if (!foodId) {
        return res.status(404).json({ message: "Image not found" });
    }

    const imageIndex = foodId.picture.findIndex(image => image._id.toString() === id);

    if (imageIndex === -1) {
        return res.status(404).json({ message: "Image not found in images array" });
    }

    const image = foodId.picture[imageIndex];

    res.status(200).json({
        message: 'Image retrieved successfully',
        data: image
    });
    console.log(image, 'image retrieved');
};



module.exports = {
    allFoodVendors,
    gettingFoodDelivery,
    gettingFoodVendors
}