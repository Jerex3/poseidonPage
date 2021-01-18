import React, { useState } from 'react';

//Components
//External
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

//Internal
import RowDetail from './RowDetail.js';
import RowFormEgresos from './RowFormEgresos';
import RowFormEgresosParciales from './RowFormEgresosParciales';

import RowFormIngresos from './RowFormIngresos';
import RowFormIngresosParciales from './RowFormIngresosParciales';

import fetchIngresoP from '../../services/ingresoParcial';
import fetchIngreso from '../../services/ingreso'

import OpDate from '../Operations/Date';



export default function RowsDetail(props) {

    const { order, orderBy, rows, page, rowsPerPage, selected, adding, handleAdding, title, parcialesData, isParcial,
        addRow, modifyRow, ...rest } = props;
    
    const [indexRow, setIndexRow] = useState('');

    const isSelected = (name) => {
    
        return selected.indexOf(name) !== -1;
    }

    const names = Object.keys(rows[0]);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, (rows.length - page) * rowsPerPage);

    const addRowParcial = (newRowParcial) => {  //Ver como mejorar

        console.log(newRowParcial)
        fetchIngresoP.post(JSON.stringify(newRowParcial)) 
        .then(res => {
            console.log(res)
            console.log(selected[0])
            fetchIngreso.update(selected[0]._id, JSON.stringify({ parciales: [res._id] }));
            props.toastSuccess("Ingreso Parcial añadido");
            handleAdding();
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handlePreClick = (event, Row, index) => {
        setIndexRow(index);
        props.handleClick(event, Row, index);
    }

    const switchRender = () => { //Seguro se puede abtraer ambos porque son iguales// se vera mas adelante si cambian en comportamiento
        switch(title){
            case 'Egresos':
                if(isParcial)
                  return(<RowFormEgresosParciales adding={adding} names={names} addRow={
                         addRowParcial}
                     selected={selected} modifyRow={modifyRow} handleAdding={handleAdding} />)
                return(<RowFormEgresos adding={adding} names={names} addRow={addRow} 
                    selected={selected} modifyRow={modifyRow} handleAdding={handleAdding} />)
            
            case 'Ingresos' :
                if(isParcial)
                  return (<RowFormIngresosParciales adding={adding} names={names} addRow={addRowParcial} 
                    selected={selected} modifyRow={modifyRow} handleAdding={handleAdding} />)
                return (<RowFormIngresos adding={adding} names={names} addRow={addRow} 
                    selected={selected} modifyRow={modifyRow} handleAdding={handleAdding} />)
        }
    }

    return (
        <>
            
            {adding ? (
                switchRender()
            ) : (
                <TableBody>
                    {props.stableSort(rows, props.getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                            
                            const isItemSelected = isSelected(row);
                            return (
                                <RowDetail
                                    row={row}
                                    parcialesData={parcialesData}
                                    index={index + rowsPerPage * page}
                                    handleClick={handlePreClick}
                                    isItemSelected={isItemSelected}
                                    names={names}
                                    key={index}
                                    id={index}
                                    title={title}
                                />
                            );
                        })
                    }
                    {emptyRows > 0 && (
                        <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
            )}
        </>  
    )
}