import React from 'react'

function ConfigAdvanced(props) {

    const { isConfigActive, ...rest } = props;

    const getClassNameConfig = () => {
        if (isConfigActive){
            return "slide-form-checkbox";
        }else{
            return "slide-form-checkbox hide";
        }
    }

    return (
        <div className={getClassNameConfig()} onClick={(event) => props.onClick(event)}>
            <div className="checkbox">
                <h2>Acceso al sistema</h2>
                <input type="checkbox" name="checkbox" id="default-config" checked/>
                <label htmlFor="default-config">Predeterminado</label>

                <input type="checkbox" name="checkbox" id="manager-config" required/>
                <label htmlFor="manager-config">Gerente</label>

                <input type="checkbox" name="checkbox" id="admin-config" required/>
                <label htmlFor="admin-config">Administrador</label>

                <h1>Tarifas</h1>
                <input type="checkbox" name="checkbox" id="Ejemplo1" checked/>
                <label htmlFor="Ejemplo1">Sombrillas</label>

                <input type="checkbox" name="checkbox" id="Ejemplo2" required/>
                <label htmlFor="Ejemplo2">Descuentos</label>

                <input type="checkbox" name="checkbox" id="Ejemplo3" checked/>
                <label htmlFor="Ejemplo3">Facturas</label>

                <h1>Usuarios</h1>
                <input type="checkbox" name="checkbox" id="Ejemplo4" required/>
                <label htmlFor="Ejemplo4">Agregar</label>

                <input type="checkbox" name="checkbox" id="Ejemplo5" checked/>
                <label htmlFor="Ejemplo5">Modificar</label>

                <input type="checkbox" name="checkbox" id="Ejemplo6" required/>
                <label htmlFor="Ejemplo6">Eliminar</label>
            </div>
        </div>
    )
}

export default ConfigAdvanced
