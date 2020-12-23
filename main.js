import Map from 'ol/Map';
import View from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {TileWMS as TileWMSSource, Stamen as StamenSource, Vector as VectorSource} from 'ol/source';
import {fromLonLat, transform} from 'ol/proj';

var map;
let viewDefault = new View({
    center: fromLonLat([144.967386, -37.818259]),
    zoom: 12
})

let curveBoardSource = new VectorSource({
    url: 'data/curveboards.geojson',
    format: new GeoJSON()
});

var curveBoardStyle = new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.6)',
    }),
    stroke: new Stroke({
      color: '#319FD3',
      width: 1,
    }),
    image: new CircleStyle({
      radius: 5,
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.6)',
      }),
      stroke: new Stroke({
        color: '#319FD3',
        width: 1,
      }),
    }),
  });

let railCorridorLayer = new TileLayer({
    source: new TileWMSSource({
        url: 'https://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/wms',
        params: {
            'VERSION': '1.1.1',
            'LAYERS': 'PTV_TRAIN_CORRIDOR_CENTRELINE',
        },
        ratio: 1,
        serverType: 'geoserver',
    })
});

let trainStationLayer = new TileLayer({
    source: new TileWMSSource({
        url: 'https://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/wms',
        params: {
            'VERSION': '1.1.1',
            'LAYERS': 'PTV_METRO_TRAIN_STATION',
            //'SLD': 'https://hyperchicken.com/networkmapdev/sld/stations.sld'
        },
        ratio: 1,
        serverType: 'geoserver',
        style: curveBoardStyle,
    })
});

let curveBoardLayer = new VectorLayer({
    source: curveBoardSource,
    style: curveBoardStyle
});

initMap();

function initMap() {
    map = new Map({
        target: 'map',
        layers: [
            new TileLayer({
                source: new StamenSource({
                    layer: 'toner-lite',
                })
            }),
            railCorridorLayer,
            trainStationLayer
        ],
        view: viewDefault
    });
    map.on('click', function(evt){
        alert("yay")
        //console.log(transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'));
    });
}