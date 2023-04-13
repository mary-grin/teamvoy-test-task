import {FC, useContext} from "react";

import styled from "styled-components";

import defaultImg from "../assets/default-image.png"
import PokemonContext from "../context/PokemonContext";

const PokemonInfo: FC = () => {
    const { selectedPokemon } = useContext(PokemonContext);
    if(!selectedPokemon) {
        return (
            <Wrapper>
                Choose some pokemon to see details
            </Wrapper>
        )
    }
    return (
        <Wrapper>
            <img src={selectedPokemon.img || defaultImg} alt={"Image of pokemon " + selectedPokemon.name}/>
            <p><strong>{selectedPokemon.name}</strong></p>
            <Table>
                <thead>
                    <tr>
                        <td>Type</td>
                        <td>{selectedPokemon.types.map(type => <span key={type.name}>{type.name} </span>)}</td>
                    </tr>
                </thead>
                <tbody>
                    <TableRow title="Attack" type={selectedPokemon.attack}/>
                    <TableRow title="Defense" type={selectedPokemon.defence}/>
                    <TableRow title="HP" type={selectedPokemon.hp}/>
                    <TableRow title="SP Attack" type={selectedPokemon.spAttack}/>
                    <TableRow title="SP Defense" type={selectedPokemon.spDefence}/>
                    <TableRow title="Speed" type={selectedPokemon.speed}/>
                    <TableRow title="Weight" type={selectedPokemon.weight}/>
                    <TableRow title="Total moves" type={selectedPokemon.totalMoves}/>
                </tbody>
            </Table>
        </Wrapper>
    )
}

const TableRow: FC<{title: string, type: string | number}> = ({title, type}) => {
    return (
        <tr>
            <td>{title}</td>
            <td>{type}</td>
        </tr>
    )
}

const Wrapper = styled.div`
  background-color: #bc85ff;
  height: fit-content;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: sticky;
  top: 20px;
  img {
    width: 150px;
  }
  @media (max-width: 768px) {
    padding: 10px;
    img {
      width: 120px;
    }
  }
`

const Table = styled.table`
  border: 1px solid black;
  border-collapse: collapse;
  tr, td {
    border: 1px solid black;
    padding: 3px;
  }
  @media (max-width: 768px) {
    font-size: 12px;
  }
`

export default PokemonInfo;