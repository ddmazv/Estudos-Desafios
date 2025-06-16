
import React,{ useRef } from "react";


export default function Join({setChatVisibilit}){

    
    return(
        <div>
            <h1>Chat</h1>
            <input type="text" placeholder="Chat de usuario"/>
            <button>Enviar</button>
        </div>
    );
}