import {useEffect, useState} from "react";
import {
    IPokemon,
    IPokemonResponse,
    IPokemonTransform,
    ITypes,
    ITypesPokemon
} from "./interfaces/pokemon.interface";
import {_firstRequestApi, _typeApi, transformPokemonData} from "./api/api";

export const usePokemon = () => {
    const [pokemon, setPokemon] = useState<IPokemonTransform[]>([]);
    const [nextUrl, setUrl] = useState<string | null>(_firstRequestApi);
    const [loading, setLoading] = useState<boolean>(false);
    const [isHidden, setIsHidden] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)
        fetchPokemon().then(() => setLoading(false))
    }, [])

    const fetchPokemon = async () => {
        if(nextUrl) {
            const newPokemon: IPokemonResponse = await fetch(nextUrl).then(res => res.json());
            setUrl(() => {
                if(!newPokemon.next) setIsHidden(true)
                return newPokemon.next
            });
            newPokemon.results.map((item: IPokemon) => fetchOnePokemon(item.url))
        }
    }

    const fetchPokemonByType = async (type: string) => {
        setPokemon([])
        if(type !== 'show all') {
            setIsHidden(true)
            const newPokemon: ITypes = await fetch(_typeApi + type).then(res => res.json());
            newPokemon.pokemon.map((item: ITypesPokemon) => fetchOnePokemon(item.pokemon.url))
            setUrl(_firstRequestApi)
        } else {
            setIsHidden(false)
            fetchPokemon().then(() => setLoading(false))
        }
    }

    const fetchOnePokemon = (url: string) => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setPokemon(state => {
                    const isExist = state.find(el => el.name === data.name);
                    if(isExist) return state
                    else return [...state, transformPokemonData(data)]
                })
            })
    }

    return {pokemon, loading, isHidden, setLoading, fetchPokemon, fetchPokemonByType}

}