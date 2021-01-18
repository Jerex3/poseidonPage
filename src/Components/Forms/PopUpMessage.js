import React, { useState } from 'react'

import '../../styles/PopUpMessage.scss'

export default function PopUpMessage(props) {

    const { mode, title, message, children, ...rest } = props;

    const [loading, setLoading] = useState(false)

    return (
        <div className={"container-popup"} >
            <div className={"title-popup " + mode}>
                <h2>{title}</h2>
            </div>
            <div className="message-popup">
                <h2>{message}</h2>
            </div>
            <div className="footer-popup">
                <button onClick={event => {setLoading(true); children({response: true})} }>Confirmar</button>
                <button onClick={event => children({response: false}) }>Cancelar</button>
            </div>
            {loading &&
            <div className="loading" style={{ scale: "0.2", bottom: "-20%", left: "33%"}} />}
        </div>
    )
}
