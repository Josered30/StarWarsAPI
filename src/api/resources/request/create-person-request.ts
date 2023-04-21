export type CreatePersonRequest = {
  readonly nombre: string;
  readonly nacimiento: string;
  readonly colorOjos: string;
  readonly genero: string;
  readonly colorCabello: string;
  readonly altura: string;
  readonly masa: string;
  readonly colorPiel: string;
  readonly mundoOrigen: string;
  readonly url: string;
  readonly fechaCreacion: Date;
  readonly fechaEdicion: Date;
  readonly species: string[];
  readonly starships: string[];
  readonly vehicles: string[];
  readonly films: string[];
};
