export class Person {
  constructor(
    public readonly id: number,
    public readonly uuid: string,
    public readonly nombre: string,
    public readonly nacimiento: string,
    public readonly colorOjos: string,
    public readonly genero: string,
    public readonly colorCabello: string,
    public readonly altura: string,
    public readonly masa: string,
    public readonly colorPiel: string,
    public readonly mundoOrigen: string,
    public readonly url: string,
    public readonly fechaCreacion: Date,
    public readonly fechaEdicion: Date,
    public readonly especies: string[],
    public readonly navesEspaciales: string[],
    public readonly vehiculos: string[],
    public readonly peliculas: string[],
  ) {}
}
