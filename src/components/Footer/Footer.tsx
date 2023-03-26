import Link from 'next/link';
import React from 'react';
export interface FooterProps { }

const Footer: React.FC<FooterProps> = () => {
	return (
		<footer className="footer set-bg" data-setbg="img/footer-bg.jpg">
			<div className="container">
				<div className="row">
					<div className="col-lg-4 col-md-6 col-sm-6">
						<div className="footer__widget">
							<h6>Horario</h6>
							<ul>
								<li>Lunes - Viernes: 08:00 am – 08:30 pm</li>
								<li>Sábado: 10:00 am – 16:30 pm</li>
								<li>Domingo: 10:00 am – 16:30 pm</li>
							</ul>
						</div>
					</div>
					<div className="col-lg-4 col-md-6 col-sm-6">
						<div className="footer__about">
							<div className="footer__logo">
								<a href="#"><img src="img/logos/logo-deleite-pastel.png" alt="" /></a>
							</div>
							<p>¡De mi horno a tu casa!</p>
							<div className="footer__social">
								<a href="https://www.facebook.com/deleitemerida/" target="_blank"><i className="fa fa-facebook"></i></a>
								<a href="https://wa.me/9993893779" target="_blank"><i className="fa fa-whatsapp"></i></a>
								<a href="https://www.instagram.com/deleitelzt/" target="_blank"><i className="fa fa-instagram"></i></a>
								<a href="https://www.tiktok.com/@lillianzapientorr" target="_blank"><i className="bi bi-tiktok"></i></a>
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-md-6 col-sm-6">
						<div className="footer__newslatter">
							<h6>Suscríbete</h6>
							<p>No te pierdas nuestras novedades y ofertas.</p>
							<form action="#">
								<input type="text" placeholder="Correo" />
									<button type="submit"><i className="fa fa-send-o"></i></button>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className="copyright">
				<div className="container">
					<div className="row">
						<div className="col-lg-7">
							<p className="copyright__text text-white">
								{/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
								Copyright &copy;{new Date().getFullYear()} Todos los derechos reservados | This template is made with <i className="fa fa-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
								{/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
							</p>
						</div>
						<div className="col-lg-5">
							<div className="copyright__widget">
								<ul>
									<li><a href="#">Política de privacidad</a></li>
									<li><a href="#">Términos y condiciones</a></li>
									<li><Link href="/shop">Tienda</Link></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
