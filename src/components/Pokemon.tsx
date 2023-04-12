import {FC, useEffect, useMemo, useState} from "react";

import styled from "styled-components";
import {IPokemon, IPokemonInfo, IPokemonTransform} from "../interfaces/pokemon.interface";
import useFetch from "../hooks/useFetch";
import {transformPokemonData} from "../api/api";
import defaultImg from "../assets/default-image.png"
import "../styles/Pokemon.types.css"
import Spinner from "./Spinner";

interface PokemonProps {
    pok: IPokemonTransform,
    loading: boolean,
    error: Error | null
}

const Pokemon: FC<PokemonProps> = ({pok, loading, error}) => {
    return (
        <PokemonWrapper>
            {pok &&
                <>
                    <img src={pok.img || defaultImg}/>
                    <p>{pok.name}</p>
                    <TypeWrapper>
                        {pok.types.map(type =>
                            <p className={type.name + " type"} key={type.name}>{type.name}</p>
                        )}
                    </TypeWrapper>
                </>
            }
            {loading && <Spinner/>}
            {error && <p>Something went wrong :(</p>}
        </PokemonWrapper>

    )
}

const PokemonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 140px;
  padding: 20px;
  background-color: #cfaff6;
  cursor: pointer;
  transition-duration: 0.3s;

  :hover {
    scale: 1.05;
    transition-duration: 0.3s;
    background-color: #ba8cf3;
  }

  img {
    width: 120px;
  }

  .type {
    color: white;
    padding: 3px;
    border-radius: 7px;
  }
`

const TypeWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`

export default Pokemon;