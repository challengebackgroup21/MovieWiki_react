import React, { useEffect, useState } from 'react';

function ReportBoardPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    setReports([
      {
        notiId: 1,
        movieId: 3,
        postId: 5,
        userId: 4,
        reportUserId: 2,
        notificationContent: '욕설 신고합니다.',
        status: '미처리',
      },
      {
        notiId: 1,
        movieId: 3,
        postId: 5,
        userId: 4,
        reportUserId: 2,
        notificationContent: '욕설 신고합니다.',
        status: '신고 거부 완료',
      },
    ]);
  }, []);

  return (
    <div>
      <h1>신고 목록 게시판</h1>
      <div
        className="board"
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '50%',
          margin: '0 auto',
        }}
      >
        {reports.map((report) => {
          return (
            <div
              style={{ border: '2px solid black', margin: '1rem 0' }}
              className="report"
            >
              <span>notiId: {report.notiId}</span>
              <br />
              <span>movieId: {report.movieId}</span>
              <br />
              <span>postId: {report.postId}</span>
              <br />
              <span>userId: {report.userId}</span>
              <br />
              <span>reportUserId: {report.reportUserId}</span>
              <br />
              <span>notificationContent: {report.notificationContent}</span>
              <br />
              {report.status === '미처리' ? (
                <div>
                  <button>승인</button>
                  <button>거부</button>
                </div>
              ) : (
                <span>status: {report.status}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ReportBoardPage;
