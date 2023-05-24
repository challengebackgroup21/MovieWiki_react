import React from 'react';
import { useParams } from 'react-router-dom';

function MovieUpdatePage() {
  const { movieId } = useParams();
  return <div>MovieUpdatePage {movieId}</div>;
}

export default MovieUpdatePage;
