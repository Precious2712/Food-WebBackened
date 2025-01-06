const UserCart = require('../model/cart');
const Food = require('../model/food');
const Store = require('../model/stores');

const userCart = async (req, res) => {
    try {
        const { _id: user } = req.user;
        const { productId, model, quantity } = req.body; // Include `model` to identify the source
        console.log(req.body, 'body');
        console.log(user);

        let product;

        // Fetch the product details based on the model
        if (model === 'Menutable') {
            product = await Food.findOne({ 'images._id': productId }, { 'images.$': 1 });
            if (!product) {
                return res.status(404).json({ message: `Product not found in Menutable` });
            }
            product = product.images[0];
        } else if (model === 'moreMeals') {
            product = await Store.findOne({ 'picture._id': productId }, { 'picture.$': 1 });
            if (!product) {
                return res.status(404).json({ message: `Product not found in moreMeals` });
            }
            product = product.picture[0];
        } else {
            return res.status(400).json({ message: 'Invalid model specified' });
        }

        // Find or create the user's cart
        let cart = await UserCart.findOne({ user });
        if (!cart) {
            cart = new UserCart({ user, items: [] });
        }

        // Check if the product is already in the cart
        const existingItemIndex = cart.items.findIndex(
            item => item.productId.toString() === productId && item.model === model
        );

        if (existingItemIndex > -1) {
            // Update the quantity if the product already exists
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // Add the product to the cart
            cart.items.push({
                productId,
                model,
                name: product.name,
                description: product.description,
                imageUrl: product.imageUrl,
                price: product.price,
                quantity,
            });
        }

        // Calculate the total price using reduce
        const totalPrice = cart.items.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);

        // Update the cart's updatedAt field
        cart.updatedAt = new Date();

        // Save the total price in the cart (optional)
        cart.bill = totalPrice;

        await cart.save();

        res.status(200).json({
            success: true,
            message: 'Product added to cart',
            cart,
            totalPrice, // Include the total price in the response
        });

        console.log(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred',
            error,
        });
    }
};

module.exports = {
    userCart,
};