import {FC, useContext} from "react";

import styled from "styled-components";
import PokemonContext from "../context/PokemonContext";

interface PokemonInfoProps {
}

const PokemonInfo: FC<PokemonInfoProps> = ({}) => {
    const { selectedPokemon } = useContext(PokemonContext);
    if(!selectedPokemon) {
        return (
            <>
                Choose some pokemon to see details
            </>
        )
    }
    return (
        <Wrapper>
            <img src={selectedPokemon.img} alt={"Image of pokemon"}/>
            <p>{selectedPokemon.name}</p>
            <table>
                <tr>
                    <td>Type</td>
                    <td>{selectedPokemon.types.map(type => <span>{type.name}</span>)}</td>
                </tr>
                <tr>
                    <td>Attack</td>
                    <td>{selectedPokemon.attack}</td>
                </tr>
                <tr>
                    <td>Defense</td>
                    <td>{selectedPokemon.defence}</td>
                </tr>
                <tr>
                    <td>HP</td>
                    <td>{selectedPokemon.hp}</td>
                </tr>
                <tr>
                    <td>SP Attack</td>
                    <td>{selectedPokemon.spAttack}</td>
                </tr>
                <tr>
                    <td>SP Defense</td>
                    <td>{selectedPokemon.spDefence}</td>
                </tr>
                <tr>
                    <td>Speed</td>
                    <td>{selectedPokemon.speed}</td>
                </tr>
                <tr>
                    <td>Weight</td>
                    <td>{selectedPokemon.weight}</td>
                </tr>
                <tr>
                    <td>Total moves</td>
                    <td>{selectedPokemon.totalMoves}</td>
                </tr>
            </table>
        </Wrapper>
    )
}

const Wrapper = styled.div`

`

export default PokemonInfo;