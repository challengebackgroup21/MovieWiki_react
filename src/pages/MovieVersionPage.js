import React from 'react';
import { Link, useParams } from 'react-router-dom';

function MovieVersionPage() {
  const { movieId } = useParams();
  const version = 3;
  return (
    <div>
      <div>MovieVersionPage {movieId}</div>
      version 3: <Link to={`/report/${movieId}/${version}`}>신고하기</Link>
    </div>
  );
}

export default MovieVersionPage;
