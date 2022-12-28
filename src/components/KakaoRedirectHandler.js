import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/modules/users';

export default function KakaoRedirectHandler() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const CODE = new URL(window.location.href).searchParams.get('code');

    // 카카오 디벨롭퍼에서 주는 정보
    const GRANT_TYPE = 'authorization_code';
    const KAKAO_CLIENT_ID = 'f25833457b45f3935443a269e01a48b1';
    const KAKAO_REDIRECT_URI = 'http://localhost:3000/oauth/callback/kakao';

    async function loginFetch() {
      const tokenResponse = await fetch(
        `https://kauth.kakao.com/oauth/token?grant_type=${GRANT_TYPE}&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${CODE}`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        }
      );

      // 토큰이 안나오는 이유를 찾기 위한 코드
      // 토큰 받는 코드
      if (tokenResponse.status === 200) {
        const token = await tokenResponse.json();

        const userResponese = await fetch(`https://kapi.kakao.com/v2/user/me`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        });

        if (userResponese.status === 200) {
          const userKaKaoInfo = await userResponese.json();

          const userLoginInfo = {
            email: userKaKaoInfo.kakao_account.email,
            nickName: userKaKaoInfo.kakao_account.profile.nickname,
            image: '',
          };

          const registerResponse = await fetch(
            'http://localhost:4000/user/register',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                type: 'kakao',
                email: userKaKaoInfo.kakao_account.email,
                nickName: userKaKaoInfo.kakao_account.profile.nickname,
                image: '',
              }),
            }
          );

          if (registerResponse.status === 200) {
            dispatch(login(userLoginInfo));
            navigate('/');
          } else {
            alert('회원 등록 이상');
            navigate('/login');
          }
        } else {
          alert('카카오 로그인 회원 정보 획득 실패');
          navigate('/login');
        }
      } else {
        alert('카카오 로그인 토큰 발행 실패');
        navigate('/login');
      }
    }
    loginFetch();
  }, [dispatch, navigate]);
}
