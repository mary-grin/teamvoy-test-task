import {FC, useEffect, useState} from "react";

import useFetch from "../hooks/useFetch";
import {IPokemon, IPokemonResponse} from "../interfaces/pokemon.interface";
import Pokemon from "./Pokemon";

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
        <>
            {pokemon && <div>{pokemon.map(el => <Pokemon key={el.name} pokemon={el}/>)}</div>}
            <button onClick={() => click()}>Load More</button>
        </>
    )
}

export default Pokemons;