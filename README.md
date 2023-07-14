# ArcGIS Maps SDK for JavaScript + React/Vite/TypeScript + Calcite

A boilerplate for web mapping apps using:
- [ArcGIS Maps SDK for JavaScript](https://developers.arcgis.com/javascript/latest/)
- [Calcite components](https://developers.arcgis.com/calcite-design-system/components/)
- [React](https://reactjs.org/)

Built with [Vite](https://vitejs.dev/).

Set up:
```
npm install
```

`npm run dev` runs a development server  
`npm run build` creates a production build


## How to switch between 2D and 3D

Check itemId references in ``main.tsx``. Comment out either ``MapProvider`` or ``SceneProvider`` for 2D or 3D.