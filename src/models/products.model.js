import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// los productos tienen title, description, code, price, status, stock, category, thumbnails

const productSchema = new mongoose.Schema({
    _id: false,
    _pid: mongoose.ObjectId,
    title: { type: String, required: true},
    brand: { type: String, required: true},
    price: { type: Number, required: true},
    stock: { type: Number, required: true},
    category: { type: String, required: true},
    thumbnails: String,
    description: String,
});

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model("products", productSchema);

export default productModel;