import React from 'react';
import s from '../containers/NewCategoryContainer/styles.css'

export default () => {
    return (
            <form className={s.formCreateCategory}>
                    <label htmlFor="linea">Linea:</label>
                    <input type="text" placeholder="bodega"/>
                <button >Agregar Linea</button>
            </form>
    )
}
