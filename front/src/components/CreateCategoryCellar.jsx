import React from 'react';
import s from '../containers/NewCategoryContainer/styles.css'

export default () => {
    return (
            <form className={s.formCreateCategory}>
                    <label htmlFor="Uva">Bodega:</label>
                    <input type="text" placeholder="Cellar"/>
                <button >Agregar Bodega</button>
            </form>
    )
}
