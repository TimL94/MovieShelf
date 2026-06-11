const typeDefs = `
  type Movie {
    _id: ID
    title: String
    rating: Int
    createdAt: String
    updatedAt: String
  }

  type Query {
    movies: [Movie]
    movie(movieId: ID!): Movie
  }

  type Mutation {
    addMovie(
      title: String!
      rating: Int!
    ): Movie

    updateMovie(
      movieId: ID!
      title: String
      rating: Int
    ): Movie

    deleteMovie(movieId: ID!): Movie
  }
`;

module.exports = typeDefs;