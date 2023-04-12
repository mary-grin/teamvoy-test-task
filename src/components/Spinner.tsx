import {FC} from "react";

import spinner from "../assets/spinner.gif"

const Spinner: FC = () => {
    return (
        <img src={spinner} style={{height:'100%'}}/>
    )
}

export default Spinner;