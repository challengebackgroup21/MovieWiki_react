import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function MovieVersionPage() {
  const { movieId } = useParams();
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    setVersions([
      {
        userId: 2,
        content: '생기발랄 주토피아',
        comment: '첫 번째 작성',
        createdAt: '20230524_16:02:22',
        version: 1,
      },
      {
        userId: 3,
        content: '생기발랄 자연친화 주토피아',
        comment: '두 번째 작성',
        createdAt: '20230524_21:02:22',
        version: 2,
      },
    ]);
  }, []);

  return (
    <div>
      <div>MovieVersionPage {movieId}</div>
      {versions.map((version) => {
        return (
          <div style={{ margin: '1rem 0' }} className="version-box">
            <div>작성자 : {version.userId}</div>
            <div>변경 내용 : {version.content}</div>
            <div>작성자 코멘트 : {version.comment}</div>
            <div>변경 시간 : {version.createdAt}</div>
            <div>version : {version.version}</div>
            <Link to={`/report/${movieId}/${version.version}`}>신고하기</Link>
          </div>
        );
      })}
    </div>
  );
}

export default MovieVersionPage;
