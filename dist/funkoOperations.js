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
    updateFunko(updatedFunko, username) {
        const index = this.funkos.findIndex(funko => funko.id === updatedFunko.id);
        if (index !== -1) {
            this.funkos[index] = updatedFunko;
            this.saveFunko(updatedFunko);
            console.log(chalk.green(`Funko updated at ${username} collection!`));
        }
        else {
            console.log(chalk.red(`Funko not found at ${username} collection!`));
        }
    }
    deleteFunko(id, username) {
        const index = this.funkos.findIndex(funko => funko.id === id);
        if (index !== -1) {
            this.funkos.splice(index, 1);
            this.deleteFunkoFile(id);
            console.log(chalk.green(`Funko removed from ${username} collection!`));
        }
        else {
            console.log(chalk.red(`Funko not found at ${username} collection!`));
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
        console.log(chalk.blue(`----------------------------------`));
        console.log(chalk.blue(`${username} Funko Pop Collection`));
        for (const funko of this.funkos) {
            this.printFunkoInfo(funko);
        }
    }
    getFunkoById(id, username) {
        const funko = this.funkos.find(f => f.id === id);
        if (!funko) {
            console.log(chalk.red(`Funko not found at ${username} collection!`));
            return;
        }
        this.printFunkoInfo(funko);
    }
    printFunkoInfo(funko) {
        console.log(chalk.blue(`----------------------------------`));
        console.log(chalk.green(`ID: ${funko.id}`));
        console.log(chalk.green(`Name: ${funko.nombre}`));
        console.log(chalk.green(`Description: ${funko.descripcion}`));
        console.log(chalk.green(`Type: ${funko.tipo}`));
        console.log(chalk.green(`Genre: ${funko.genero}`));
        console.log(chalk.green(`Franchise: ${funko.franquicia}`));
        console.log(chalk.green(`Number: ${funko.numero}`));
        console.log(chalk.green(`Exclusive: ${funko.exclusivo}`));
        console.log(chalk.green(`Special Features: ${funko.caracteristicasEspeciales}`));
        console.log(chalk.green(`Merch value: `) + this.getMarketValueColor(funko.valorDeMercado)(`${funko.valorDeMercado}`));
    }
    getMarketValueColor(value) {
        if (value < 20) {
            return chalk.red;
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
