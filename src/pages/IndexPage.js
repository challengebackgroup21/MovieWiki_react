import React from 'react';
import TrendingList from '../components/TrendingList';
function IndexPage() {
  return (
    <div>
      <h1 style={{ margin: '100px 0' }}>Movie Wiki</h1>
      <form>
        <select name="searchType" id="searchType">
          <option value="title">제목</option>
          <option value="director">감독</option>
          <option value="genres">장르</option>
          <option value="nation">제작국가</option>
          <option value="openDt">개봉년도</option>
        </select>
        <input type="text" name="search" id="search" />
        <button>검색</button>
      </form>

      <TrendingList />
    </div>
  );
}

export default IndexPage;
