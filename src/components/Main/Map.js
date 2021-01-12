import React from 'react';
import Navermaps from './Navermaps';
import { RenderAfterNavermapsLoaded } from 'react-naver-maps';

function Map() {
  const NAVER_API_KEY = 'yaopeanxk2';

  return (
    <RenderAfterNavermapsLoaded
      ncpClientId={NAVER_API_KEY}
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
    >
      <Navermaps />
    </RenderAfterNavermapsLoaded>
  );
}
export default React.memo(Map);
