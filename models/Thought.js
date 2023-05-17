const mongoose = require('mongoose');
const moment = require('moment');

class Reaction {
  constructor() {
    this.reactionId = {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    };
    this.reactionBody = {
      type: String,
      required: true,
      maxlength: 280,
    };
    this.username = {
      type: String,
      required: true,
    };
    this.createdAt = {
      type: Date,
      default: Date.now,
      get: (createdAtDate) =>
        moment(createdAtDate).format('MMM DD, YYYY [at] hh:mm a'),
    };
  }
}

class Thought {
  constructor() {
    this.thoughtText = {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    };
    this.createdAt = {
      type: Date,
      default: Date.now,
      get: (createdAtDate) =>
        moment(createdAtDate).format('MMM DD, YYYY [at] hh:mm a'),
    };
    this.username = {
      type: String,
      required: true,
    };
    this.reactions = [new mongoose.Schema(new Reaction())];
  }

  get reactionCount() {
    return this.reactions.length;
  }
}

const ThoughtModel = mongoose.model(
  'Thought',
  new mongoose.Schema(new Thought())
);

module.exports = ThoughtModel;
