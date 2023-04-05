const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema({
    reviewMessage:  { type: String, default: null },
    restaurantId:{ type: Schema.ObjectId, ref: 'restaurants', default: null },
    userId: { type: Schema.ObjectId, ref: 'users', default: null },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});

reviewSchema.set('toObject');
reviewSchema.set('toJSON');
module.exports = mongoose.model('reviews', reviewSchema);