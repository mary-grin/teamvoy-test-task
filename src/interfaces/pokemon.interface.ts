export interface IPokemonResponse {
    next: string;
    results: IPokemon[]
}

export interface IPokemon {
    name: string;
    url: string;
}

export interface IPokemonInfo {
    name: string,
    abilities: IPokemonAbilities[],
    sprites: IPokemonImage,
    types: IPokemonType[],
    base_experience: number,
    height: number,
    weight: number,
    moves: IPokemonMoves[],
    stats: IStat[]
}

export interface IPokemonTransform {
    img: string,
    name: string,
    types: { name: string }[],
    hp: number,
    attack: number,
    defence: number
    spAttack: number,
    spDefence: number,
    speed: number,
    weight: number,
    totalMoves: number
}

export interface IPokemonMoves {
    move: {name: string, url: string}
}

export interface IPokemonAbilities {
    ability: { name: string }
}

export interface IPokemonImage {
    front_default: string
}

export interface IPokemonType {
    type: { name: string }
}
export interface ITypes {
    pokemon: ITypesPokemon[]
}

export interface ITypesPokemon {
    pokemon: IPokemon
}

export interface IStat {
    base_stat: number,
    stat: {name: string}
}