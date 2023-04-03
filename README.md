# Práctica 9: Funko Pop
##### Diego Wiederkehr Bruno, alu0101601830  
### El GitHub Pages se encuentra en el siguiente [link](https://ull-esit-inf-dsi-2223.github.io/ull-esit-inf-dsi-22-23-prct09-funko-app-alu0101601830/).
## Introducción
En esta práctica debemos realizar un sistema de colección de Funko Pop para usuarios. Cada usuario tendrá una colección de Funkos con sus características donde podrán agregar más, eliminar, listar o mostrar información detallada sobre cada Funko. La aplicación será controlada por comandos y guardará la información sobre cada Funko en ficheros JSON. 

## Distribución de archivos
En mi caso, he realizado tres archivos distintos, **funko.ts**, **funkoOperations.ts** y **index.ts**. En resumen, dentro de **funko.ts** tenemos la interfaz de como es un Funko y dos enumerados para el tipo y el género. En **funkoOperations.ts** tenemos todas las operaciones a realizar con los Funkos y finalmente en **index.ts** implementamos la interacción del usuario con la aplicación a través de los comandos.

## Funko.ts
Primero he creado dos enums para Tipo y Genero:
```ts
export enum Tipo {
    Pop = 'Pop!',
    PopRides = 'Pop! Rides',
    VinylSoda = 'Vinyl Soda',
    VinylGold = 'Vinyl Gold',
}
export enum Genero {
    Animacion = 'Animación',
    PeliculasTV = 'Películas y TV',
    Videojuegos = 'Videojuegos',
    Deportes = 'Deportes',
    Musica = 'Música',
    Anime = 'Ánime',
}
```
Aqui tenemos los tipos de Funkos que pueden ser y sus Generos, si el usuario introduce un tipo o un genero que no está en el enumerado, la aplicación no lo dará por válido.
La estructura de la interfaz de los Funkos es la siguiente:
```ts
export interface Funko {
    id: string;
    nombre: string;
    descripcion: string;
    tipo: Tipo;
    genero: Genero;
    franquicia: string;
    numero: number;
    exclusivo: boolean;
    caracteristicasEspeciales: string;
    valorDeMercado: number;
}
```
Esta cuenta con las características que nos dan en el enunciado de la práctica.
## FunkoOperations.ts
Aquí he creado una clase llamada *FunkoOperations* con dos variables, `funkos`: array de Funkos donde los cargo y los voy guardando y `userDirectory`: directorio del usuario introducido donde guardamos los ficheros JSON necesarios. Para el constructor, primero introduce el nombre del usuario y creo una carpeta `/users/` donde introduzco la carpeta necesaria o la leo del usuario correspondiente. En el mismo constructor llamo a la función `loadFunkos()` que es la encargada de cargar todos los Funkos de los ficheros JSON a la clase. Más tarde explico exactamente lo que hace. Funciones:
### `addFunko(funko: Funko, username: string)`: 
En esta función compruebo primero si existe el Funko introducido, en caso de que exista pongo un mensaje en la consola que sea rojo con el paquete chalk y en caso de que no esté hago un push al array de funkos y pongo un mensaje en verde de que se ha añadido correctamente. Utilizo la función `saveFunko()` que explicaré mas tarde pero básicamente sirve para guardar un Funko en un archivo JSON.
```ts
const existingFunko = this.findFunko(funko.id);
if (existingFunko) {
    console.log(chalk.red(`Funko already exists at ${username} collection!`));
} else {
    this.funkos.push(funko);
    this.saveFunko(funko);
    console.log(chalk.green(`New Funko added to ${username} collection!`));
}
```
### `updateFunko(updatedFunko: Funko, username: string)`: 
Primero busco el Funko introducido y me aseguro de que exista, en caso de que no exista, dejo un mensaje en la consola. Si existe, utilizo la función `saveFunko()` para guardar el Funko en el JSON y en el array de Funkos, modifico el correspondiente.
```ts
const index = this.funkos.findIndex(funko => funko.id === updatedFunko.id);
if (index !== -1) {
    this.funkos[index] = updatedFunko;
    this.saveFunko(updatedFunko);
    console.log(chalk.green(`Funko updated at ${username} collection!`));
} else {
    console.log(chalk.red(`Funko not found at ${username} collection!`));
}
```
### `deleteFunko(id: string, username: string)`: 
Al igual que las otras funciones, primero busca si existe y en caso de que exista utiliza *splice* para el array de Funkos y llama a `deleteFunkoFile()` para eliminar el el fichero donde está guardado el Funko introducido.
```ts
const index = this.funkos.findIndex(funko => funko.id === id);
if (index !== -1) {
    this.funkos.splice(index, 1);
    this.deleteFunkoFile(id);
    console.log(chalk.green(`Funko removed from ${username} collection!`));
} else {
    console.log(chalk.red(`Funko not found at ${username} collection!`));
}
```
### `findFunko(funkoId: string)`:
Esta función lo único que hace es devolver el Funko correspondiente al introducir un id, si el Funko no existe, devuelve undefined.
```ts
return this.funkos.find((funko) => funko.id === funkoId);
```
### `listFunkos(username: string)`:
Esta función se encarga de listar todos los Funkos recorriendo el array de Funkos y llamando a la función `printFunkoInfo()`.
```ts
if (this.funkos.length === 0) {
    console.log(chalk.red(`No Funkos in the list of ${username}`));
return;
}
console.log(chalk.blue(`----------------------------------`));
console.log(chalk.blue(`${username} Funko Pop Collection`));
for (const funko of this.funkos) {
    this.printFunkoInfo(funko);
}
```
### `getFunkoById(id: string, username: string)`:
Esta función devuelve la información detallada de un Funko que el usuario mete manualmente. Simplemente busca el Funko para comprobar que existe y llama a la función `printFunkoInfo()` para mostrar en consola la información.
```ts
const funko = this.funkos.find(f => f.id === id);
if (!funko) {
    console.log(chalk.red(`Funko not found at ${username} collection!`));
    return;
}
this.printFunkoInfo(funko);
```
### `printFunkoInfo(funko: Funko)`:
Esta función imprime cada detalle del Funko, utilizo el paquete chalk para imprimir con distintos colores.
```ts
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
```
### `getMarketValueColor(value: number)`:
Esta función sirve para devolver el color necesario dependiendo del valor del Funko, en mi caso si es menor que 20 imprimo con color rojo, si está entre 20 y 30 imprimo en color azul, si es entre 30 y 50 imprimo en color amarillo y si es mayor que 50 imprimo en color verde.
```ts
if (value < 20){
    return chalk.red;
}else if (value >= 20 && value < 30){
    return chalk.blue;
} else if (value >= 30 && value < 50){
    return chalk.yellow;
} else{
    return chalk.green;
}
```
### `loadFunkos()`:
Esta función carga los Funkos de un usuario y los introduce uno por uno en el array de Funkos de la clase.
```ts
if (!fs.existsSync(this.userDirectory)) {
    fs.mkdirSync(this.userDirectory);
}
const files = fs.readdirSync(this.userDirectory);
files.forEach((file) => {
    const content = fs.readFileSync(`${this.userDirectory}/${file}`, 'utf-8');
    const funko: Funko = JSON.parse(content);
    this.funkos.push(funko);
});
```
### `saveFunko(funko: Funko)`:
Esta función escribe la información de un Funko en concreto en su fichero correspondiente utilizando fs.
```ts
const filePath = `${this.userDirectory}/${funko.id}.json`;
const content = JSON.stringify(funko);
fs.writeFileSync(filePath, content);
```
### `deleteFunkoFile(funkoId: string)`:
Esta función elimina el fichero del Funko introducido utilizando fs.
```ts
const filePath = `${this.userDirectory}/${funkoId}.json`;
fs.unlinkSync(filePath);
```
## Index.ts
Este fichero utiliza el paquete yargs para leer los comandos introducidos por el usuario en la consola. Yo he creado 5 comandos: add, remove, list, read, update. Todos los he realizado de la misma forma asi que voy a explicar el funcionamiento por ejemplo de remove para ver como funciona:
```ts
const argv = yargs(hideBin(process.argv))
.command(
  'remove',
  'Eliminar un Funko',
  (yargs) => {
    return yargs
    .option('user', { describe: 'Nombre de usuario', type: 'string', demandOption: true })
    .option('id', { describe: 'ID del Funko', type: 'string', demandOption: true })
  },
  (argv) => {
    const funkoOperations = new FunkoOperations(argv.user);
    funkoOperations.deleteFunko(argv.id, argv.user)
  }
)
```
Primero introduzco el nombre del comando y una pequeña descripción, después voy leyendo todas las variables y les pongo la opción de `demandOption: true` para que sea obligatorio introducir esas variables. En este caso las variables son el nombre del usuario y el id del Funko a eliminar. Después en argv creo un nuevo objeto `FunkoOperations` con el argumento del usuario introducido y aplico la operación correspondiente, en este caso `deleteFunko` con el id introducido y el usuario introducido: (argv.id, argv.user)
## Tests
Los tests se han realizado con Mocha Chai y sus resultados son los siguientes:
INTRODUCIR IMAGEN
Los resultados del Coverall son los siguientes:
INTRODUCIR IMAGEN
Los resultados del SonarCloud son los siguientes:
INTRODUCIR IMAGEN
## Ejemplos de ejecución
**Añado un Funko**

**Añado el mismo Funko**

**Añado otro Funko**

**Imprimo todos los Funkos del usuario**

**Modifico el primer Funko**

**Imprimo toda la información de nuevo para ver la modificación**

**Muestro la información del primer Funko**

**Muestro la información de un Funko que no existe**

**Elimino el primer Funko**

**Intento eliminar un Funko que no existe**

**Muestro todos los Funkos para ver si se han eliminado**
## Conclusión
En esta práctica he aprendido como utilizar bien el paquete yargs y todas sus posibilidades para ejecutar comandos por pantalla, también he aprendido sobre el paquete chalk que puedes poner colores a los mensajes y he mejorado con la lectura de archivos y ficheros de tipo por ejemplo JSON.
