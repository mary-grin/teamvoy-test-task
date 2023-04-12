import {FC, useEffect, useState} from "react";

import {IPokemon, IPokemonTransform} from "../interfaces/pokemon.interface";
import Pokemon from "./Pokemon";
import styled from "styled-components";
import {transformPokemonData} from "../api/api";

interface PokemonsProps {
    pokemon: IPokemon[],
    error: Error | null
}

const Pokemons: FC<PokemonsProps> = ({pokemon, error}) => {
    const [pok, setPokemon] = useState<IPokemonTransform[]>([])
    const [err, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        pokemon.map(item => {
            const doesExist = pok.find(elem => elem.name === item.name)
            if(doesExist) return
            getPokemon(item.url)
        })
    }, [pokemon])

    const getPokemon = (url: string) => {
        setLoading(true)
        fetch(url)
            .then(res => res.json())
            .then(data => setPokemon(state => {
                if(JSON.stringify(data) === JSON.stringify(state)) return state
                return [...state, transformPokemonData(data)]
            }))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }

    const Content = () => {
        return (
            <PokemonsWrapper>
                {pok.map(el => <Pokemon key={el.name} pok={el} loading={loading} error={err}/>)}
            </PokemonsWrapper>
        )
    }

    return (
        <>
            {pokemon.length ? <Content/> : null}
            {error && <p>Something went wrong :( Try again</p>}
        </>
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