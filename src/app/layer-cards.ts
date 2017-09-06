import { LayerCard } from './layer-card.d';
import * as chroma from 'chroma-js';

export const LAYERCARDS: LayerCard[] = [
    {
        info: {
            name: 'lm',
            title: 'Philly Location Modeling',
            zoom: 11,
            center: [39.992114502787494, -75.13412475585939],
            presets: [
                {
                    value: [3, -3, 0],
                    text: 'NEAR Bars, BUT NOT Grocery Stores'
                }, {
                    value: [0, -3, 3],
                    text: 'NEAR Grocery Stores, BUT NOT Bars'
                }, {
                    value: [0, -3, 3],
                    text: 'NEAR Rail Stops, BUT NOT Grocery Stores'
                }, {
                    value: [3, 0, 0],
                    text: 'NEAR Bars'
                }, {
                    value: undefined,
                    text: 'Custom'
                }
            ],
            actions: ['info', 'weight', 'opacity'],
            infotext: 'This model uses the weighted overlay method, which break the location selection problem into three factors.',
            prtext: ['bars', 'grocery_stores', 'rail_stops'],
            range: 4,
            thumb: 'https://geotrellis.io/gt/weighted-overlay/wms?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&LAYERS=philly_bars%2Cphilly_grocery_stores%2Cphilly_rail_stops&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&HEIGHT=256&WIDTH=256&BREAKS=-41%2C-12%2C0%2C8%2C21%2C32%2C43%2C52%2C62%2C71%2C80%2C91%2C102%2C115%2C129%2C144%2C159%2C177%2C202%2C298&WEIGHTS=2%2C1%2C-2&SRS=EPSG%3A3857&BBOX=-8375052.315150191,4852834.051769271,-8365268.375529689,4862617.991389772'
        },
        params: 'philly_bars,philly_grocery_stores,philly_rail_stops',
        values: [3, -3, 0],
        show: true,
        opacity: 0.6,
        server: 'https://geotrellis.io/gt/weighted-overlay/wms',
        palette: chroma.scale(['#A65034', '#E3D3C2', '#D0DBE1', '#5891C1']).mode('lab').domain([0, 0.5, 0.6, 1]).colors(10)
    }, {
        info: {
            name: 'chatta',
            title: 'Chattanooga Agriculture & Forestry Value Model',
            zoom: 8.4,
            center: [34.76192255039478, -85.35140991210938],
            presets: [
                {
                    value: [-5, -4, -2, 1, -1, 2, 4, 3, 5],
                    text: 'Preset1'
                }, {
                    value: [-5, 4, -2, 1, 1, 2, 4, 3, 5],
                    text: 'Preset2'
                }, {
                    value: undefined,
                    text: 'Custom'
                }
            ],
            actions: ['info', 'weight', 'opacity'],
            optional: ['summary'],
            infotext: `This project is a joint effort of the University of Tennessee at Chattanooga and Azavea, with funding from the Lyndhurst Foundation.

            The Center for Academic and Innovative Technologies at the University of Tennessee at Chattanooga (CAIT) (UTC), was funded to develop a geospatial data library and planning applications to support long term regional planning efforts. Original project was named the "Regional Resource Inventory". This decision support system and current demo application are being developed in collaboration with a long term regional planning effort for the Greater Chattanooga area (http://thrive2055.com).`,
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
        values: [-5, -4, -2, 1, -1, 2, 4, 3, 5],
        show: true,
        opacity: 0.6,
        server: 'http://demo.geotrellis.com/chatta/gt/wo',
        mask: undefined,
        palette: 'yellow-to-red-heatmap',
        summary: undefined,
    }, {
        info: {
            name: 'pointcloud',
            title: 'Point Cloud',
            zoom: 12,
            center: [35.91157655376172, -106.55622482299805],
            presets: [{
                text: 'TIN, Hillshade, Snow On',
                value: ['TIN', 'hillshade', 'mar10idw']
            }, {
                text: 'IDW, Hillshade, Snow On',
                value: ['IDW', 'hillshade', 'mar10idw']
            }, {
                text: 'TIN, Color Ramp, Snow Off',
                value: ['TIN', 'png', 'jul10idw']
            }, {
                text: 'Custom',
                value: undefined
            }],
            actions: ['info', 'params', 'opacity'],
            infotext: 'pointcloud pointcloud',
            thumb: 'https://potsdam.geotrellis.io/tms/hillshade/isprs-potsdam-dsm/18/140577/86109'
        },
        params: 'ImperviousSurfaces_Barren Lands_Open Water,DevelopedLand,Wetlands,ForestedLands,Non-workingProtectedOrPublicLands,PublicallyOwnedWorkingLands,PrivatelyOwnedWorkingLandsWithEasements,FarmlandWithoutPrimeAgriculturalSoils,FarmlandOrForestedLandsWithPrimeAgriculturalSoils',
        values: ['TIN', 'Hillshade', 'Snow_On'],
        show: true,
        opacity: 0.6,
        server: 'http://demo.geotrellis.com/chatta/gt/wo',
    }, {
        info: {
            name: 'pointcloud',
            title: 'Change Detection',
            zoom: 12,
            center: [35.91157655376172, -106.55622482299805],
            actions: ['info', 'opacity'],
            infotext: 'compare two datasets',
            thumb: 'https://potsdam.geotrellis.io/tms/hillshade/isprs-potsdam-dsm/18/140577/86109'
        },
        params: 'ImperviousSurfaces_Barren Lands_Open Water,DevelopedLand,Wetlands,ForestedLands,Non-workingProtectedOrPublicLands,PublicallyOwnedWorkingLands,PrivatelyOwnedWorkingLandsWithEasements,FarmlandWithoutPrimeAgriculturalSoils,FarmlandOrForestedLandsWithPrimeAgriculturalSoils',
        values: ['TIN', 'Hillshade', 'Snow_On'],
        show: false,
        opacity: 0.6,
        server: 'http://ec2-54-87-204-186.compute-1.amazonaws.com/tms/diff-tms/png/mar10idw/jul10idw/',
    },
];


