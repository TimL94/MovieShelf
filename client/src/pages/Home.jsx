import { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

const QUERY_MOVIES = gql`
  query Movies {
    movies {
      _id
      title
      rating
    }
  }
`;

const ADD_MOVIE = gql`
  mutation AddMovie($title: String!, $rating: Int!) {
    addMovie(title: $title, rating: $rating) {
      _id
      title
      rating
    }
  }
`;

const DELETE_MOVIE = gql`
  mutation DeleteMovie($movieId: ID!) {
    deleteMovie(movieId: $movieId) {
      _id
    }
  }
`;

function Home() {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');

  const { loading, error, data } = useQuery(QUERY_MOVIES);

  const [addMovie] = useMutation(ADD_MOVIE, {
    refetchQueries: [{ query: QUERY_MOVIES }],
  });

  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    refetchQueries: [{ query: QUERY_MOVIES }],
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const ratingNumber = parseInt(rating, 10);

    if (!title.trim()) {
      return;
    }

    if (Number.isNaN(ratingNumber) || ratingNumber < 1 || ratingNumber > 11) {
      return;
    }

    await addMovie({
      variables: {
        title: title.trim(),
        rating: ratingNumber,
      },
    });

    setTitle('');
    setRating('');
  };

  const handleDelete = async (movieId) => {
    await deleteMovie({
      variables: { movieId },
    });
  };

  const movies = data?.movies || [];

  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h1" sx={{ mb: 3, textAlign: 'center' }}>
        Movie Tracker
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
            Add a Movie
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <TextField
                  label="Movie title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  label="Rating 1-10"
                  type="number"
                  value={rating}
                  onChange={(event) => setRating(event.target.value)}
                  fullWidth
                  required
                  inputProps={{ min: 1, max: 10 }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained">
                  Add Movie
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Saved Movies
      </Typography>

      {loading && <CircularProgress />}

      {error && (
        <Typography color="error">
          Error loading movies: {error.message}
        </Typography>
      )}

      {!loading && !error && movies.length === 0 && (
        <Typography>No movies saved yet.</Typography>
      )}

      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3">
                  {movie.title}
                </Typography>

                <Typography sx={{ mb: 2 }}>
                  Rating: {movie.rating}/10
                </Typography>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(movie._id)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
