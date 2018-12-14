import React from 'react';
import s from '../containers/Sidebar/styles.css'
// import {Checkbox, CheckboxGroup} from 'react-checkbox-group';


export default props => {
    return (
        <div id={s.navbarLeft}>
            <div className={s.flotando}>
                <br></br>
                <h2>Filtrar por:</h2>

                <ul className={s.filtros}>
                <h3>Bodega</h3>
                <li onClick={(e) => props.filterProduct('bodega=' + e.target.value)}><input type="checkbox" value="Salentein"/>Salentein</li>
                <li onClick={(e) => props.filterProduct('bodega=' + e.target.value)}><input type="checkbox" value="Finca Las Moras"/>Finca Las Moras</li>
                <li onClick={(e) => props.filterProduct('bodega=' + e.target.value)}><input type="checkbox" value="Rutini"/>Rutini</li>
                <li onClick={(e) => props.filterProduct('bodega=' + e.target.value)}><input type="checkbox" value="Catena Zapata"/>Catena Zapata</li>
                </ul>
                <ul className={s.filtros}>
                <h3>Marca</h3>
                <li>Altitud</li>
                <li>Barrandica</li>
                <li>Desierto 25</li>
                </ul>
                <ul className={s.filtros}>
                <h3>Uva</h3>
                <li>Malbec</li>
                <li>Cabernet Sauvignon</li>
                <li>Merlot</li>
                </ul>
                <ul className={s.filtros}>
                    <h3>Rango de precios</h3>
                    <li>Hasta 150</li>
                    <li>150 - 300</li>
                    <li>301 - 500</li>
                    <li>501 - 2000</li>
                    <li>Más de 2000</li>
                </ul>
                <ul className={s.filtros}>
                    <h3>Año</h3>
                    <li>0-2 años</li>
                    <li>2-5 años</li>
                    <li>5-10 años</li>
                    <li>Más de 10 años</li>
                </ul>
            </div>
        </div> 
    )
}



