const { User, Thought } = require('../models');

const thoughtController = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().populate({
        path: 'reactions',
        select: '-__v',
      });
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .populate({
          path: 'reactions',
          select: '-__v',
        });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findByIdAndUpdate(
        req.body.userId,
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user with that ID, but thought was created' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thoughts found with that id!' });
      }

      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { thoughts: req.params.Id } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No User found with this id but thought deleted!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      )
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true, runValidators: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'Incorrect reaction data!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
