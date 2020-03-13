const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

const { Schema } = mongoose;

const newsSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  text: {
    type: String,
  },
}, { timestamps: true, id: true });

newsSchema.plugin(mongooseLeanVirtuals);

// Ensure virtual fields are serialized.
newsSchema.set('toJSON', {
  virtuals: true,
});

newsSchema.set('toObject', {
  virtuals: true,
});

// Virtual for newsInstance's URL
newsSchema
  .virtual('url')
  // eslint-disable-next-line func-names
  .get(function () {
    return `/api/v1.0/news/${this.id}`;
  });


module.exports = mongoose.model('News', newsSchema, 'news');
