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