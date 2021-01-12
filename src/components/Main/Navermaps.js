import { NaverMap } from 'react-naver-maps';

function naverMap() {
  const navermaps = window.naver.maps;
  let mapOptions = {
    zoomControl: true,
    zoomControlOptions: {
      position: navermaps.Position.RIGHT_CENTER,
    },
    mapTypeControl: true,
    MapTypeControlOptions: {
      position: navermaps.Position.TOP_RIGHT,
    },
    zoom: 15,
    scaleControl: true,
    scaleControlOptions: {
      position: navermaps.Position.BOTTOM_RIGHT,
    },
    logoControl: false,
    logoControlOptions: {
      position: navermaps.Position.BOTTOM_LEFT,
    },
    mapDataControl: false,
    minZoom: 6,
  };
  return (
    <NaverMap
      style={{
        width: '100%',
        height: '100%',
      }}
      center={new navermaps.LatLng(37.5657, 126.9769)}
      {...mapOptions}
    ></NaverMap>
  );
}
export default naverMap;
