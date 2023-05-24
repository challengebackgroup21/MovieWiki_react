import React from 'react';
import { useParams } from 'react-router-dom';

function ReportPage() {
  const { movieId, version } = useParams();

  return (
    <div>
      <div>
        Report movie: {movieId}, version: {version}
      </div>
      <div className="report-box">
        신고 내용:
        <input
          type="text"
          name="notificationContent"
          id="notificationContent"
        />
        <div>version : {version}</div>
      </div>
      <button>신고</button>
    </div>
  );
}

export default ReportPage;
