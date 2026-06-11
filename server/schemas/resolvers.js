const { Movie } = require('../models');

const resolvers = {
  Query: {
    movies: async () => {
      return await Movie.find({}).sort({ updatedAt: -1 });
    },

    movie: async (parent, { movieId }) => {
      return await Movie.findById(movieId);
    },
  },

  Mutation: {
    addMovie: async (parent, { title, rating }) => {
      return await Movie.create({
        title,
        rating,
      });
    },

    updateMovie: async (parent, { movieId, title, rating }) => {
      return await Movie.findByIdAndUpdate(
        movieId,
        {
          title,
          rating,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },

    deleteMovie: async (parent, { movieId }) => {
      return await Movie.findByIdAndDelete(movieId);
    },
  },
};

module.exports = resolvers;
