import {FC, useEffect, useState} from "react";

import styled from "styled-components";

import {transformPokemonData} from "../api/api";
import {IPokemon, IPokemonTransform} from "../interfaces/pokemon.interface";
import Pokemon from "./Pokemon";
import Spinner from "./Spinner";

interface PokemonsProps {
    pokemon: IPokemonTransform[],
    error: Error | null
}

const Pokemons: FC<PokemonsProps> = ({pokemon, error}) => {
    // const [pok, setPokemon] = useState<IPokemonTransform[]>([])
    // const [err, setError] = useState<Error | null>(null)
    // const [loading, setLoading] = useState<boolean>(false)

    // useEffect(() => {
    //     setLoading(true)
    //     pokemon.map(item => {
    //         const doesExist = pok.find(elem => elem.name === item.name)
    //         if(doesExist) return
    //         getPokemon(item.url)
    //     })
    //     setLoading(false)
    //     onFinishFetch()
    // }, [pokemon])

    // const getPokemon = (url: string) => {
    //     fetch(url)
    //         .then(res => res.json())
    //         .then(data => setPokemon(state => {
    //             if(JSON.stringify(data) === JSON.stringify(state)) return state
    //             return [...state, transformPokemonData(data)]
    //         }))
    //         .catch(err => setError(err))
    // }

    const Content = () => {
        return (
            <PokemonsWrapper>
                {pokemon.map(el => <Pokemon key={el.name} pok={el} /*error={err}*//>)}
            </PokemonsWrapper>
        )
    }

    return (
        <div>
            {pokemon.length ? <Content/> : null}
            {/*{loading && <Spinner/>}*/}
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