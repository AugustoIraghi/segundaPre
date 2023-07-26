import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartSchema = new mongoose.Schema({
    _id: false,
    _cid: mongoose.ObjectId,
    products: {
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products'
            }
        }],
        default: []
    },
});

cartSchema.pre('findOne', function() {
    this.populate('products.product');
});

cartSchema.plugin(mongoosePaginate);

const cartModel = mongoose.model("carts", cartSchema);

export default cartModel;