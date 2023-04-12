import {FC, useContext} from "react";

import styled from "styled-components";

import "../styles/Pokemon.types.css"

import defaultImg from "../assets/default-image.png"
import {IPokemonTransform} from "../interfaces/pokemon.interface";
import PokemonContext from "../context/PokemonContext";

interface PokemonProps {
    pok: IPokemonTransform,
    error: Error | null
}

const Pokemon: FC<PokemonProps> = ({pok, error}) => {
    const { onSelectPokemon } = useContext(PokemonContext);

    return (
        <PokemonWrapper onClick={() => onSelectPokemon(pok)}>
            {pok &&
                <>
                    <img src={pok.img || defaultImg} alt={"Image of pokemon " + pok.name}/>
                    <p>{pok.name}</p>
                    <TypeWrapper>
                        {pok.types.map(type =>
                            <p className={type.name + " type"} key={type.name}>{type.name}</p>
                        )}
                    </TypeWrapper>
                </>
            }
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
  
  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
    width: 120px;
  }
`

const TypeWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`

export default Pokemon;