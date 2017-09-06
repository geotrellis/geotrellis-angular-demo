// import { LayerCard } from './layer-card.d';
import * as chroma from 'chroma-js';

export interface LayerCard {
    info: {
        name: string,
        title: string,
        presets?: {
            weights: number[],
            text: string,
        }[],
        optional?: string[],
        prtext?: string[],
        range?: number,
        palettes?: string[],
        thumb: string,
        zoom: number,
        center: number[],
        api: {
            wms?: string,
            point?: {},
            poly?: {},
        };
    };
    weights: number[];
    show: boolean;
    opacity: number;
    mask?: string;
    params: string;
    wmsServer: string;
    palette: string[] | string;
    summary?: {
        layers: number[],
        total: number
    };
}

export const LAYERCARDS: LayerCard[] = [
    {
        info: {
            name: 'lm',
            title: 'Philly Location Modeling',
            zoom: 11,
            center: [39.992114502787494, -75.13412475585939],
            api: {
                wms: 'https://geotrellis.io/gt/weighted-overlay/wms'
            },
            presets: [
                {
                    weights: [3, -3, 0],
                    text: 'NEAR Bars, BUT NOT Grocery Stores'
                }, {
                    weights: [0, -3, 3],
                    text: 'NEAR Grocery Stores, BUT NOT Bars'
                }, {
                    weights: [0, -3, 3],
                    text: 'NEAR Rail Stops, BUT NOT Grocery Stores'
                }, {
                    weights: [3, 0, 0],
                    text: 'NEAR Bars'
                }],
            prtext: ['bars', 'grocery_stores', 'rail_stops'],
            range: 4,
            thumb: 'https://geotrellis.io/gt/weighted-overlay/wms?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&LAYERS=philly_bars%2Cphilly_grocery_stores%2Cphilly_rail_stops&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&HEIGHT=256&WIDTH=256&BREAKS=-41%2C-12%2C0%2C8%2C21%2C32%2C43%2C52%2C62%2C71%2C80%2C91%2C102%2C115%2C129%2C144%2C159%2C177%2C202%2C298&WEIGHTS=2%2C1%2C-2&SRS=EPSG%3A3857&BBOX=-8375052.315150191,4852834.051769271,-8365268.375529689,4862617.991389772'
        },
        params: 'philly_bars,philly_grocery_stores,philly_rail_stops',
        weights: [3, -3, 0],
        show: true,
        opacity: 0.6,
        wmsServer: 'https://geotrellis.io/gt/weighted-overlay/wms',
        palette: chroma.scale(this.colorLM).mode('lab').domain([0, 0.5, 0.6, 1]).colors(10)
    }, {
        info: {
            name: 'chatta',
            title: 'Chattanooga Agriculture & Forestry Value Model',
            zoom: 8.4,
            center: [34.76192255039478, -85.35140991210938],
            api: {
                wms: 'http://demo.geotrellis.com/chatta/gt/wo'
            },
            presets: [
                {
                    weights: [-5, -4, -2, 1, -1, 2, 4, 3, 5],
                    text: 'Preset1'
                }, {
                    weights: [-5, 4, -2, 1, 1, 2, 4, 3, 5],
                    text: 'Preset2'
                }
            ],
            optional: ['summary'],
            prtext: [
                'Impervious_Surfaces_Barren_Lands_Open_Water',
                'Developed_Land',
                'Wetlands',
                'Forested_Lands',
                'Non-working_Protected_Or_Public_Lands',
                'Publically_Owned_Working_Lands',
                'Privately_Owned_Working_Lands_With_Easements',
                'Farmland_Without_Prime_Agricultural_Soils',
                'Farmland_Or_Forested_Lands_With_Prime_Agricultural_Soils'
            ],
            range: 6,
            palettes: [
                'yellow-to-red-heatmap',
                'blue-to-yellow-to-red-heatmap',
                'dark-red-to-yellow-heatmap',
                'blue-to-red',
                'green-to-red-orange',
                'muted-terrain-qualitative',
                'green-to-orange',
                'light-to-dark-green',
                'light-to-dark-sunset',
                'purple-to-dark-purple-to-white-heatmap',
                'blue-to-orange',
                'bold-land-use-qualitative'
            ],
            thumb: 'https://geotrellis.io/img/demo_02.jpg'
        },
        params: 'ImperviousSurfaces_Barren Lands_Open Water,DevelopedLand,Wetlands,ForestedLands,Non-workingProtectedOrPublicLands,PublicallyOwnedWorkingLands,PrivatelyOwnedWorkingLandsWithEasements,FarmlandWithoutPrimeAgriculturalSoils,FarmlandOrForestedLandsWithPrimeAgriculturalSoils',
        weights: [-5, -4, -2, 1, -1, 2, 4, 3, 5],
        show: true,
        opacity: 0.6,
        wmsServer: 'http://demo.geotrellis.com/chatta/gt/wo',
        mask: undefined,
        palette: 'yellow-to-red-heatmap',
        summary: undefined,
    },
    {
        info: {
            name: 'potsdam',
            title: 'Potsdam Model',
            zoom: 8.4,
            center: [52.403269, 13.052745],
            api: {
                point: {
                    single: 'api/stats/point/single/',
                    diff: 'api/stats/point/diff/'
                },
                poly: {
                    single: 'api/stats/poly/single/',
                    diff: 'api/stats/poly/diff/'
                }
            },
            thumb: 'https://potsdam.geotrellis.io/tms/hillshade/isprs-potsdam-dsm/18/140577/86109'
        },
        params: 'ImperviousSurfaces_Barren Lands_Open Water,DevelopedLand,Wetlands,ForestedLands,Non-workingProtectedOrPublicLands,PublicallyOwnedWorkingLands,PrivatelyOwnedWorkingLandsWithEasements,FarmlandWithoutPrimeAgriculturalSoils,FarmlandOrForestedLandsWithPrimeAgriculturalSoils',
        weights: [-5, -4, -2, 1, -1, 2, 4, 3, 5],
        show: true,
        opacity: 0.6,
        wmsServer: 'http://demo.geotrellis.com/chatta/gt/wo',
        mask: undefined,
        palette: undefined,
        summary: undefined,
    },
];


