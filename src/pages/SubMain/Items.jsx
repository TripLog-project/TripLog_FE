import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import CardItemLink from '../../components/CardItemLink';
import data from '../../data';
import { useSelector } from 'react-redux';

// detail 페이지의 submenu 부분
export default function Items({ text, subText, srcImg, width, height }) {
  const navigate = useNavigate();
  const params = useParams();
  const areaCode = params.areaCode;

  const [tourData, setTourData] = useState([]);
  const region = useSelector((state) => state.triplog.region);

  useEffect(() => {
    axios
      .get(
        `https://apis.data.go.kr/B551011/KorService/areaBasedList?serviceKey=rfaoGpiapHFqOcUT6bqfERRxy1WVxzOdOpEC3ChyAFPEfONdSMdRVNETTJKRhqTbPuZ2krpG2mQJMXDbyG74RA%3D%3D&numOfRows=498&pageNo=1&MobileOS=ETC&MobileApp=TripLog&_type=json&listYN=Y&arrange=B&contentTypeId=${region}&areaCode=${areaCode}`
      )
      .then((response) => {
        setTourData(response.data.response.body.items.item);
      });
  }, []);

  const [datas, setDatas] = useState(data);
  const [okay, setOkay] = useState(false);

  let h = 0;
  for (let i = 0; i < datas.length; i++) {
    for (let j = 2; j < datas[i].length; j++) {
      if (datas[i][j].find((el) => el.areacode === areaCode) !== undefined) {
        h = i;
      }
    }
  }
  return (
    <Container className="p-3 mt-5 position-relative">
      <Row className="d-block justify-content-start">
        <Col className="m-lg-3 m-md-1">
          <Title className="justify-content-start fw-bold">{text}</Title>
          <SubTitle className="m-lg-0 m-md-2 fs-6">{subText}</SubTitle>
        </Col>
      </Row>

      <Row>
        <TableContainer>
          {datas.length > 0 ? (
            datas[h][2].map((tourData, i) => {
              return (
                <>
                  <CardItemLink
                    key={i}
                    width={width}
                    height={height}
                    src={datas[h][2][i].firstimage}
                    title={datas[h][2][i].title}
                    onClick={() => {
                      navigate(`/detail/${region}/${tourData.contentid}`);
                    }}
                  />
                </>
              );
            })
          ) : (
            <div>잠시만요!🏖</div>
          )}
        </TableContainer>
      </Row>
    </Container>
  );
}

// style-components
const TableContainer = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  overflow-y: hidden;
`;
const Title = styled.p`
  font: 2rem/1 'Inter';
  @media screen and (max-width: 1200px) {
    font: 2rem/1 'Inter';
  }
  @media screen and (max-width: 992px) {
    font: 1.5rem/1 'Inter';
  }
  @media screen and (max-width: 576px) {
    font: 1.1rem/1 'Inter';
  }
`;

const SubTitle = styled.p`
  font: 2rem/1 'Inter';
  @media screen and (max-width: 1200px) {
    font: 2rem/1 'Inter';
  }
  @media screen and (max-width: 992px) {
    font: 1.5rem/1 'Inter';
  }
  @media screen and (max-width: 576px) {
    display: none;
  }
`;
