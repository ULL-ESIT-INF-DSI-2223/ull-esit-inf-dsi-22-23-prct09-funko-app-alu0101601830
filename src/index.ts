import * as yargs from 'yargs';
import { FunkoOperations } from './funkoOperations.js';
import { Funko, Tipo, Genero } from './funko.js';
import { CommandModule } from 'yargs';

const myCommand: CommandModule = {
    command: 'add [username] [id] [nombre] [descripcion] [tipo] [genero] [franquicia] [numero]',
    describe: 'Añadir un Funko',
    builder: (yargs) => {
      return yargs
        .positional('username', { describe: 'Nombre de usuario', type: 'string', demandOption: true })
        .positional('id', { describe: 'ID del Funko', type: 'string', demandOption: true })
        .positional('nombre', { describe: 'Nombre del Funko', type: 'string', demandOption: true })
        .positional('descripcion', { describe: 'Descripción del Funko', type: 'string', demandOption: true })
        .positional('tipo', { describe: 'Tipo del Funko', choices: Object.values(Tipo), demandOption: true })
        .positional('genero', { describe: 'Género del Funko', choices: Object.values(Genero), demandOption: true })
        .positional('franquicia', { describe: 'Franquicia del Funko', type: 'string', demandOption: true })
        .positional('numero', { describe: 'Número del Funko', type: 'number', demandOption: true })
    },
    handler: (argv) => {
      // ...
    },
  };
  
/*const argv = yargs
    .scriptName('funko-cli')
    .usage('$0 <cmd> [args]')
    .command(
        'add [username] [id] [nombre] [descripcion] [tipo] [genero] [franquicia] [numero] [exclusivo] [caracteristicasEspeciales] [valorDeMercado]',
        'Añadir un Funko',
        (yargs) => {
            return yargs
                .positional('username', { describe: 'Nombre de usuario', type: 'string', demandOption: true })
                .positional('id', { describe: 'ID del Funko', type: 'string', demandOption: true })
                .positional('nombre', { describe: 'Nombre del Funko', type: 'string', demandOption: true })
                .positional('descripcion', { describe: 'Descripción del Funko', type: 'string', demandOption: true })
                .positional('tipo', { describe: 'Tipo del Funko', choices: Object.values(Tipo), demandOption: true })
                .positional('genero', { describe: 'Género del Funko', choices: Object.values(Genero), demandOption: true })
                .positional('franquicia', { describe: 'Franquicia del Funko', type: 'string', demandOption: true })
                .positional('numero', { describe: 'Número del Funko', type: 'number', demandOption: true })
        })*/
