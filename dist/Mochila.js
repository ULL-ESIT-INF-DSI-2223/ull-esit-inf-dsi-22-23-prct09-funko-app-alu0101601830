"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MochilaJSON = exports.MochilaCSV = void 0;
const fs = require("fs");
class Mochila {
    procesar(filePath) {
        if (!fs.existsSync(filePath)) {
            throw new Error('El archivo no existe en la ruta especificada.');
        }
        const data = fs.readFileSync(filePath, 'utf8');
        const extension = filePath.split('.').pop()?.toLowerCase() || '';
        let elementos;
        if (extension === 'csv') {
            const { elementos: elementosExtraidos } = this.extraerDatosCSV(data);
            elementos = elementosExtraidos;
        }
        else if (extension === 'json') {
            const { elementos: elementosExtraidos } = this.extraerDatosJSON(data);
            elementos = elementosExtraidos;
        }
        else {
            throw new Error('Formato de archivo no soportado.');
        }
        const beneficios = elementos.map((elemento) => elemento.beneficio);
        const pesos = elementos.map((elemento) => elemento.peso);
        return { beneficios, pesos };
    }
}
class MochilaCSV extends Mochila {
    extraerDatosJSON(data) {
        throw new Error('Method not implemented.');
    }
    extraerDatosCSV(data) {
        const lines = data.trim().split('\n');
        const capacidad = parseInt(lines[0]);
        const numElemento = parseInt(lines[1]);
        const elementos = lines.slice(2).map((line, index) => {
            const [beneficio, peso] = line.split(' ').map(Number);
            return { numElemento: index + 1, beneficio, peso };
        });
        return { capacidad, elementos };
    }
}
exports.MochilaCSV = MochilaCSV;
class MochilaJSON extends Mochila {
    extraerDatosCSV(data) {
        throw new Error('Method not implemented.');
    }
    extraerDatosJSON(data) {
        const jsonData = JSON.parse(data);
        const capacidad = jsonData.capacidad;
        const elementos = jsonData.elementos.map((elemento) => ({
            numElemento: elemento.numElemento,
            peso: elemento.peso,
            beneficio: elemento.beneficio,
        }));
        return { capacidad, elementos };
    }
}
exports.MochilaJSON = MochilaJSON;
const extractorCSV = new MochilaCSV();
const resultadoCSV = extractorCSV.procesar('src/data/archivo.csv');
console.log(resultadoCSV);
const extractorJSON = new MochilaJSON();
const resultadoJSON = extractorJSON.procesar('src/data/archivo.json');
console.log(resultadoJSON);
