import React from 'react';

function ReportBoardPage() {
  return (
    <div>
      <h1>신고 목록 게시판</h1>
      <div
        className="board"
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '50%',
          margin: '0 auto',
        }}
      >
        <ol>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ol>
      </div>
    </div>
  );
}

export default ReportBoardPage;
