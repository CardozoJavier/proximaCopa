import React from 'react';
import {Link} from 'react-router-dom';
import s from '../containers/AdminPanelContainer/style.css';

export default ({ handleClick }) => (
	<div className={s.sidebar}>
		<Link to='/newproduct'>
				<p>Publicar vino</p>
				<hr/>
		</Link>
		<Link to='/product/edit'>
				<p>Edición de productos</p>
				<hr/>
		</Link>
		<Link to='/newcategory'>
				<p>Crear categorías</p>
				<hr/>
		</Link>
		<Link to='/accounts'>
				<p>Configuración de cuentas</p>
				<hr/>
		</Link>
		<Link to='/orders'>
				<p>Administración de órdenes</p>
				<hr/>
		</Link>
	</div>
)


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ---------------- Para corregir la forma en que redirecciono a las diferentes secciones del panel ---------------- 

// import React from 'react';
// import {Link} from 'react-router-dom';
// import s from '../containers/AdminPanelContainer/style.css';

// export default ({ handleClick }) => (
// 	<div className={s.sidebar}>
// 				<p onClick= { handleClick } className= { s.linked }>Publicar vino</p>
// 				<div className= { s.hr }><hr/></div>
// 				<p className= { s.linked }>Edición de productos</p>
// 				<div className= { s.hr }><hr/></div>
// 				<p className= { s.linked }>Crear categorías</p>
// 				<div className= { s.hr }><hr/></div>
// 				<p className= { s.linked }>Configuración de cuentas</p>
// 				<div className= { s.hr }><hr/></div>
// 				<p className= { s.linked }>Administración de órdenes</p>
// 				<div className= { s.hr }><hr/></div>
// 	</div>
// )