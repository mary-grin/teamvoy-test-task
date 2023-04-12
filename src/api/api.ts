import {IPokemonInfo, IPokemonTransform} from "../interfaces/pokemon.interface";

export const transformPokemonData = (pokemon: IPokemonInfo | undefined) :IPokemonTransform | null => {

    if(!pokemon) return null;

    return {
        img: pokemon.sprites.front_default,
        name: pokemon.name,
        types: pokemon.types.map(type => type.type),
        hp: pokemon.stats[0].base_stat,
        attack: pokemon.stats[1].base_stat,
        defence: pokemon.stats[2].base_stat,
        spAttack: pokemon.stats[3].base_stat,
        spDefence: pokemon.stats[4].base_stat,
        speed: pokemon.stats[5].base_stat,
        weight: pokemon.weight,
        totalMoves: pokemon.moves.length
    }

}