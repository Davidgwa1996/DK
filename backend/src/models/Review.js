const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  comment: {
    type: String,
    required: [true, 'Review comment is required'],
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
  },
  verifiedPurchase: {
    type: Boolean,
    default: false
  },
  helpfulVotes: {
    type: Number,
    default: 0
  },
  reported: {
    type: Boolean,
    default: false
  },
  reportedReason: {
    type: String
  },
  images: [{
    type: String
  }]
}, {
  timestamps: true
});

// Ensure one review per product per user
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

// Update product rating when review is saved/deleted
reviewSchema.post('save', async function() {
  await this.updateProductRating();
});

reviewSchema.post('remove', async function() {
  await this.updateProductRating();
});

reviewSchema.methods.updateProductRating = async function() {
  const Review = mongoose.model('Review');
  const Product = mongoose.model('Product');
  
  const stats = await Review.aggregate([
    { $match: { product: this.product } },
    {
      $group: {
        _id: '$product',
        averageRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 }
      }
    }
  ]);
  
  if (stats.length > 0) {
    await Product.findByIdAndUpdate(this.product, {
      'ratings.average': parseFloat(stats[0].averageRating.toFixed(1)),
      'ratings.count': stats[0].reviewCount
    });
  } else {
    await Product.findByIdAndUpdate(this.product, {
      'ratings.average': 0,
      'ratings.count': 0
    });
  }
};

module.exports = mongoose.model('Review', reviewSchema);