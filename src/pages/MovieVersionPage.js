import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function MovieVersionPage() {
  const { movieId } = useParams();
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/post/${movieId}/record`).then((res) => {
      setVersions(res.data);
    });
  }, []);

  const revertHandler = (e, postId, version) => {
    e.preventDefault();
    if (window.confirm('해당 버전으로 게시글을 되돌리시겠습니까?')) {
      axios.post(`http://localhost:3001/post/${movieId}/record/${postId}`, {
        commnet: `${version} 버전으로 되돌림`,
      });
    }
  };

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
            <div className="btnGroup">
              <Link to={`/report/${movieId}/${version.version}`}>
                <button>신고하기</button>
              </Link>
              <button
                onClick={(e) =>
                  revertHandler(e, version.postId, version.version)
                }
              >
                되돌리기
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MovieVersionPage;
