import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ReportBoardPage() {
  const [reports, setReports] = useState([]);
  const [userInfo, setUserInfo] = useState(() =>
    JSON.parse(localStorage.getItem('userInfo'))
  );
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        'http://localhost:3001/notifications',
        { headers: { Authorization: `Bearer ${userInfo?.accessToken}` } },
        { withCrdentilas: true }
      )
      .then((res) => {
        setReports(res.data);
      })
      .catch((err) => {
        alert('로딩 실패');
        navigate(-1);
      });
  }, []);
  const acceptReport = (notiId) => {
    axios
      .patch(
        `http://localhost:3001/notifications/${notiId}/accept`,
        { status: 'ACCEPT' },
        { headers: { Authorization: `Bearer ${userInfo?.accessToken}` } },
        { withCrdentilas: true }
      )
      .then((res) => {
        alert(res.data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const rejectReport = (notiId) => {
    axios
      .patch(
        `http://localhost:3001/notifications/${notiId}/reject`,
        { status: 'REJECT' },
        { headers: { Authorization: `Bearer ${userInfo?.accessToken}` } },
        { withCrdentilas: true }
      )
      .then((res) => {
        alert(res.data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

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
              <span>reporter: {report.reporterId.userId}</span>
              <br />
              <span>reported: {report.reportedId.userId}</span>
              <br />
              <span>notificationContent: {report.notificationContent}</span>
              <br />
              {report.status === 'AWAIT' ? (
                <div>
                  <button
                    onClick={() => {
                      acceptReport(report.notiId);
                    }}
                  >
                    승인
                  </button>
                  <button
                    onClick={() => {
                      rejectReport(report.notiId);
                    }}
                  >
                    거부
                  </button>
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
