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
import KakaoRedirectHandler from './components/KakaoRedirectHandler.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';

function App() {
  let state = useSelector((state) => state.users);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/SubMain/:areaCode" element={<SubMain />} />
      {state.isLogin ? <Route path="/Plan/:areaCode" element={<Plan />} /> : <Route path="/Plan/:areaCode" element={<Login />} />}
      <Route path="/list/:region/:type" element={<List />} />
      <Route path="/detail/:region/:contentid" element={<DetailPage />} />
      <Route path="/mypage/:nickName/:option" element={<MyPage />} />
      {state.isLogin ? <Route path="/Budget" element={<Budget />} /> : <Route path="/Budget" element={<Login />} />}
      {state.isLogin ? <Route path="/CheckList" element={<CheckList />} /> : <Route path="/CheckList" element={<Login />} />}
      <Route path="/login" element={<Login />} />
      <Route path="/oauth/callback/kakao" element={<KakaoRedirectHandler />} />
    </Routes>
  );
}

export default App;
