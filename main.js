import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import TileWMSSource from 'ol/source/TileWMS';
import StamenSource from 'ol/source/Stamen';
import {fromLonLat} from 'ol/proj';

var map;
let viewDefault = new View({
    center: fromLonLat([144.967386, -37.818259]),
    zoom: 12
})

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
    })
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
}