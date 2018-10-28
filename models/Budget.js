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
  data: [
    {
      // total: {
      //   type: Number,
      //   required: true
      // },
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      description: {
        type: String,
        required: true
      },
      value: {
        type: Number,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Budget = mongoose.model("budget", BudgetSchema);
