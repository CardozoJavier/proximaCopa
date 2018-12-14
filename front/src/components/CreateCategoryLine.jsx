import React from 'react';
import s from '../containers/NewCategoryContainer/styles.css'

export default () => {
    return (
        <div >
            <form action="" className={s.formCreateCategory}>
                <div >
                    <label htmlFor="linea">Linea:</label>
                    <input type="text" placeholder="bodega"/>
                </div>
                <button >Agregar Linea</button>
            </form>
        </div>
    )
}
