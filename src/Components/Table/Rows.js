import React from 'react';

//Components
//External
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

//Internal
import Row from './Row.js';
import RowForm from './RowForm.js';
import RowFormRent from './RowFormRent';
import RowFormEgresos from './RowFormEgresos'; //Abstraccion con el de abajo ( posible )
import RowFormIngresos from './RowFormIngresos';


export default function Rows(props) {

    const { rows, page, rowsPerPage, selected, adding, handleAdding, title, addRow, modifyRow, ...rest } = props;

    const isSelected = (name) => {
    
        return selected.indexOf(name) !== -1;
    }
    
    const names = Object.keys(rows[0]);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, (rows.length - page) * rowsPerPage);
    
    const switchRender = () => { 
        switch(title){
            case 'Alquileres':
                return(<RowFormRent addRow={addRow} selected={selected} modifyRow={modifyRow} handleAdding={handleAdding} title={title} clientsData = {props.clientsData} placesData = {props.placesData} pricesData = {props.pricesData} handleData = {props.handleData}  />)
            break;
            
            case 'Clientes' :
                return (<RowForm names={names} addRow={addRow} selected={selected} modifyRow={modifyRow} handleAdding={handleAdding} title={title} />)
            break;

            case 'Egresos' :
                return (<RowFormEgresos names={names} addRow={addRow} selected={selected} modifyRow={modifyRow} handleAdding={handleAdding} title={title} />)
            break;

            case 'Ingresos' :
                return (<RowFormIngresos names={names} addRow={addRow} selected={selected} modifyRow={modifyRow} handleAdding={handleAdding} title={title} />)
            break;

            default: break;
        }
    }

    return (
        <>
            
            {adding ? (
                switchRender()
            ) : (
                <TableBody>
                    {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => { 

                            const isItemSelected = isSelected(row);
                            return (
                                <Row
                                    row={row}
                                    index={index + rowsPerPage * page}
                                    handleClick={props.handleClick}
                                    isItemSelected={isItemSelected}
                                    names={names}
                                    key={index}
                                    id={index}
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