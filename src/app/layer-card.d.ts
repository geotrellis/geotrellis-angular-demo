export interface LayerCard 

{
    model: string;
    title: string;
    thumb: string;
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
        zoom: number;
        center: number[];
    };
    values?: number[] | string[];
    show: boolean;
    opacity: number;
    mask?: any;
    params?: any;
    server: string;
    palette?: string[] | string;
    summary?: {
        layers: number[];
        total: number
    };
    expanded: string;
}