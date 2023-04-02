import { Funko } from './funko.js';
export declare class FunkoOperations {
    private funkos;
    private userDirectory;
    constructor(username: string);
    addFunko(funko: Funko, username: string): void;
    updateFunko(updatedFunko: Funko): void;
    deleteFunko(id: string): void;
    private findFunko;
    listFunkos(username: string): void;
    getFunkoById(id: string): void;
    private printFunkoInfo;
    private getMarketValueColor;
    private loadFunkos;
    private saveFunko;
    private deleteFunkoFile;
}
