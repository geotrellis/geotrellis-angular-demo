export interface LayerCard {
    info: {
        name: string;
        title: string;
        presets: [{
            weights: number[],
            text: string,
        }];
        optional?: string[];
        prtext: string[];
        range: number;
        palettes?: string[];
    };
    weights: number[];
    show: boolean;
    opacity: number;
    mask?: string;
    params: string;
    wmsServer: string;
    sumServer?: string;
    palette: string[] | string;
    summary?: {
        layers: number[],
        total: number
    };
}

