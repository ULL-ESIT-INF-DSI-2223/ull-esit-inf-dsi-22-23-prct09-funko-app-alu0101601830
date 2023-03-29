"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunkoOperations = void 0;
const fs = require("fs");
const chalk_1 = require("chalk");
class FunkoOperations {
    funkos = [];
    userDirectory;
    constructor(username) {
        this.userDirectory = `./${username}`;
        this.loadFunkos();
    }
    // Añadir, modificar y eliminar Funkos
    addFunko(funko) {
        const existingFunko = this.findFunko(funko.id);
        if (existingFunko) {
            console.log(chalk_1.default.red('Error: Ya existe un Funko con el mismo ID.'));
        }
        else {
            this.funkos.push(funko);
            this.saveFunko(funko);
            console.log(chalk_1.default.green('Funko añadido correctamente.'));
        }
    }
    updateFunko(updatedFunko) {
        const index = this.funkos.findIndex(funko => funko.id === updatedFunko.id);
        if (index !== -1) {
            this.funkos[index] = updatedFunko;
            this.saveFunko(updatedFunko);
            console.log(chalk_1.default.green('Funko actualizado correctamente.'));
        }
        else {
            console.log(chalk_1.default.red('Error: No se encontró un Funko con el ID especificado.'));
        }
    }
    deleteFunko(id) {
        const index = this.funkos.findIndex(funko => funko.id === id);
        if (index !== -1) {
            this.funkos.splice(index, 1);
            this.deleteFunkoFile(id);
            console.log(chalk_1.default.green('Funko eliminado correctamente.'));
        }
        else {
            console.log(chalk_1.default.red('Error: No se encontró un Funko con el ID especificado.'));
        }
    }
    findFunko(funkoId) {
        return this.funkos.find((funko) => funko.id === funkoId);
    }
    //OTRA FORMA DE HACERLO PARA LISTAR QUE ES MEJOR:
    listFunkos() {
        if (this.funkos.length === 0) {
            console.log(chalk_1.default.red('No hay Funkos en la lista.'));
            return;
        }
        for (const funko of this.funkos) {
            this.printFunkoInfo(funko);
        }
    }
    getFunkoById(id) {
        const funko = this.funkos.find(f => f.id === id);
        if (!funko) {
            console.log(chalk_1.default.red(`No se encuentra el Funko con el ID "${id}".`));
            return;
        }
        this.printFunkoInfo(funko);
    }
    printFunkoInfo(funko) {
        console.log(chalk_1.default.green(`ID: ${funko.id}`));
        console.log(chalk_1.default.green(`Nombre: ${funko.nombre}`));
        console.log(chalk_1.default.green(`Descripción: ${funko.descripcion}`));
        console.log(chalk_1.default.green(`Tipo: ${funko.tipo}`));
        console.log(chalk_1.default.green(`Género: ${funko.genero}`));
        console.log(chalk_1.default.green(`Franquicia: ${funko.franquicia}`));
        console.log(chalk_1.default.green(`Número: ${funko.numero}`));
        console.log(chalk_1.default.green(`Exclusivo: ${funko.exclusivo}`));
        console.log(chalk_1.default.green(`Características especiales: ${funko.caracteristicasEspeciales}`));
        console.log(chalk_1.default.green(`Valor de mercado: `) + this.getMarketValueColor(funko.valorDeMercado)(`${funko.valorDeMercado}`));
    }
    getMarketValueColor(value) {
        if (value < 50) {
            return chalk_1.default.red;
        }
        else if (value >= 50 && value < 100) {
            return chalk_1.default.yellow;
        }
        else if (value >= 100 && value < 200) {
            return chalk_1.default.blue;
        }
        else {
            return chalk_1.default.green;
        }
    }
    // Cargar y guardar Funkos en archivos JSON
    loadFunkos() {
        if (!fs.existsSync(this.userDirectory)) {
            fs.mkdirSync(this.userDirectory);
        }
        const files = fs.readdirSync(this.userDirectory);
        files.forEach((file) => {
            const content = fs.readFileSync(`${this.userDirectory}/${file}`, 'utf-8');
            const funko = JSON.parse(content);
            this.funkos.push(funko);
        });
    }
    saveFunko(funko) {
        const filePath = `${this.userDirectory}/${funko.id}.json`;
        const content = JSON.stringify(funko);
        fs.writeFileSync(filePath, content);
    }
    deleteFunkoFile(funkoId) {
        const filePath = `${this.userDirectory}/${funkoId}.json`;
        fs.unlinkSync(filePath);
    }
}
exports.FunkoOperations = FunkoOperations;
