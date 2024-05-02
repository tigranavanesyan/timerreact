import React, {useState} from 'react';

function Input(props) {
   const [val, setVal] = useState("00:59")
    return (
        <input className="show" type="text" value={val} onChange={(e)=>setVal(e.target.value)}/>
    );
}

export default Input;