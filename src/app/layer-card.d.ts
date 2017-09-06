export interface LayerCard {
    info: {
        name: string;
        title: string;
        presets?: {
            text: string;
            value: string[] | number[];
        }[];
        actions: string[];
        optional?: string[];
        infotext: string;
        prtext?: string[];
        range?: number;
        palettes?: string[];
        thumb: string;
        zoom: number;
        center: number[];
    };
    values: number[] | string[];
    show: boolean;
    opacity: number;
    mask?: string;
    params: string;
    server: string;
    palette?: string[] | string;
    summary?: {
        layers: number[],
        total: number
    };
}