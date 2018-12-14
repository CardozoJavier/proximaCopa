import React from 'react';
import s from '../containers/NewCategoryContainer/styles.css'

export default () => {
    return (
        <div >
            <form action="" className={s.formCreateCategory}>
                <div >
                    <label htmlFor="Uva">Bodega:</label>
                    <input type="text" placeholder="Cellar"/>
                </div>
                <button >Agregar Bodega</button>
            </form>
        </div>
    )
}
