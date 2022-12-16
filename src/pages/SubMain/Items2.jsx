import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import CardItemLink from '../../components/CardItemLink';
import data from '../../data';
import { useSelector } from 'react-redux';
// detail 페이지의 submenu 부분

export default function Items2({ width, height, pickAreaName }) {
  const navigate = useNavigate();
  const params = useParams();
  const areaCode = params.areaCode;

  const [datas] = useState(data);
  const region = useSelector((state) => state.triplog.region);

  let h = 0;
  for (let i = 0; i < datas.length; i++) {
    for (let j = 2; j < datas[i].length; j++) {
      if (datas[i][j].find((el) => el.areacode === areaCode) !== undefined) {
        h = i;
      }
    }
  }
  
  return (
    <Container className="p-3 mb-4 mt-5">
      <Row className="d-block justify-content-start">
        <Col className="m-lg-3 m-md-1">
          <Title className="justify-content-start fw-bold">
            💚 {pickAreaName}에 간다면?
          </Title>
          <SubTitle className="m-lg-0 m-md-2 fs-6 text-secondary">
            겨울에 가면 더 좋은 {pickAreaName} 여행지 추천
          </SubTitle>
        </Col>
      </Row>

      <Row>
        <TableContainer>
          {datas.length > 0 ? (
            datas[h][3].map((a, i) => {
              return (
                <CardItemLink
                  key={i}
                  width={width}
                  height={height}
                  src={a.firstimage}
                  title={a.title}
                  onClick={() => {
                    navigate(`/detail/${region}/${a.contentid}`);
                  }}
                />
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
