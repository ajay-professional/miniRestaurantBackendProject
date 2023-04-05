const mongoose = require('mongoose');

const { Schema } = mongoose;

const restaurantSchema = new Schema({
    name: { type: String, default: null },
    address: { type: String, default: null },
    description: { type: String, default: null },
    totalReviews: { type: String, default: '0' },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});

restaurantSchema.set('toObject');
restaurantSchema.set('toJSON');
module.exports = mongoose.model('restaurants', restaurantSchema);
