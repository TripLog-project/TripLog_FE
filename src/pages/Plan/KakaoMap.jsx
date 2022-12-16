/* global kakao */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SelectList from '../../components/Plan/SelectList';
import { useSelector } from 'react-redux';

let pickMap = {
  1: { MapY: '127.04', MapX: '37.59' }, //서울
  6: { MapY: '129.16', MapX: '35.15' }, //부산
  32: { MapY: '128.89', MapX: '37.79' }, //강원
  35: { MapY: '129.33', MapX: '35.78' }, //경주
  37: { MapY: '127.15', MapX: '35.81' }, //전주
  39: { MapY: '126.54', MapX: '33.368' }, //제주
};

export default function KakaoMap(props) {
  console.log(pickMap[props.areaCode].MapX, pickMap[props.areaCode].MapY);
  const state = useSelector((state) => state.triplog);

  // Kakao Map 사용을 위한 useEffect
  useEffect(() => {
    const container = document.getElementById(`map${props.idx}`);
    // 기본이 되는 지도 중앙 위치
    const options = {
      center: new kakao.maps.LatLng(
        pickMap[props.areaCode].MapX,
        pickMap[props.areaCode].MapY
      ),
      // 지도 레벨(높을 수록 멀어진다)
      level: 11,
    };
    // 지도 생성을 위한 메소드
    const map = new kakao.maps.Map(container, options);

    // 지도가 2개 이상 호출되면 layout을 새롭게 잡아줘야함(카카오 권장 사항)
    map.relayout();

    // 이제 redux 에서만 값을 받아서 지도를 그려줌 + idx 를 통해 각각 날짜에 맞는 데이터를 지도에 뿌려준다!
    // 추가 및 삭제 시에도 redux 값에 따라 해당 변화 값을 자동으로 지도에 적용!
    // 선택한 list에 대한 forEach
    if (state.planItems[props.idx]) {
      state.planItems[props.idx].forEach((el, num, arr) => {
        let imageSrc = '/images/marker.png', // 마커이미지의 주소입니다
          imageSize = new kakao.maps.Size(26, 30), // 마커이미지의 크기입니다
          imageOption = { offset: new kakao.maps.Point(13, 28) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
          ),
          markerPosition = new kakao.maps.LatLng(el.mapy, el.mapx); // 마커가 표시될 위치입니다

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage, // 마커이미지 설정
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
        // path 를 주기 위해서 리스트에 저장 된 공간의 좌표를 pathArr 라는 배열에 푸쉬
        let pathArr = [];
        for (let i = 0; i < state.planItems[props.idx].length; i++) {
          pathArr.push(new kakao.maps.LatLng(arr[i].mapy, arr[i].mapx));
        }
        // 선을 긋기 위한 메소드
        const polyline = new kakao.maps.Polyline({
          // 지도생성
          map: map,
          // path의 배열
          path: pathArr,
          // 선을 굵기
          strokeWeight: 3,
          // 선의 색
          strokeColor: '#60907a',
          // 선의 불투명도
          strokeOpacity: 0.8,
          // 선의 스타일
          strokeStyle: 'solid',
        });

        // 선 생성
        polyline.setMap(map);
        // 선의 배열
        polyline.getPath();
        // 선의 길의 계산
        polyline.getLength();
      });
    }
    // list가 변경 될 때 마다 실행
  }, [state.planItems[props.idx]]);

  return (
    <>
      <KakaoDiv id={`map${props.idx}`}></KakaoDiv>
    </>
  );
}

const KakaoDiv = styled.div`
  height: 20rem;
`;
