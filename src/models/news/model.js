const mongoose = require('mongoose');

const { Schema } = mongoose;

const newsSchema = new Schema({

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


// Duplicate the ID field.
// eslint-disable-next-line no-underscore-dangle
newsSchema.virtual('id').get(() => this._id.toString());

// Ensure virtual fields are serialized.
newsSchema.set('toJSON', {
  virtuals: true,
});

newsSchema.set('toObject', {
  virtuals: true,
});


module.exports = mongoose.model('News', newsSchema, 'news');
