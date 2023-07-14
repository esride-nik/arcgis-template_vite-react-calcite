import React from 'react';
import { App } from './App';
import AppStateProvider from './App/AppState';
import './global.css';

import '@esri/calcite-components/dist/calcite/calcite.css';
import WebScene from '@arcgis/core/WebScene';
import WebMap from '@arcgis/core/WebMap';
import SceneProvider from './Scene/SceneProvider';
import MapProvider from './Map/MapProvider';
import MapApp from './App/MapApp';
import ReactDOM from 'react-dom';

const webScene = new WebScene({
  portalItem: {
    // id: '91b46c2b162c48dba264b2190e1dbcff' // org mountain
    id: '037cceb0e24440179dbd00846d2a8c4f' // 3d buildings
  }
});
const webMap = new WebMap({
  portalItem: {
    id: '35300200d40942ca8e7cb0a5be3ed8ce' // rauschgift (2d map)
  }
});

ReactDOM.render(
  <React.StrictMode>
    <AppStateProvider>
      {/* <SceneProvider map={webScene}>{<App />}</SceneProvider> */}
      <MapProvider map={webMap}>{<MapApp />}</MapProvider>
    </AppStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
