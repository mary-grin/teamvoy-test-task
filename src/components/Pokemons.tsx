import {FC, useEffect, useState} from "react";

import useFetch from "../hooks/useFetch";
import {IPokemon, IPokemonResponse} from "../interfaces/pokemon.interface";
import Pokemon from "./Pokemon";
import styled from "styled-components";
import Spinner from "./Spinner";

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

    function onLoadMore() {
        if(data) {
            setUrl(data.next)
        }
    }

    const Content = () => {
        return (
            <>
                <PokemonsWrapper>
                    {pokemon.map(el => <Pokemon key={el.name} pokemon={el}/>)}
                </PokemonsWrapper>
                <Button onClick={() => onLoadMore()}>{loading ? <Spinner/> : 'Load More'}</Button>
            </>
        )
    }

    return (
        <Wrapper>
            {pokemon.length ? <Content/> : null}
            {error && <p>Something went wrong :( Try again</p>}
        </Wrapper>
    )
}

const Wrapper = styled.div`
  width: 50%;
`

const PokemonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
  gap: 25px;
`

const Button = styled.button`
  display: block;
  margin: 30px auto;
  width: 250px;
  height: 50px;
  background-color: #8d2fff;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 20px;
  cursor: pointer;

  :hover {
    background-color: #b87dff;
  }

  @media (max-width: 768px) {
    width: 180px;
  }
`

export default Pokemons;