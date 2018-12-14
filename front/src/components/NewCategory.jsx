import React from 'react';
import s from '../containers/NewCategoryContainer/styles.css'

export default ({handleClickSelect}) => {
    return (
        <div className={s.containerCategorias}>
            <div className={s.botones} >
                <button onClick={() => handleClickSelect('bodega')}>Agregar Bodega</button>
                <button onClick={() => handleClickSelect('linea')}>Agregar Linea</button>
                <button onClick={() => handleClickSelect('uva')}>Agregar Uva</button>
            </div>
        </div>
    )
}
