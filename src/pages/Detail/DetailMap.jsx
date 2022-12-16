import { useEffect } from 'react';

export default function DetailMap({ detail }) {
  const { kakao } = window;
  
  /* 지도 */
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(detail.mapy, detail.mapx),
      level: 7,
    };

    const map = new kakao.maps.Map(container, options);
    map.setDraggable(false);
    map.setZoomable(false);

    new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(detail.mapy, detail.mapx),
    });
  }, [kakao.maps.LatLng, kakao.maps.Map, kakao.maps.Marker, detail.mapx, detail.mapy]);

  return (
    <>
      <div style={{ width: '100%', height: '100%' }} id="map"></div>
    </>
  );
}
