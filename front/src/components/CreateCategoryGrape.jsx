import React from 'react';
import s from '../containers/NewCategoryContainer/styles.css'

export default ({handleSubmit,handleChange}) => {
    return (
        <div >
            <form className={s.formCreateCategory}>
                <div >
                    <label htmlFor="Uva">Uva:</label>
                    <input type="text"  placeholder="Uva" onChange={(evt) => handleChange(evt)}/>
                </div>
                <button onClick={(e) => handleSubmit(e)}>Agregar Uva</button>
            </form>
        </div>
    )
}
