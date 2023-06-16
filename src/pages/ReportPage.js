import axios from 'axios';
import React, { useEffect, useState } from 'react';

import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
function ReportPage() {
  const { movieId, version } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [userInfo, setUserInfo] = useState();
  const [notificationContent, setNotificationContent] = useState('');
  const postId = searchParams.get('postId');

  const navigate = useNavigate();
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('userInfo'))) {
      setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
    }
  }, []);

  const submitReportHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:3001/notifications/${postId}`,
        {
          postId: postId,
          notificationContent: notificationContent,
        },
        { headers: { Authorization: `Bearer ${userInfo?.accessToken}` } },
        { withCrdentilas: true }
      )
      .then((res) => {
        alert(res.data);
        navigate(-1);
      })
      .catch((err) => alert('신고 실패'));
  };

  const handleNotificationContentChange = (e) => {
    setNotificationContent(e.target.value);
  };

  return (
    <div style={{ marginTop: '33%' }}>
      Report
      <div style={{ fontWeight: '600' }}>
        movie: {movieId}, version: {version}
      </div>
      <div className="report-box">
        신고 내용:
        <input
          type="text"
          name="notificationContent"
          id="notificationContent"
          value={notificationContent}
          onChange={handleNotificationContentChange}
        />
        <div>version : {version}</div>
      </div>
      <button onClick={submitReportHandler}>신고</button>
      <Link to={`/movie/version/${movieId}`}>
        <button style={{ padding: '0.2rem', margin: '10px' }}>돌아가기</button>
      </Link>
    </div>
  );
}

export default ReportPage;
