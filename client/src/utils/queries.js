import { gql } from '@apollo/client';

export const QUERY_MOVIES = gql`
  query Movies {
    movies {
      _id
      title
      rating
    }
  }
`;

export const QUERY_SINGLE_MOVIE = gql`
  query Movie($movieId: ID!) {
    movie(movieId: $movieId) {
      _id
      title
      rating
    }
  }
`;
