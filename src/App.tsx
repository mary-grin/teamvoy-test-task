import {useState} from "react";

import styled from "styled-components";

import './App.css'

import Header from "./components/Header";
import Pokemons from "./components/Pokemons";
import Spinner from "./components/Spinner";
import PokemonContext from "./context/PokemonContext";
import PokemonInfo from "./components/PokemonInfo";
import {IPokemonTransform} from "./interfaces/pokemon.interface";
import SelectType from "./components/SelectType";
import {usePokemon} from "./usePokemon";


function App() {
    const {
        pokemon,
        loading,
        types,
        isHidden,
        error,
        setLoading,
        setError,
        fetchPokemon,
        fetchPokemonByType
    } = usePokemon()

    const [selectedPokemon, setSelectedPokemon] = useState<IPokemonTransform | null>(null)

    const onSetFilter = (type: string) => {
        fetchPokemonByType(type)
            .catch(err => setError(err))
    }

    const onSelectPokemon = (pokemon: IPokemonTransform) => {
        setSelectedPokemon(pokemon)
    }

    const onLoadMore = () => {
        setLoading(true)
        fetchPokemon()
            .catch(err => setError(err))
    }

    const onFinishFetch = () => {
        setLoading(false)
    }

    return (
        <PokemonContext.Provider value={{selectedPokemon, onSelectPokemon}}>
            <Header/>
            <Main>
                <PokemonList>
                    <SelectType types={types} onChange={onSetFilter}/>
                    <Pokemons pokemon={pokemon} loading={loading} error={error} onFinishFetch={onFinishFetch}/>
                    {isHidden ? null : <Button
                        disabled={loading}
                        onClick={onLoadMore}>
                        {loading ? <Spinner/> : 'Load More'}
                    </Button>}
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
  margin: 20px 0;
`

const PokemonList = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
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
