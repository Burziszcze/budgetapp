const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BudgetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true,
    max: 20
  },
  budget: [
    {
      total: {
        type: Number,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Budget = mongoose.model("budget", BudgetSchema);
