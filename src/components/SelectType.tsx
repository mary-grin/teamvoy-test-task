import {FC} from "react";
import styled from "styled-components";
import "../styles/Pokemon.types.css"

interface SelectTypeProps {
    types: string[],
    onChange: (type: string) => void
}

const SelectType: FC<SelectTypeProps> = ({types, onChange}) => {
    return (
        <Wrapper>
            <label>Filter by type: </label>
            <select onChange={(e) => onChange(e.target.value)}>
                <option value={"show all"}>show all</option>
                {types.map(type => <Option className={type} value={type} key={type}>{type}</Option>)}
            </select>
        </Wrapper>

    )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin: 10px 0;
  position: sticky;
  top: 20px;
  background-color: white;
  padding: 5px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`

const Option = styled.option`
  color: white;
`

export default SelectType;