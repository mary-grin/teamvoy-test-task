import {useEffect, useState} from "react";

import styled from "styled-components";

import './App.css'

import Header from "./components/Header";
import Pokemons from "./components/Pokemons";
import Spinner from "./components/Spinner";
import PokemonContext from "./context/PokemonContext";
import PokemonInfo from "./components/PokemonInfo";
import {IPokemon, IPokemonTransform} from "./interfaces/pokemon.interface";


function App() {
    const [url, setUrl] = useState<string>('https://pokeapi.co/api/v2/pokemon/?&limit=12')
    const [pokemon, setPokemon] = useState<IPokemon[]>([])
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [isDisabled, setIsDisabled] = useState<boolean>(false)

    const [selectedPokemon, setSelectedPokemon] = useState<IPokemonTransform | null>(null)

    const onSelectPokemon = (pokemon: IPokemonTransform) => {
        setSelectedPokemon(pokemon)
    }

    useEffect(() => {
        setIsDisabled(true)
        setLoading(true)
        getPokemons(url)
    }, [])

    const onLoadMore = () => {
        setIsDisabled(true)
        setLoading(true)
        getPokemons(url)
    }

    const onFinishFetch = () => {
        setLoading(false)
        setIsDisabled(false)
    }

    const getPokemons = (url: string): void => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setPokemon(state => {
                    if(JSON.stringify(state) === JSON.stringify(data.results)) return state
                    return [...state, ...data.results]
                })
                setUrl(data.next)
            })
            .catch(err => setError(err))
    }

    return (
        <PokemonContext.Provider value={{selectedPokemon, onSelectPokemon}}>
            <Header/>
            <Main>
                <PokemonList>
                    <Pokemons pokemon={pokemon} error={error} onFinishFetch={onFinishFetch}/>
                    <Button
                        disabled={isDisabled}
                        onClick={onLoadMore}>
                        {loading ? <Spinner/> : 'Load More'}
                    </Button>
                </PokemonList>
                <Wrapper>
                    <PokemonInfo/>
                </Wrapper>
            </Main>
        </PokemonContext.Provider>
    )
}

const Main = styled.main`
  display: flex;
`

const PokemonList = styled.div`
  width: 50%;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  position: relative;
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

export default App
