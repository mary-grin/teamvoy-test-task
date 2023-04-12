import {FC, useEffect, useState} from "react";

import styled from "styled-components";
import {IPokemon, IPokemonInfo, IPokemonTransform} from "../interfaces/pokemon.interface";
import useFetch from "../hooks/useFetch";
import {transformPokemonData} from "../api/api";

interface PokemonProps {
    pokemon: IPokemon
}

const Pokemon: FC<PokemonProps> = ({pokemon}) => {
    const {data, error, loading} = useFetch<IPokemonInfo>(pokemon.url);
    const [pok, setPokemon] = useState<IPokemonTransform | null>()

    useEffect(() => {
        if(!loading) {
            setPokemon(transformPokemonData(data))
        }
    }, [loading])

    return (
        <>
            {pok && <p>{pok.name}</p>}
            {error && <p>Something went wrong :(</p>}
        </>

    )
}

export default Pokemon;