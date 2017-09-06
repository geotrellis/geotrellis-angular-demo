export interface LayerCard {
    info: {
        name: string;
        title: string;
        presets?: {
            weights: number[],
            text: string,
        }[];
        optional?: string[];
        prtext?: string[];
        range?: number;
        palettes?: string[];
        thumb: string;
        zoom: number;
        center: number[];
        api: {
            wms?: string;
            point?: string;
            poly?: string;
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
