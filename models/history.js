let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let historySchema = new Schema({
  employId: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  companyName: {
    type: String
  },
  empName: {
    type: String
  },
  joinedAt: {
    type: String,
    default: "None"
  },
  leavedAt: {
    type: String,
    default: "None"
  }
}, {
  timestamps: true
});

let history = mongoose.model("history", historySchema);

module.exports = history;