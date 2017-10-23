const PIN_ICON = 'M11.02.514c-3.977 0-6.87 3.277-6.87 6.87 0 2.155.762 3.338 1.778 5.425 2.035 4.18 5.092 8.677 5.092 8.677s3.056-4.496 5.093-8.678c1.016-2.088 1.777-3.27 1.777-5.426 0-3.593-2.892-6.87-6.87-6.87zm0 11.107c-2.197 0-3.977-1.78-3.977-3.978s1.78-3.98 3.977-3.98 3.978 1.783 3.978 3.98-1.78 3.98-3.978 3.98z';


const MAP = {

  SETTINGS: {
    key: 'AIzaSyA9u-JG55g-KRMJjLWX94gOP7EAeUQazq4',
    libraries: ['places'],
    version: '3.29',
    visible: false,
  },

  MARKER: function pinSymbol() {
    return {
      path: PIN_ICON,
      fillColor: '#f9924f',
      fillOpacity: 1,
      strokeColor: '#dd5f0d',
      strokeWeight: 1,
      scale: 2,
      anchor: {x: 11, y: 22},
    };
  },

  MARKER_ACTIVE: function pinSymbol() {
    return {
      path: PIN_ICON,
      fillColor: '#0fdac2',
      fillOpacity: 1,
      strokeColor: '#00a2a7',
      strokeWeight: 1,
      scale: 2,
      anchor: {x: 11, y: 22},
    };
  },

  THEME:
    [
      {
        featureType: 'landscape.natural',
        elementType: 'geometry.fill',
        stylers: [
          {visibility: 'on'},
          {color: '#e0efef'},
        ],
      },

      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [
          {visibility: 'off'},
        ],
      },

      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
          {lightness: 100},
          {visibility: 'simplified'},
        ],
      },

      {
        featureType: 'transit.line',
        elementType: 'geometry',
        styler: [
          {visibility: 'on'},
          {lightness: 700},
        ],
      },

      {
        featureType: 'water',
        elementType: 'all',
        stylers: [
          {color: '#7dcdcd'},
        ],
      },
    ],
};


export default MAP;
