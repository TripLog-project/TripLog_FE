import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import SubMain from './pages/SubMain/SubMain';
import Plan from './pages/Plan/Plan';
import List from './pages/Lists/List';
import DetailPage from './pages/Detail/DetailPage';
import MyPage from './pages/MyPage/MyPage';
import Budget from './pages/Budget/Budget';
import CheckList from './pages/CheckList/CheckList';
import Login from './pages/Login/Login';
import Users from './pages/Users/Users';
import KakaoRedirectHandler from './components/KakaoRedirectHandler.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/submain/:areacode" element={<SubMain />} />
      <Route path="/plan/:areacode" element={<Plan />} />
      <Route path="/list/:region/:type" element={<List />} />
      <Route path="/detail/:region/:contentid" element={<DetailPage />} />
      <Route path="/mypage/:nickName/:option" element={<MyPage />} />
      <Route path="/charge" element={<Budget />} />
      <Route path="/checkList" element={<CheckList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user" element={<Users />} />
      <Route path="/oauth/callback/kakao" element={<KakaoRedirectHandler />} />
    </Routes>
  );
}

export default App;
