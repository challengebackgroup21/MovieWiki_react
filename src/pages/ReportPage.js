import React from 'react';
import { useParams } from 'react-router-dom';

function ReportPage() {
  const { movieId, version } = useParams();

  return (
    <div>
      <div>
        Report movie: {movieId}, version: {version}
      </div>
      <button>신고</button>
    </div>
  );
}

export default ReportPage;
