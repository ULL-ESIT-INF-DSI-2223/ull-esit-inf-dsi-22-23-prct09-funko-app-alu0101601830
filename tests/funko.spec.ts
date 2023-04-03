import { expect } from 'chai';
import { Tipo, Genero, Funko } from '../src/funko.js';
import { FunkoOperations } from '../src/funkoOperations.js';

describe('Funko', () => {
  describe('Enumerados', () => {
    it('Tipo debe contener los valores "Pop!", "Pop! Rides", "Vinyl Soda" y "Vinyl Gold"', () => {
      expect(Tipo).to.deep.equal({
        Pop: 'Pop!',
        PopRides: 'Pop! Rides',
        VinylSoda: 'Vinyl Soda',
        VinylGold: 'Vinyl Gold',
      });
    });
    it('Genero debe contener los valores "Animación", "Películas y TV", "Videojuegos", "Deportes", "Música" y "Ánime"', () => {
      expect(Genero).to.deep.equal({
        Animacion: 'Animación',
        PeliculasTV: 'Películas y TV',
        Videojuegos: 'Videojuegos',
        Deportes: 'Deportes',
        Musica: 'Música',
        Anime: 'Ánime',
      });
    });
  });

  describe('Crear Funko', () => {
    it('Debe crear un nuevo Funko con los valores proporcionados', () => {
      const funko: Funko = {
        id: '1',
        nombre: 'Funko 1',
        descripcion: 'Descripción del Funko 1',
        tipo: Tipo.Pop,
        genero: Genero.Animacion,
        franquicia: 'Franquicia 1',
        numero: 1,
        exclusivo: false,
        caracteristicasEspeciales: 'Características especiales del Funko 1',
        valorDeMercado: 10,
      };
      expect(funko).to.deep.equal({
        id: '1',
        nombre: 'Funko 1',
        descripcion: 'Descripción del Funko 1',
        tipo: Tipo.Pop,
        genero: Genero.Animacion,
        franquicia: 'Franquicia 1',
        numero: 1,
        exclusivo: false,
        caracteristicasEspeciales: 'Características especiales del Funko 1',
        valorDeMercado: 10,
      });
    });
  });
});

// Definimos las pruebas para la clase FunkoOperations
describe('FunkoOperations', () => {
  // Prueba para comprobar que se añade un Funko correctamente
  describe('Añadir Funko', () => {
    it('Debe añadir un nuevo Funko', () => {
      // Creamos una instancia de FunkoOperations
      const funkoOperations = new FunkoOperations('testuser');
      // Añadimos un Funko
      const funko: Funko = {
        id: '1',
        nombre: 'Funko 1',
        descripcion: 'Descripción del Funko 1',
        tipo: Tipo.Pop,
        genero: Genero.Animacion,
        franquicia: 'Franquicia 1',
        numero: 1,
        exclusivo: false,
        caracteristicasEspeciales: 'Características especiales del Funko 1',
        valorDeMercado: 10,
      };
      funkoOperations.addFunko(funko, 'testuser');
    });
});
});
