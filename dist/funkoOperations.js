import * as fs from 'fs';
import chalk from 'chalk';
export class FunkoOperations {
    funkos = [];
    userDirectory;
    constructor(username) {
        this.userDirectory = `./users/${username}`;
        this.loadFunkos();
    }
    // Añadir, modificar y eliminar Funkos
    addFunko(funko, username) {
        const existingFunko = this.findFunko(funko.id);
        if (existingFunko) {
            console.log(chalk.red(`Funko already exists at ${username} collection!`));
        }
        else {
            this.funkos.push(funko);
            this.saveFunko(funko);
            console.log(chalk.green(`New Funko added to ${username} collection!`));
        }
    }
    updateFunko(updatedFunko) {
        const index = this.funkos.findIndex(funko => funko.id === updatedFunko.id);
        if (index !== -1) {
            this.funkos[index] = updatedFunko;
            this.saveFunko(updatedFunko);
            console.log(chalk.green('Funko actualizado correctamente.'));
        }
        else {
            console.log(chalk.red('Error: No se encontró un Funko con el ID especificado.'));
        }
    }
    deleteFunko(id) {
        const index = this.funkos.findIndex(funko => funko.id === id);
        if (index !== -1) {
            this.funkos.splice(index, 1);
            this.deleteFunkoFile(id);
            console.log(chalk.green('Funko eliminado correctamente.'));
        }
        else {
            console.log(chalk.red('Error: No se encontró un Funko con el ID especificado.'));
        }
    }
    findFunko(funkoId) {
        return this.funkos.find((funko) => funko.id === funkoId);
    }
    listFunkos(username) {
        if (this.funkos.length === 0) {
            console.log(chalk.red(`No Funkos in the list of ${username}`));
            return;
        }
        for (const funko of this.funkos) {
            console.log(chalk.blue(`----------------------------------`));
            console.log(chalk.blue(`${username} Funko Pop Collection`));
            this.printFunkoInfo(funko);
        }
    }
    getFunkoById(id) {
        const funko = this.funkos.find(f => f.id === id);
        if (!funko) {
            console.log(chalk.red(`No se encuentra el Funko con el ID "${id}".`));
            return;
        }
        this.printFunkoInfo(funko);
    }
    printFunkoInfo(funko) {
        console.log(chalk.blue(`----------------------------------`));
        console.log(chalk.green(`ID: ${funko.id}`));
        console.log(chalk.green(`Nombre: ${funko.nombre}`));
        console.log(chalk.green(`Descripción: ${funko.descripcion}`));
        console.log(chalk.green(`Tipo: ${funko.tipo}`));
        console.log(chalk.green(`Género: ${funko.genero}`));
        console.log(chalk.green(`Franquicia: ${funko.franquicia}`));
        console.log(chalk.green(`Número: ${funko.numero}`));
        console.log(chalk.green(`Exclusivo: ${funko.exclusivo}`));
        console.log(chalk.green(`Características especiales: ${funko.caracteristicasEspeciales}`));
        console.log(chalk.green(`Valor de mercado: `) + this.getMarketValueColor(funko.valorDeMercado)(`${funko.valorDeMercado}`));
    }
    // REVISAR ESTA FUNCION
    getMarketValueColor(value) {
        if (value < 50) {
            return chalk.red;
        }
        else if (value >= 50 && value < 100) {
            return chalk.yellow;
        }
        else if (value >= 100 && value < 200) {
            return chalk.blue;
        }
        else {
            return chalk.green;
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
