import {FC, useEffect, useState} from "react";

import useFetch from "../hooks/useFetch";
import {IPokemon, IPokemonResponse} from "../interfaces/pokemon.interface";
import Pokemon from "./Pokemon";
import styled from "styled-components";

interface PokemonsProps {

}

const Pokemons: FC<PokemonsProps> = ({}) => {
    const [url, setUrl] = useState<string>('https://pokeapi.co/api/v2/pokemon/?&limit=12')
    const [pokemon, setPokemon] = useState<IPokemon[]>([])

    const {data, error, loading} = useFetch<IPokemonResponse>(url)

    useEffect(() => {
        if(data) {
            setPokemon(state => {
                if(JSON.stringify(state) === JSON.stringify(data.results)) return state
                return [...state, ...data.results]
            })
        }
    }, [data])

    function click() {
        if(data) {
            setUrl(data.next)
        }
    }

    return (
        <div>
            {pokemon &&
                <PokemonsWrapper>
                    {pokemon.map(el => <Pokemon key={el.name} pokemon={el}/>)}
                </PokemonsWrapper>
            }
            <button onClick={() => click()}>Load More</button>
        </div>
    )
}

const PokemonsWrapper = styled.div`
  display: flex;
  width: 50%;
  flex-wrap: wrap;
  gap: 20px;
`

export default Pokemons;