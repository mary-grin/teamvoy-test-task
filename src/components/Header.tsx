import {FC} from "react";

import styled from "styled-components";

const Header: FC = () => {
    return (
        <header>
            <Title>Pokedex</Title>
        </header>
    )
}

const Title = styled.h1`
  font-size: 52px;
  font-weight: bold;
  color: #8d2fff;
  text-align: center;
`

export default Header;