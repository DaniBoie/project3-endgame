const { model, Schema } = require('mongoose')

const User = new Schema({
  realname: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  account_type: {
    type: Number,
  },
  // Items is an array that refrences the item objects as children.
  Settings: [{
    type: Schema.Types.ObjectId,
    ref: 'ProfileSettings'
  }]


}, { timestamps: true })

User.plugin(require('passport-local-mongoose'))

module.exports = model('User', User)