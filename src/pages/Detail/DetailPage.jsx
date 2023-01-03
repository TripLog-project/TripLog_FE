import { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';
import { useParams } from 'react-router-dom';
import Review from './Review/Review';
import ReviewBox from './Review/ReviewBox';
import Url from '../../components/share/Url';
import Kakao from '../../components/share/Kakao';
import { BeatLoader } from 'react-spinners';

// redux 에서 review 업데이트 여부를 받아옴
import { useDispatch, useSelector } from 'react-redux';
import DetailMap from './DetailMap';
import Progress from '../../components/Progress';
import { likeUpdate } from '../../store/modules/like';

export default function Detail() {
  const params = useParams();
  const contentid = params.contentid;
  const region = params.region;

  const dispatch = useDispatch();
  const updateReview = useSelector((state) => state.review.reviewUpdate);
  const updateLike = useSelector((state) => state.like.likeUpdate);
  const nickName = useSelector((state) => state.users.userNickName);

  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState('');
  const [homepage, setHomepage] = useState([]);
  const [review, setReview] = useState([]);

  const [like, setLike] = useState([]);
  const [likeClickUser, setLikeClickUser] = useState(['']);

  const [detail, setDetail] = useState([]);

  const [load, setLoad] = useState(false)

  // 이미지 로딩 실패시
  const onErrorImg = (e) => {
    e.target.src = process.env.PUBLIC_URL + '/images/defaultImage.png';
  };

  // 전체 데이터
  useEffect(() => {
    axios
      .get(`http://3.35.13.65:4000/detail/${region}/${contentid}`)
      .then((response) => {
        setDetail(response.data);
        setLoad(true)
      });
  }, [contentid, region]);

  // 페이지정보를 가져오는 API
  useEffect(() => {
    axios
      .get(
        `https://apis.data.go.kr/B551011/KorService/detailCommon?serviceKey=rfaoGpiapHFqOcUT6bqfERRxy1WVxzOdOpEC3ChyAFPEfONdSMdRVNETTJKRhqTbPuZ2krpG2mQJMXDbyG74RA%3D%3D&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${contentid}&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y`
      )
      .then((response) => {
        setOverview(response.data.response.body.items.item[0].overview);
        setHomepage(response.data.response.body.items.item[0].homepage);
        setLoading(false);
      })
      .catch(() => new Error('실패'));
  }, [contentid]);

  /* 좋아요 데이터 */
  useEffect(() => {
    axios
      .get(`http://3.35.13.65:4000/detail/${contentid}`)
      .then((res) => {
        setLikeClickUser(res.data.likeuser);
        setLike(res.data.like);
      })
      .catch(() => new Error('실패'));
  }, [contentid, updateLike]);

  /* 리뷰 정보 */
  useEffect(() => {
    axios
      .get(`http://3.35.13.65:4000/review/${contentid}`)
      .then((res) => {
        setReview(res.data);
      })
      .catch(() => new Error('리뷰 실패'));
  }, [contentid, updateReview]);

  /* 별점 평균평점 계산 */
  const INITIALVALUE = 0;
  const starList = [];
  for (let key in review) {
    starList.push(parseInt(review[key].star));
  }
  const starSum = starList.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    INITIALVALUE
  );
  const starAvg = (starSum / starList.length).toFixed(1);

  /* 좋아요 클릭 이벤트 함수 */
  const likeClick = () => {
    if (nickName === '') {
      alert('로그인후 이용 가능합니다.');
      return false;
    }
    if (likeClickUser.includes(nickName) === false) {
      axios
        .post('http://3.35.13.65:4000/like/plus', {
          nickName,
          contentid,
          region,
        })
        .then(() => {
          dispatch(likeUpdate());
          alert('좋아요가 추가 되었습니다.');
        })
        .catch(() => new Error('통신에러'));
    } else {
      axios
        .post('http://3.35.13.65:4000/like/minus', {
          nickName,
          contentid,
          region,
        })
        .then(() => {
          dispatch(likeUpdate());
          alert('좋아요가 삭제 되었습니다.');
        });
    }
  };

  // 해당 디테일의 좋아요 클릭 유저정보
  const likeUser = likeClickUser.includes(nickName) === false ? '🤍' : '❤️';

  const scrollReview = () => {
    window.scrollTo(0, document.documentElement.scrollHeight);
  };

  if (load) {
    return (
      <>
        <Nav />
        <Container className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
          <Row xs={1} md={1} lg={2} xxs={1} className="">
            <Col>
              <Card className="mt-3" style={{ height: '60vh' }}>
                <Card.Img
                  variant="top"
                  src={detail.firstimage1}
                  onError={onErrorImg}
                  style={{ height: '45vh', objectFit: 'cover' }}
                  className="fluid border"
                />
                <Card.Body className="d-flex justify-content-center align-items-center">
                  <div
                    className="text-center flex-fill flex-row"
                    style={{ cursor: 'pointer' }}
                  >
                    <h5 sytle={{ cursor: 'pointer' }} onClick={likeClick}>
                      {likeUser}
                    </h5>
                    <div>좋아요</div>
                  </div>
                  <div
                    className="text-center flex-fill"
                    style={{ cursor: 'pointer' }}
                    onClick={scrollReview}
                  >
                    <h5>⭐</h5>
                    <div>리뷰쓰기</div>
                  </div>
                  <div
                    className="text-center flex-fill"
                    style={{ cursor: 'pointer' }}
                  >
                    <Kakao tourData={detail} />
                    <div className="pt-2">카카오 공유</div>
                  </div>
                  <div
                    className="text-center flex-fill "
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      alert('url이 복사되었습니다.');
                    }}
                  >
                    <Url />
                    <div style={{ fontSize: '1rem' }}>URL공유</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card
                className="mt-3 px-3"
                style={{ overflowY: 'scroll', height: '60vh' }}
              >
                <Card.Body className="m-2 " style={{ height: '40vh' }}>
                  <div className=" mb-2 text-muted text-end">
                    조회수 {detail.view + 1}
                  </div>
                  <Card.Title className="mb-3 fw-bold">
                    {detail.title}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    📍 {detail.addr1}
                  </Card.Subtitle>
                  <Card.Text className="mb-4">
                    <Progress starAvg={starAvg} /> <span>❤ {like}</span>
                  </Card.Text>
                  <div>
                    <Row className="mt-1">
                      <span className="fw-bold">전화</span>
                      <div>
                        {detail.tel !== ''
                          ? detail.tel
                          : '전화번호 정보가 없습니다.'}
                      </div>
                    </Row>
                    <Row>
                      <span className="fw-bold">홈페이지</span>
                      {loading ? (
                        <div className=" d-flex justify-content-center">
                          <BeatLoader color="#198754" />
                        </div>
                      ) : homepage !== '' ? (
                        <a
                          dangerouslySetInnerHTML={{ __html: homepage }}
                          href="!#"
                        ></a>
                      ) : (
                        <div>홈페이지 정보가 없습니다.</div>
                      )}
                    </Row>
                  </div>
                  <div>
                    <span className="fw-bold">장소설명</span>
                    {loading ? (
                      <BeatLoader
                        color="#198754"
                        className="text-center mt-5"
                      />
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: overview }}></div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* 지도 */}
          <h5 className="fw-bold mt-3">위치 보기</h5>
          <Card className="mt-3" style={{ height: '40vh' }}>
            <DetailMap detail={detail} />
          </Card>

          {/* 리뷰 */}
          <div className="fw-bold fs-5 mt-3">
            <span>리뷰</span>
            <span className="text-success mx-1">{review.length}</span>
          </div>
          <Col className="text-end col-12">
            <ReviewBox review={review} title={detail.title} region={region} />
          </Col>
          <Review review={review} region={region}/>
        </Container>
        <Footer />
      </>
    );
  }
}
