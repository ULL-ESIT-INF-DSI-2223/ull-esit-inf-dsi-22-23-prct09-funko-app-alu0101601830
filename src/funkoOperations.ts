import { Funko } from './funko.js';
import * as fs from 'fs';
import chalk from 'chalk';


export class FunkoOperations {
    private funkos: Funko[] = [];
    private userDirectory: string;

    constructor(username: string) {
        this.userDirectory = `./users/${username}`;
        this.loadFunkos();
    }

    // Añadir, modificar y eliminar Funkos
    public addFunko(funko: Funko, username: string): void {
        const existingFunko = this.findFunko(funko.id);
        if (existingFunko) {
            console.log(chalk.red(`Funko already exists at ${username} collection!`));
        } else {
            this.funkos.push(funko);
            this.saveFunko(funko);
            console.log(chalk.green(`New Funko added to ${username} collection!`));
        }
    }

    public updateFunko(updatedFunko: Funko): void {
        const index = this.funkos.findIndex(funko => funko.id === updatedFunko.id);
        if (index !== -1) {
            this.funkos[index] = updatedFunko;
            this.saveFunko(updatedFunko);
            console.log(chalk.green('Funko actualizado correctamente.'));
        } else {
            console.log(chalk.red('Error: No se encontró un Funko con el ID especificado.'));
        }
    }

    public deleteFunko(id: string): void {
        const index = this.funkos.findIndex(funko => funko.id === id);
        if (index !== -1) {
            this.funkos.splice(index, 1);
            this.deleteFunkoFile(id);
            console.log(chalk.green('Funko eliminado correctamente.'));
        } else {
            console.log(chalk.red('Error: No se encontró un Funko con el ID especificado.'));
        }
    }

    private findFunko(funkoId: string): Funko | undefined {
        return this.funkos.find((funko) => funko.id === funkoId);
    }


    public listFunkos(username: string): void {
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

    public getFunkoById(id: string): void {
        const funko = this.funkos.find(f => f.id === id);

        if (!funko) {
            console.log(chalk.red(`No se encuentra el Funko con el ID "${id}".`));
            return;
        }

        this.printFunkoInfo(funko);
    }

    private printFunkoInfo(funko: Funko): void {
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
    private getMarketValueColor(value: number): (text: string) => string{
        if (value < 50) {
            return chalk.red;
        } else if (value >= 50 && value < 100) {
            return chalk.yellow;
        } else if (value >= 100 && value < 200) {
            return chalk.blue;
        } else {
            return chalk.green;
        }
    }
    

    // Cargar y guardar Funkos en archivos JSON
    private loadFunkos(): void {
        if (!fs.existsSync(this.userDirectory)) {
            fs.mkdirSync(this.userDirectory);
        }

        const files = fs.readdirSync(this.userDirectory);

        files.forEach((file) => {
            const content = fs.readFileSync(`${this.userDirectory}/${file}`, 'utf-8');
            const funko: Funko = JSON.parse(content);
            this.funkos.push(funko);
        });
    }

    private saveFunko(funko: Funko): void {
        const filePath = `${this.userDirectory}/${funko.id}.json`;
        const content = JSON.stringify(funko);
        fs.writeFileSync(filePath, content);
    }

    private deleteFunkoFile(funkoId: string): void {
        const filePath = `${this.userDirectory}/${funkoId}.json`;
        fs.unlinkSync(filePath);
    }


    /*
    // Listar Funkos y mostrar información de un Funko específico
    private colorValorDeMercado(valorDeMercado: number): string {
        if (valorDeMercado < 25) {
            return chalk.red(valorDeMercado.toString());
        } else if (valorDeMercado < 50) {
            return chalk.yellow(valorDeMercado.toString());
        } else if (valorDeMercado < 100) {
            return chalk.blue(valorDeMercado.toString());
        } else {
            return chalk.green(valorDeMercado.toString());
        }
    }

    public listFunkos(): void {
        this.funkos.forEach(funko => {
            console.log(`ID: ${funko.id}`);
            console.log(`Nombre: ${funko.nombre}`);
            console.log(`Descripción: ${funko.descripcion}`);
            console.log(`Tipo: ${funko.tipo}`);
            console.log(`Género: ${funko.genero}`);
            console.log(``);
	    })
    }*/
}