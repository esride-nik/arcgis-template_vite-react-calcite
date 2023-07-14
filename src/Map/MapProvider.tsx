import { createContext, useContext, useReducer } from 'react';

import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import WebScene from '@arcgis/core/WebScene';
import WebMap from '@arcgis/core/WebMap';

interface MapProviderProps {
  map?: Map | __esri.MapProperties;
}

type BaseContextState = {
  view?: MapView | null;
};

type MapContextState = BaseContextState & {
  type: 'esri.Map';
  map: Map;
};

type WebMapContextState = BaseContextState & {
  type: 'esri.WebMap';
  map: WebMap;
};

type ContextState = MapContextState | WebMapContextState;

type Action = { type: 'INITIALIZE'; view: MapView } | { type: 'DESTROY' };

type Dispatch = (action: Action) => void;

type MapContext = {
  state: ContextState;
  dispatch: Dispatch;
};

type TypedSceneContext<G extends Map> = {
  state: {
    view?: MapView;
    map: G;
  };
  dispatch: Dispatch;
};

const reducer = (state: ContextState, action: Action): ContextState => {
  switch (action.type) {
    case 'INITIALIZE':
      const view = action.view;
      return { ...state, view };
    case 'DESTROY':
      const map = state.view?.map;
      if (map) {
        map.destroy();
      }
      return { ...state, view: null };
    default:
      throw new Error('Invalid action');
  }
};

const MapContext = createContext<MapContext | undefined>(undefined);

const defaultProps: MapProviderProps = {
  map: {
    basemap: 'satellite',
    ground: 'world-elevation'
  }
};

const createInitialContext = (props: MapProviderProps): ContextState => {
  const map = props.map;

  if (map instanceof WebMap && map.declaredClass === 'esri.WebMap') {
    return {
      type: map.declaredClass,
      map: map
    };
  } else if (map instanceof Map && map.declaredClass === 'esri.Map') {
    return {
      type: map.declaredClass,
      map: map
    };
  } else {
    return {
      type: 'esri.Map',
      map: new Map({
        basemap: 'satellite',
        ground: 'world-elevation',
        ...map
      })
    };
  }
};

const MapProvider: React.FC<MapProviderProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, createInitialContext(props));
  const value = { state, dispatch };
  return <MapContext.Provider value={value}>{props.children}</MapContext.Provider>;
};

function useMap() {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
}

function useWebMap() {
  const scene = useMap();
  const { state } = scene;
  if (state.type !== 'esri.WebMap') {
    throw new Error('useScene must be used within a SceneProvider with map being a WebScene');
  }

  return scene as TypedSceneContext<WebMap>;
}

export default MapProvider;
export { MapContext as SceneContext, useMap, useWebMap };
