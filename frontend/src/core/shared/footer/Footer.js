import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { userSession } from './../../../commons/config';

class Footer extends Component {
	render() {
		return (
			<footer id="footer">
				<div className="footer-top">
					<div className="container">
						<div className="row">

							<div className="col-lg-4 col-md-6">
								<div className="footer-info">
									<h3>Tienda Stripe</h3>
									<p className="pb-3"><em>Tienda stripe de prueba</em></p>
								</div>
							</div>

							<div className="col-lg-4 col-md-6 footer-links">
								<h4>URL Útiles</h4>
								<ul>
									<li><i className="bx bx-chevron-right"></i><Link to='/home'>Home</Link></li>
									<li><i className="bx bx-chevron-right"></i><Link to='/tienda/Sin filtros'>Tienda</Link></li>
									{
										userSession !== null ?
											<>
												<li><i className="bx bx-chevron-right"></i><Link to='/dashboard/user/profile'>Perfil</Link></li>
											</>
										:
										<>
											<li><i className="bx bx-chevron-right"></i><Link to='/login'>Iniciar sesión</Link></li>
											<li><i className="bx bx-chevron-right"></i><Link to='/login/signup'>Crear cuenta</Link></li>
										</>
									}
								</ul>
							</div>

							<div className="col-lg-4 col-md-6 footer-links">
								<h4>Nuestras cuentas</h4>
								<ul>
									<li><i className="bx bx-chevron-right"></i><Link to='https://github.com/junex10'>Github</Link></li>
								</ul>
							</div>

						</div>
					</div>
				</div>

				<div className="container">
					<div className="copyright">
						&copy; Copyright <strong><span>Junex10</span></strong>. Derechos reservados
					</div>
				</div>
			</footer>
		);
	}
}

export default Footer;