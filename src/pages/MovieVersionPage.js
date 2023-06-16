import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function MovieVersionPage() {
  const { movieId } = useParams();
  const [versions, setVersions] = useState([]);
  const [userInfo, setUserInfo] = useState(() =>
    JSON.parse(localStorage.getItem('userInfo'))
  );

  useEffect(() => {
    axios
      .get(`http://localhost:3001/post/${movieId}/record`)
      .then((res) => {
        setVersions(res.data);
      })
      .catch((err) => console.log(err.response.data.error));
  }, []);

  const revertHandler = (e, postId, version) => {
    e.preventDefault();
    if (window.confirm('해당 버전으로 게시글을 되돌리시겠습니까?')) {
      axios
        .post(
          `http://localhost:3001/post/${movieId}/record/${version}`,
          {
            comment: `${version} 버전으로 되돌림`,
          },
          { headers: { Authorization: `Bearer ${userInfo?.accessToken}` } },
          { withCrdentilas: true }
        )
        .then((res) => {
          alert(res.data);
          window.location.reload();
        })
        .catch((err) => {
          alert('로그인이 필요한 기능입니다.');
        });
    }
  };
  return (
    <div>
      <h3>Movie History Page ID: {movieId}</h3>
      {versions.length === 0 ? (
        <div style={{ marginTop: '1rem', fontSize: '1.3rem', color: 'green' }}>
          아직 히스토리가 없습니다. 새로운 히스토리를 등록해볼까요?
        </div>
      ) : (
        ''
      )}
      {versions.map((version) => {
        const contentArr = version?.content.split(/(?<=<\/p>)/gi);
        console.log(contentArr);
        return (
          <div
            style={{
              margin: '0 auto',
              width: '40%',
              border: '2px solid black',
            }}
            className="version-box"
          >
            <div>작성자 : {version?.userId}</div>

            <div
              dangerouslySetInnerHTML={{
                __html: `내용${version.content}`,
              }}
            ></div>

            <div>작성자 코멘트 : {version?.comment}</div>
            <div>변경 시간 : {version?.createdAt}</div>
            <div>version : {version?.version}</div>

            <div className="convercontent">
              <br />
              {version?.diff.map((di) => {
                if (di.type === 'remove') {
                  const convertContent =
                    "<div class='red'>" + di.value + '</p></div>';
                  contentArr[di.idx] = convertContent;
                } else if (di.type === 'add') {
                  const convertContent =
                    "<div class='green'>" + di.value + '</p></div>';
                  contentArr[di.idx] = convertContent;
                }
              })}
              <div
                dangerouslySetInnerHTML={{
                  __html: `내용${contentArr.join('')}`,
                }}
              ></div>
            </div>

            <div className="btnGroup">
              <Link
                to={`/report/${movieId}/${version.version}/?postId=${version.postId}`}
              >
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
