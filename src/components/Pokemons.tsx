import {FC, useEffect} from "react";

import styled from "styled-components";

import {IPokemonTransform} from "../interfaces/pokemon.interface";
import Pokemon from "./Pokemon";

interface PokemonsProps {
    pokemon: IPokemonTransform[],
    loading: boolean,
    onFinishFetch: () => void,
    error: Error | null
}

const Pokemons: FC<PokemonsProps> = ({pokemon, loading, onFinishFetch, error}) => {

    useEffect(() => {
        if(pokemon.length) onFinishFetch()
    }, [pokemon])

    const Content = () => {
        return (
            <PokemonsWrapper>
                {pokemon.map(el => <Pokemon loading={loading} key={el.name} pok={el}/>)}
            </PokemonsWrapper>
        )
    }

    return (
        <div>
            {pokemon.length ? <Content/> : <p>Sorry, nothing to show :( Choose another type</p>}
            {error && <p>Something went wrong :( Try again</p>}
        </div>
    )
}

const PokemonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
  gap: 25px;
`


export default Pokemons;