import React, { useState } from 'react'

import { PDF } from './PDF'

export const PdfForm = (props) => {

    const { data, ...rest } = props

    const [postPDF, setPostPDF] = useState(false)

    const togglePDF = () => {
        setPostPDF(!postPDF)
    }

    return (
        <>
            <button className="button-pdf" onClick={event => togglePDF()}>{postPDF ? "Ocultar PDF" : "Mostrar PDF"}</button>
            {postPDF && <PDF data={data} /> }
        </>
    )
}
