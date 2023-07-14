import * as styles from './App.module.css';

import { useEffect, useRef } from 'react';

import '@esri/calcite-components/dist/components/calcite-card';
import Map from '../Map/Map';
import { useMap } from '../Map/MapProvider';
import OverlayGlobe from '../OverlayGlobe/OverlayGlobe';
import Slides from '../Slides/Slides';
import { useAppState } from './AppState';

console.log('Start App');

export function App() {
  const { state: map } = useMap();
  const globeDiv = useRef(null);
  useEffect(() => {
    const view = map.view;
    if (view) {
      view.ui.add(globeDiv.current!, 'bottom-right');
    }
  }, [map]);

  const { state: appState } = useAppState();

  return (
    <>
      <div className={styles.app}>
        <div className={styles.slides}>
          {/* <Slides></Slides> */}
        </div>
        <div className={styles.scene}>
          <Map></Map>
        </div>
      </div>
    </>
  );
}

export default App;
