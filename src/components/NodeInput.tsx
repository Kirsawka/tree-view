import React from "react";
import {NodeInputProps} from "../types";

function NodeInput({value, onChange}: NodeInputProps) {
  return <input type="text"
                className='input'
                value={value}
                onChange={onChange}/>
}

export default NodeInput;