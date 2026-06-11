import { gql } from '@apollo/client';

export const ADD_MOVIE = gql`
  mutation AddMovie($title: String!, $rating: Int!) {
    addMovie(title: $title, rating: $rating) {
      _id
      title
      rating
    }
  }
`;

export const UPDATE_MOVIE = gql`
  mutation UpdateMovie($movieId: ID!, $title: String, $rating: Int) {
    updateMovie(movieId: $movieId, title: $title, rating: $rating) {
      _id
      title
      rating
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation DeleteMovie($movieId: ID!) {
    deleteMovie(movieId: $movieId) {
      _id
    }
  }
`;
