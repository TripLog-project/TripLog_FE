/* global kakao */
import { useState, useEffect } from 'react';
import {Container, Row, Col, Badge, Card } from 'react-bootstrap';
import axios from 'axios';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';
import { useNavigate, useParams } from 'react-router-dom';
import Review from '../../components/Review';
import ReviewBox from './contents/Review/ReviewBox';

export default function Detail() {
  const navigator = useNavigate();
  const params = useParams();
  const contentId = params.contentId;

  const [tourData, setTourData] = useState([]);
  const [reviewData, setReviewData] =useState([]);
  const [details, setDetails] = useState([]);
  const [like, setLike] = useState([]);
  const [review, setReview] = useState(true);


  /* 투어 API */
  useEffect (() => {
    axios.get(`https://apis.data.go.kr/B551011/KorService/detailCommon?serviceKey=rfaoGpiapHFqOcUT6bqfERRxy1WVxzOdOpEC3ChyAFPEfONdSMdRVNETTJKRhqTbPuZ2krpG2mQJMXDbyG74RA%3D%3D&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${contentId}&contentTypeId=12&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y`)
    .then(response => {
      setTourData(response.data.response.body.items.item[0]);
    })
  }, []);

  /* 리뷰 */
  useEffect (() => {
    axios
      .get(`http://localhost:4000/review/${contentId}`)
      .then((res) => {
        setReviewData(res.data);
      })
      .catch(() => console.log("리뷰 실패"));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/detail/${contentId}`)
      .then((res) => {
        console.log(res.data);
        setDetails(res.data);
      })
      .catch(() => {
        console.log("실패");
      });
  }, [like]);

  // 유저 데이터 가져오기
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/user/getlikes")
  //     .then((res) => {
  //       setLike(res.data[0].likes);
  //     })
  //     .catch(() => {
  //       console.log("실패");
  //     });
  // }, []);

  const handleToggle = (b) => () => {
    console.log(b);
    const currentIndex = like.indexOf(b);
    console.log(currentIndex);
    const newLike = [...like];
    console.log(newLike);

    if (currentIndex === -1) {
      newLike.push(b);
      axios
        .post(`http://localhost:4000/detail/inclike/${contentId}`)
        .then(console.log("좋아요 + 1"));
    } else {
      newLike.splice(currentIndex, 1);
      axios
        .post(`http://localhost:4000/detail/deletelike/${contentId}`)
        .then(console.log("좋아요 -1"));
    }
    setLike(newLike);
    axios
      .post("http://localhost:4000/user/arrlike", newLike)
      .then((res) => console.log(res.data));
  };

    /* 지도 */
    useEffect(() => {
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(tourData.mapy, tourData.mapx),
        level: 7
      };
  
      const map = new kakao.maps.Map(container, options);
      map.setDraggable(false);
      map.setZoomable(false);
  
      new kakao.maps.Marker({
        map:map,
        position: new kakao.maps.LatLng(tourData.mapy, tourData.mapx),
      })
    }, [tourData.mapy])

  return (
    <>
    <Nav/>
    <Container>
      <Row xs={1} md={2} lg={2}>
        <Col>
          <Card className="mt-3">
            <Card.Img variant="top" src={tourData.firstimage} style={{height: '30vh', objectFit: 'cover'}} />
            <Card.Body>
              <div className='d-flex justify-content-center mt-2'>
                <div className="text-center flex-fill">
                  <h5 sytle={{cursor:'pointer'}} onClick={handleToggle(contentId)}>
                    {like.indexOf(contentId) !== -1 ? "❤" : "🤍"}
                  </h5>
                  <p>좋아요</p>
                </div>
                <div className="text-center flex-fill"
                  onClick={()=> {
                    navigator('/plan');
                  }} style={{ cursor: 'pointer'}}>
                  <h5>📆</h5>
                  <p>일정짜기</p>
                </div>
                <div className="text-center flex-fill">
                  <h5>⭐</h5>
                  <p>리뷰쓰기</p>
                </div>
                <div className="text-center flex-fill">
                  <h5>⬆</h5>
                  <p>공유하기</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="mt-3 " style={{overflowY: "scroll"}}>
            <Card.Body className="m-2 " style={{height: '40vh'}}>
              <p className=' mb-2 text-muted' >조회수 <span>{details.view}</span></p>
              <Card.Title className="mb-3">{tourData.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">📍 {tourData.addr1}</Card.Subtitle>
              <Card.Text className='mb-2'>
              ⭐⭐⭐⭐⭐<span> 30 </span> ❤ <span>{details.like}</span>
              </Card.Text>
              <Card.Text >
                <p dangerouslySetInnerHTML={{ __html: tourData.overview }}></p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="m-3">
        <h4>기본 정보</h4>
        <div id="map" style={{width: '700px', height: '30vh'}} className="mt-2 mb-3 "></div>
        <Col className="bg-light mx-2">
          <p className="mt-3 text-start">
            <span className="fw-bold mx-5 ">주소</span>
            {tourData.addr1}</p>
          <p> 
            <span className="fw-bold mx-5">전화</span>
            {tourData.tel}</p>
          <p> 
            <span className="fw-bold mx-5">홈페이지</span>
            <a dangerouslySetInnerHTML={{ __html: tourData.homepage }}></a></p>
        </Col>
      </Row>

      {/* 리뷰 */}
      <Row className="mt-5 mb-3 mx-5 d-flex">
          <Col className=" text-start">
          <span className='fw-bold fs-4'>리뷰
            <span className="text-success mx-2">{reviewData.length}</span>
          </span>
          </Col>
          <Col>
          
              
          </Col>
          <Col className="justify-content-center">
            
          </Col>
          <ReviewBox className="col-2" setReivew={setReview} />
      </Row>

    {review === true ? <Review/> : <Review/>}

    </Container>
    <Footer/>
    </>
  )
}
