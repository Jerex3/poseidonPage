import React, { useState, Fragment } from 'react';

//Components
//External
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { ButtonGroup, Button } from '@material-ui/core';

//Internal

import EffectTransparency from '../Animations/EffectTransparency'
import PopUpMessage from '../Forms/PopUpMessage'

export default function RowForm(props) {

    const { selected, names, row, handleAdding, title, addRow, ...rest } = props;

    const [newRow, setNewRow] = useState('')

    const [fetching, setFetching] = useState(false)
    const [errorCalculate, setErrorCalculate] = useState(false)


    const onChange = (event) => {
        event.persist()
        setNewRow((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }


    const Selected = (index) => {

        if (selected.length)
            return selected[0][names[index]];
    }

    const getBodyMessage = () => {

        let BodyMessage = `Nombre: ${newRow.name}
                       \n Apellido: ${newRow.secondName} 
                       \n Dni: ${newRow.dni}
                       \n Email: ${newRow.email}
                       `;
        return BodyMessage;
    }

    const getPopUpMessage = (titleMessage, bodyMessage, modeMessage, responseTrue, responseFalse) => {
        return <EffectTransparency nameTable={title} toggleRenderComponent={togglePicking} >
            <PopUpMessage
                title={titleMessage}
                message={bodyMessage}
                mode={modeMessage}
                children={({ response }) => response ? responseTrue() : responseFalse(false)}
            />
        </EffectTransparency>
    }

    const togglePicking = (nameTable, doneSelect) => {
        setFetching(false)
    }

    const handleAddData = () => {

        addRow(newRow, title)
    }

    return (
        <Fragment>
            { fetching && getPopUpMessage("Deseas Continuar?", getBodyMessage(), "confirm", handleAddData, setFetching)}
            <TableRow>
                <TableCell>
                    <ButtonGroup color="secondary">
                        <Button onClick={event => { if (selected.length) props.modifyRow(selected[0]._id, newRow); setFetching(true) }}>
                            <Tooltip title="Accept" arrow>
                                <CheckIcon />
                            </Tooltip>
                        </Button>
                        <Button onClick={event => { handleAdding(event) }}>
                            <Tooltip title="Cancel" arrow>
                                <ClearIcon />
                            </Tooltip>
                        </Button>
                    </ButtonGroup>
                </TableCell>

                {names.map((element, index) => {
                    if (element != "_id") {
                        return (
                            <TableCell align="left" key={names[index].toString() + index}>
                                <TextField
                                    key={names[index].toString() + index}
                                    name={element}
                                    id={names[index].toString()}
                                    label={element}
                                    value={newRow[element]}
                                    color="secondary"
                                    onChange={event => { onChange(event) }}
                                    defaultValue={Selected(index)}
                                />
                            </TableCell>
                        )
                    }
                })
                }
            </TableRow>
        </Fragment>
    );
}