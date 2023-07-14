import MapView from '@arcgis/core/views/MapView';
import { useEffect, useRef } from 'react';

import * as styles from './Map.module.css';
import { useMap } from './MapProvider';

interface MapProps {
  view?: __esri.MapViewProperties;
}

export function Map(props: MapProps) {
  const viewDiv = useRef(null);

  const { state, dispatch } = useMap();

  useEffect(() => {
    const view = new MapView({
      container: viewDiv.current!,
      map: state.map,
      ...props.view
    });
    dispatch({ type: 'INITIALIZE', view });

    return () => {
      view.destroy();
      dispatch({ type: 'DESTROY' });
    };
  }, []);

  return <div className={styles.viewDiv} ref={viewDiv}></div>;
}

export default Map;
