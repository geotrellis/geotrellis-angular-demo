import { LayerCard } from './layer-card.d';
import * as chroma from 'chroma-js';

export const LAYERCARDS: any[] = [
    {
        // location-modeling
        model: 'lm',
        title: 'Philly Location Modeling',
        thumb: 'https://geotrellis.io/gt/weighted-overlay/wms?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&LAYERS=philly_bars%2Cphilly_grocery_stores%2Cphilly_rail_stops&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&HEIGHT=256&WIDTH=256&BREAKS=-41%2C-12%2C0%2C8%2C21%2C32%2C43%2C52%2C62%2C71%2C80%2C91%2C102%2C115%2C129%2C144%2C159%2C177%2C202%2C298&WEIGHTS=2%2C1%2C-2&SRS=EPSG%3A3857&BBOX=-8375052.315150191,4852834.051769271,-8365268.375529689,4862617.991389772',
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
            expanded: undefined
        },
        params: {
            layers: 'philly_bars,philly_grocery_stores,philly_rail_stops'
        },
        values: [3, -3, 0],
        show: true,
        opacity: 0.6,
        server: 'https://geotrellis.io/gt/weighted-overlay/wms',
        palette: chroma.scale(['#A65034', '#E3D3C2', '#D0DBE1', '#5891C1']).mode('lab').domain([0, 0.5, 0.6, 1]).colors(10)
        // end of location modeling
    }, {
        // chattanooga
        model: 'chatta',
        title: 'Chattanooga Agriculture & Forestry Value Model',
        thumb: 'https://geotrellis.io/img/demo_02.jpg',
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
            infotext: `This project is a joint effort of the University of Tennessee at Chattanooga and Azavea, with funding from the Lyndhurst Foundation.`,
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
        params: {
            layers: 'ImperviousSurfaces_Barren Lands_Open Water,DevelopedLand,Wetlands,ForestedLands,Non-workingProtectedOrPublicLands,PublicallyOwnedWorkingLands,PrivatelyOwnedWorkingLandsWithEasements,FarmlandWithoutPrimeAgriculturalSoils,FarmlandOrForestedLandsWithPrimeAgriculturalSoils'
        },
        values: [-5, -4, -2, 1, -1, 2, 4, 3, 5],
        show: true,
        opacity: 0.6,
        server: 'http://demo.geotrellis.com/chatta/gt/wo',
        mask: undefined,
        palette: 'yellow-to-red-heatmap',
        summary: undefined,
        expanded: undefined
        // end of chattanooga
    }, {
        // poing cloud
        model: 'point-cloud',
        title: 'Point Cloud',
        thumb: 'assets/img/pc-thumb.png',
        info: {
            name: 'creation-render',
            title: 'DEM Creation Method & Render Options',
            zoom: 12,
            center: [35.866144, -106.575149],
            presets: [{
                text: 'TIN, Hillshade, Snow On',
                value: ['tin', 'hillshade', 'mar10']
            }, {
                text: 'IDW, Hillshade, Snow On',
                value: ['idw', 'hillshade', 'mar10']
            }, {
                text: 'TIN, Color Ramp, Snow Off',
                value: ['tin', 'png', 'jul10']
            }, {
                text: 'Custom',
                value: undefined
            }],
            actions: ['info', 'weight', 'opacity'],
            optional: ['summary'],
            infotext: `The application demonstrates working with DEMs derived from LiDAR. LiDAR was flown over this area during times when snowpack was present (in winter) and when snowpack was not present (summer). We converted the point cloud data into DEMs using both Inverse Distance Weighted (IDW) and Triangulated Irregular Network (TIN) methods.

            Use this demo to explore differences in the DEM methods, on the fly visualizations, and analytics of the difference layer that can indicate locations of snowpack.`,
            prtext: [
                'DEM Creation Method',
                'Render Options',
                'Dataset',
            ],
        },
        params: {
            colorRamp: 'blue-to-red'
        },
        values: ['tin', 'hillshade', 'mar10'],
        show: true,
        opacity: 0.6,
        server: `http://ec2-54-87-204-186.compute-1.amazonaws.com/tms/{values[1]}/{values[2]}{values[0]}/{z}/{x}/{y}?colorRamp=blue-to-red`,
        mask: undefined,
        summary: undefined,
        expanded: undefined
    }, {
        model: 'point-cloud',
        title: 'Point Cloud',
        thumb: 'assets/img/pc-thumb.png',
        info: {
            name: 'change-detection',
            title: 'Change Detection',
            zoom: 12,
            center: [35.866144, -106.595149],
            actions: ['info', 'opacity'],
            optional: ['summary'],
            infotext: 'Comparison between snow-on and snow-off datasets.',
        },
        show: false,
        opacity: 0.6,
        server: 'http://ec2-54-87-204-186.compute-1.amazonaws.com/tms/diff-tms/png/mar10idw/jul10idw/{z}/{x}/{y}',
        mask: undefined,
        summary: undefined,
        expanded: undefined
        // end of point cloud
    }, {
        // potsdam
        model: 'potsdam',
        title: 'Potsdam',
        thumb: 'https://potsdam.geotrellis.io/tms/hillshade/isprs-potsdam-dsm/18/140577/86109',
        info: {
            name: 'potsdam-imagery',
            title: 'Imagery',
            zoom: 14,
            center: [52.403269, 13.052745],
            actions: ['info', 'opacity'],
            infotext: `Explore the results of the Raster Vision work on the ISPRS Postdam challenge with this application.

            We generated multiple layers of results using Fully Convolutional Network (FCN) and U-Net architectures. With this application you can view the results of our models compared to ground truth, as well as discover areas where the architectures do better or worse than one another.`,
            presets: [{
                text: 'RGB',
                value: ['rgb', 'rgb']
            }, {
                text: 'IRRG',
                value: ['rgb', 'irrg']
            }, {
                text: 'NDVI',
                value: ['ndvi', 'rir']
            }, {
                text: 'Grayscale',
                value: ['grayscale', 'rgb']
            }]
        },
        values: ['rgb', 'rgb'],
        show: true,
        opacity: 0.9,
        server: 'https://potsdam.geotrellis.io/tms/imagery/{values[0]}/isprs-potsdam-imagery-{values[1]}/{z}/{x}/{y}',
        expanded: undefined
    }, {
        model: 'potsdam',
        title: 'Potsdam',
        thumb: 'https://potsdam.geotrellis.io/tms/hillshade/isprs-potsdam-dsm/18/140577/86109',
        info: {
            name: 'potsdam-dsm',
            title: 'Digital Surface Model (ISPRS generated)',
            zoom: 15,
            center: [52.403269, 13.052745],
            actions: ['info', 'opacity'],
            infotext: 'This layer represents the digital surface model that was provided by ISPRS.',
            presets: [{
                text: 'Hillshade',
                value: ['hillshade']
            }, {
                text: 'Ramp',
                value: ['png']
            }]
        },
        values: ['hillshade'],
        show: false,
        opacity: 0.6,
        server: 'https://potsdam.geotrellis.io/tms/{values[0]}/isprs-potsdam-dsm/{z}/{x}/{y}',
        expanded: undefined
    }, {
        model: 'potsdam',
        title: 'Potsdam',
        thumb: 'https://potsdam.geotrellis.io/tms/hillshade/isprs-potsdam-dsm/18/140577/86109',
        info: {
            name: 'potsdam-dsm-gtn',
            title: 'Digital Surface Model (GeoTrellis generated)',
            zoom: 15,
            center: [52.403269, 13.052745],
            actions: ['info', 'opacity'],
            infotext: 'Digital surface model generated by GeoTrellis ingest of LiDAR data.',
            presets: [{
                text: 'Hillshade',
                value: ['hillshade']
            }, {
                text: 'Ramp',
                value: ['png']
            }]
        },
        values: ['hillshade'],
        show: false,
        opacity: 0.6,
        server: 'https://potsdam.geotrellis.io/tms/{values[0]}/isprs-potsdam-dsm-gtn/{z}/{x}/{y}',
        expanded: undefined
    }, {
        model: 'potsdam',
        title: 'Potsdam',
        thumb: 'https://potsdam.geotrellis.io/tms/hillshade/isprs-potsdam-dsm/18/140577/86109',
        info: {
            name: 'potsdam-labels',
            title: 'Ground Truth Labels',
            zoom: 15,
            center: [52.403269, 13.052745],
            actions: ['info', 'opacity'],
            infotext: 'Ground truth labels provided by ISRPS for training.'
        },
        show: false,
        opacity: 0.6,
        server: 'https://potsdam.geotrellis.io/tms/labels/isprs-potsdam-labels/{z}/{x}/{y}',
        expanded: undefined
    }, {
        model: 'potsdam',
        title: 'Potsdam',
        thumb: 'https://potsdam.geotrellis.io/tms/hillshade/isprs-potsdam-dsm/18/140577/86109',
        info: {
            name: 'potsdam-unet-predictions',
            title: 'U-NET Predictions',
            zoom: 15,
            center: [52.403269, 13.052745],
            actions: ['info', 'opacity'],
            infotext: 'Predicted labels by an ensemble of U-Net models over the cross-validation training set.',
            presets: [{
                text: 'All',
                value: ['', '']
            }, {
                text: 'Wrong',
                value: ['-incorrect', '/isprs-potsdam-labels']
            }]
        },
        values: ['', ''],
        show: false,
        opacity: 0.6,
        server: 'https://potsdam.geotrellis.io/tms/models/prediction{values[0]}/isprs-potsdam-unet-predictions{values[1]}/{z}/{x}/{y}',
        expanded: undefined
    }, {
        model: 'potsdam',
        title: 'Potsdam',
        thumb: 'https://potsdam.geotrellis.io/tms/hillshade/isprs-potsdam-dsm/18/140577/86109',
        info: {
            name: 'potsdam-unet-probabilities',
            title: 'U-NET Probabilities',
            zoom: 15,
            center: [52.403269, 13.052745],
            actions: ['info', 'opacity'],
            infotext: 'Probability output for each label class by the U-Net ensemble.',
            presets: [{
                text: 'Impervious Surfaces',
                value: ['0']
            }, {
                text: 'Building',
                value: ['1']
            }, {
                text: 'Low Vegetation',
                value: ['2']
            }, {
                text: 'Trees',
                value: ['3']
            }, {
                text: 'Cars',
                value: ['4']
            }, {
                text: 'Clutter',
                value: ['5']
            }]
        },
        values: ['0'],
        show: false,
        opacity: 0.6,
        server: 'https://potsdam.geotrellis.io/tms/models/probability/isprs-potsdam-unet-probabilities/{values[0]}/{z}/{x}/{y}',
        expanded: undefined
    }, {
        model: 'potsdam',
        title: 'Potsdam',
        thumb: 'https://potsdam.geotrellis.io/tms/hillshade/isprs-potsdam-dsm/18/140577/86109',
        info: {
            name: 'potsdam-fcn-predictions',
            title: 'FCN Predictions',
            zoom: 15,
            center: [52.403269, 13.052745],
            actions: ['info', 'opacity'],
            infotext: 'Predicted labels by the FCN ensemble.',
            presets: [{
                text: 'All',
                value: ['', '']
            }, {
                text: 'Wrong',
                value: ['-incorrect', '/isprs-potsdam-labels']
            }]
        },
        values: ['', ''],
        show: false,
        opacity: 0.6,
        server: 'https://potsdam.geotrellis.io/tms/models/prediction{values[0]}/isprs-potsdam-fcn-predictions{values[1]}/{z}/{x}/{y}',
        expanded: undefined
    }, {
        model: 'potsdam',
        title: 'Potsdam',
        thumb: 'https://potsdam.geotrellis.io/tms/hillshade/isprs-potsdam-dsm/18/140577/86109',
        info: {
            name: 'potsdam-fcn-probabilities',
            title: 'FCN Probabilities',
            zoom: 15,
            center: [52.403269, 13.052745],
            actions: ['info', 'opacity'],
            infotext: 'Probability output for each label class by the FCN ensemble.',
            presets: [{
                text: 'Impervious Surfaces',
                value: ['0']
            }, {
                text: 'Building',
                value: ['1']
            }, {
                text: 'Low Vegetation',
                value: ['2']
            }, {
                text: 'Trees',
                value: ['3']
            }, {
                text: 'Cars',
                value: ['4']
            }, {
                text: 'Clutter',
                value: ['5']
            }]
        },
        values: ['0'],
        show: false,
        opacity: 0.6,
        server: 'https://potsdam.geotrellis.io/tms/models/probability/isprs-potsdam-fcn-probabilities/{values[0]}/{z}/{x}/{y}',
        expanded: undefined
    }, {
        model: 'potsdam',
        title: 'Potsdam',
        thumb: 'https://potsdam.geotrellis.io/tms/hillshade/isprs-potsdam-dsm/18/140577/86109',
        info: {
            name: 'potsdam-fcndsm-predictions',
            title: 'FCN+DSM Predictions',
            zoom: 15,
            center: [52.403269, 13.052745],
            actions: ['info', 'opacity'],
            infotext: 'Predicted labels by an ensemble of FCN+DSM models over the cross-validation training set.',
            presets: [{
                text: 'All',
                value: ['', '']
            }, {
                text: 'Wrong',
                value: ['-incorrect', '/isprs-potsdam-labels']
            }]
        },
        values: ['', ''],
        show: false,
        opacity: 0.6,
        server: 'https://potsdam.geotrellis.io/tms/models/prediction{values[0]}/isprs-potsdam-fcndsm-predictions{values[1]}/{z}/{x}/{y}',
        expanded: undefined
    }, {
        model: 'potsdam',
        title: 'Potsdam',
        thumb: 'https://potsdam.geotrellis.io/tms/hillshade/isprs-potsdam-dsm/18/140577/86109',
        info: {
            name: 'potsdam-fcndsm-probabilities',
            title: 'FCN+DSM Probabilities',
            zoom: 15,
            center: [52.403269, 13.052745],
            actions: ['info', 'opacity'],
            infotext: 'Probability output for each label class by the FCN+DSM ensemble.',
            presets: [{
                text: 'Impervious Surfaces',
                value: ['0']
            }, {
                text: 'Building',
                value: ['1']
            }, {
                text: 'Low Vegetation',
                value: ['2']
            }, {
                text: 'Trees',
                value: ['3']
            }, {
                text: 'Cars',
                value: ['4']
            }, {
                text: 'Clutter',
                value: ['5']
            }]
        },
        values: ['0'],
        show: false,
        opacity: 0.6,
        server: 'https://potsdam.geotrellis.io/tms/models/probability/isprs-potsdam-fcndsm-probabilities/{values[0]}/{z}/{x}/{y}',
        expanded: undefined
    }, {
        model: 'potsdam',
        title: 'Potsdam',
        thumb: 'https://potsdam.geotrellis.io/tms/hillshade/isprs-potsdam-dsm/18/140577/86109',
        info: {
            name: 'potsdam-fcn-unet',
            title: 'FCN vs U-NET',
            zoom: 15,
            center: [52.403269, 13.052745],
            actions: ['info', 'opacity'],
            infotext: 'Comparison of FCN vs U-Net predictions. Shows colors for what FCN got right and U-Net got wrong, what U-Net got right and FCN got wrong, and what pixels both enbembles got wrong.'
        },
        show: false,
        opacity: 0.6,
        server: 'https://potsdam.geotrellis.io/tms/models/prediction-ab/isprs-potsdam-fcn-predictions/isprs-potsdam-unet-predictions/isprs-potsdam-labels/{z}/{x}/{y}',
        expanded: undefined
    }, {
        model: 'potsdam',
        title: 'Potsdam',
        thumb: 'https://potsdam.geotrellis.io/tms/hillshade/isprs-potsdam-dsm/18/140577/86109',
        info: {
            name: 'potsdam-fcn-fcndsm',
            title: 'FCN vs FCN w/ DSM',
            zoom: 15,
            center: [52.403269, 13.052745],
            actions: ['info', 'opacity'],
            infotext: 'Comparison of FCN vs FCN+DSM predictions. Shows colors for what FCN got right and U-Net got wrong, what U-Net got right and FCN got wrong, and what pixels both enbembles got wrong.'
        },
        show: false,
        opacity: 0.6,
        server: 'https://potsdam.geotrellis.io/tms/models/prediction-ab/isprs-potsdam-fcn-predictions/isprs-potsdam-fcndsm-predictions/isprs-potsdam-labels/{z}/{x}/{y}',
        expanded: undefined
        // end of potsdam
    }
];


