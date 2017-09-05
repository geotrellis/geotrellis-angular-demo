import { LayerCard } from './layer-card.d';
import * as chroma from 'chroma-js';

export const LAYERCARDS: LayerCard[] = [
    {
        info: {
            name: 'lm',
            title: 'Philly Location Modeling',
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
        },
        params: 'ImperviousSurfaces_Barren Lands_Open Water,DevelopedLand,Wetlands,ForestedLands,Non-workingProtectedOrPublicLands,PublicallyOwnedWorkingLands,PrivatelyOwnedWorkingLandsWithEasements,FarmlandWithoutPrimeAgriculturalSoils,FarmlandOrForestedLandsWithPrimeAgriculturalSoils',
        weights: [-5, -4, -2, 1, -1, 2, 4, 3, 5],
        show: true,
        opacity: 0.6,
        wmsServer: 'http://demo.geotrellis.com/chatta/gt/wo',
        sumServer: 'http://demo.geotrellis.com/chatta/gt/sum',
        mask: '',
        palette: 'yellow-to-red-heatmap',
        summary: null,
    },
];


