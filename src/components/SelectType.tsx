import {FC, useEffect, useState} from "react";

import {IPokemon} from "../interfaces/pokemon.interface";

interface SelectTypeProps {
    onChange: (type: string) => void
}

const SelectType: FC<SelectTypeProps> = ({onChange}) => {
    const [types, setTypes] = useState<string[]>([])

    useEffect(() => {
        getPokemonTypes('https://pokeapi.co/api/v2/type')
    }, [])

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

    return (
        <select onChange={(e) => onChange(e.target.value)}>
            <option value={"show all"}>show all</option>
            {types.map(type => <option value={type} key={type}>{type}</option>)}
        </select>
    )
}

export default SelectType;