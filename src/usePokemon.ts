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
    const [types, setTypes] = useState<string[]>([]);
    const [nextUrl, setUrl] = useState<string | null>(_firstRequestApi);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null)
    const [isHidden, setIsHidden] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true)
        fetchPokemon().catch(err => setError(err))
        getPokemonTypes(_typeApi)
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
            fetchPokemon().catch(err => setError(err))
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

    const getPokemonTypes = (url: string): void => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                data.results.map((type: IPokemon) => {
                    setTypes((state => {
                        const isExist = state.find(el => type.name === el)
                        if(isExist) return state
                        return [...state, type.name]
                    }))
                })
            })
    }

    return{
        pokemon,
        types,
        loading,
        setLoading,
        error,
        isHidden,
        setError,
        fetchPokemon,
        fetchPokemonByType
    }

}