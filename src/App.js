import { Route, Routes } from 'react-router-dom';

import './App.css';
import { AdminRoute } from './components/AdminRoute';
import { UserRoute } from './components/UserRoute';
import Header from './layout/Header';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import MovieDetailPage from './pages/MovieDetailPage';
import MovieUpdatePage from './pages/MovieUpdatePage';
import MovieVersionPage from './pages/MovieVersionPage';
import NotFoundPage from './pages/NotFoundPage';
import ReportBoardPage from './pages/ReportBoardPage';
import ReportDetail from './pages/ReportDetail';
import ReportPage from './pages/ReportPage';
import SignupPage from './pages/SignupPage';
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<IndexPage />} />
        <Route path="/movie/:movieId" element={<MovieDetailPage />} />
        <Route
          path="/movie/update/:movieId"
          element={
            <UserRoute>
              <MovieUpdatePage />
            </UserRoute>
          }
        />
        <Route path="/movie/version/:movieId" element={<MovieVersionPage />} />
        <Route
          path="/report/:movieId/:version"
          element={
            <UserRoute>
              <ReportPage />
            </UserRoute>
          }
        />
        <Route
          path="/report"
          element={
            <AdminRoute>
              <ReportBoardPage />
            </AdminRoute>
          }
        />
        <Route
          path="/report/:notiId"
          element={
            <AdminRoute>
              <ReportDetail />
            </AdminRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
