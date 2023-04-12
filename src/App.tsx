import './App.css'
import Header from "./components/Header";
import Pokemons from "./components/Pokemons";
import {useEffect, useState} from "react";
import {IPokemon} from "./interfaces/pokemon.interface";
import Spinner from "./components/Spinner";
import styled from "styled-components";

function App() {
    const [url, setUrl] = useState<string>('https://pokeapi.co/api/v2/pokemon/?&limit=12')
    const [pokemon, setPokemon] = useState<IPokemon[]>([])
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        getPokemons(url)
    }, [])

    const getPokemons = (url: string): void => {
        setLoading(true)
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
            .finally(() => setLoading(false))
    }

    const onLoadMore = () => {
        getPokemons(url)
    }

    return (
    <>
        <Header/>
        <main>
            <Wrapper>
                <Pokemons pokemon={pokemon} error={error}/>
                <Button onClick={() => onLoadMore()}>{loading ? <Spinner/> : 'Load More'}</Button>
            </Wrapper>
        </main>
    </>
    )
}

const Wrapper = styled.div`
  width: 50%;
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
