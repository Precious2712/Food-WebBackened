const Carrts = require('../model/cart');

const updateQuantity = async (req, res) => {
    const { id } = req.params; 
    const { _id } = req.user; 
    const { change } = req.body; 

    try {
        let cart = await Carrts.findOne({ user: _id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const cartIndex = cart.items.findIndex((el) => el.productId.toString() === id);

        if (cartIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        cart.items[cartIndex].quantity += change;

        if (cart.items[cartIndex].quantity < 0) {
            return res.status(400).json({ message: 'Quantity cannot be negative' });
        }

        const totalPrice = cart.items.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);

        cart.bill = totalPrice;

        await cart.save();

        res.status(200).json({
            message: 'Quantity updated successfully',
            cart,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    updateQuantity,
};
