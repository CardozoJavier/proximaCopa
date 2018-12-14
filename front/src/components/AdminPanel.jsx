import React from 'react';
import {Link} from 'react-router-dom';
import s from '../containers/AdminPanelContainer/style.css';

export default () => (
	<div className={s.sidebar}>
		<Link to='/newproduct'>
			<div>
				<p>Publicar vino</p>
				<hr/>
			</div>
		</Link>
		<Link to='/product/edit'>
			<div>
				<p>Edición de productos</p>
				<hr/>
			</div>
		</Link>
		<Link to='/newcategory'>
			<div>
				<p>Crear categorías</p>
				<hr/>
			</div>
		</Link>
		<Link to='/accounts'>
			<div>
				<p>Configuración de cuentas</p>
				<hr/>
			</div>
		</Link>
		<Link to='/orders'>
			<div>
				<p>Administración de órdenes</p>
				<hr/>
			</div>
		</Link>
	</div>
)