import React, { Fragment, createRef } from 'react'

import imagePDF from '../../icons/tituloPoseidon.png'

import Pdf from 'react-to-pdf'

import { jsPDF } from 'jspdf'

const options = {
    orientation: 'center'
};

export const PDF = (props) => {

    const ref = createRef();

    const { data, ...rest } = props;

    console.log(data); //entre esto, asunto, destino, mensaje esta toda la info de todas las tablas!

    return (
        <Fragment>
            <div className="post-pdf" ref={ref}>
                <img src={imagePDF} />
                <h3>Comprobante de pago no fiscal ©</h3>
                <br/>
                <h2>Servicio Balneario Poseidon</h2>
                <h3>Cliente: {data.cliente}</h3>
                <h3>Deuda: {data.deuda}</h3>
            </div>
            <Pdf targetRef={ref} filename="post.pdf" options={options} scale={0.8} >
                {({ toPdf }) => 
                    <button className="button2-pdf" onClick={toPdf} >Descargar PDF</button>
                }
            </Pdf>
        </Fragment>
    )
}
