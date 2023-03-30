/**
 * Elementos de la mochila
 * @type
 */
type ElementoMochila = {
    numElemento: number;
    peso: number;
    beneficio: number;
};
declare abstract class Mochila {
    protected abstract extraerDatosCSV(data: string): {
        capacidad: number;
        elementos: ElementoMochila[];
    };
    protected abstract extraerDatosJSON(data: string): {
        capacidad: number;
        elementos: ElementoMochila[];
    };
    procesar(filePath: string): {
        beneficios: number[];
        pesos: number[];
    };
}
export declare class MochilaCSV extends Mochila {
    protected extraerDatosJSON(data: string): {
        capacidad: number;
        elementos: ElementoMochila[];
    };
    protected extraerDatosCSV(data: string): {
        capacidad: number;
        elementos: ElementoMochila[];
    };
}
export declare class MochilaJSON extends Mochila {
    protected extraerDatosCSV(data: string): {
        capacidad: number;
        elementos: ElementoMochila[];
    };
    protected extraerDatosJSON(data: string): {
        capacidad: number;
        elementos: ElementoMochila[];
    };
}
export {};
