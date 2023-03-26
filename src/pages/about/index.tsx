import { Layout } from '@/components/Layout';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
export interface AboutProps { }

const About: React.FC<AboutProps> = () => {

	return (
		<>
			<Head>
				<title>Conócenos</title>
			</Head>
			<Layout>
				<div className="breadcrumb-option">
					<div className="container">
						<div className="row">
							<div className="col-lg-6 col-md-6 col-sm-6">
								<div className="breadcrumb__text">
									<h2>Acerca de nosotros</h2>
								</div>
							</div>
							<div className="col-lg-6 col-md-6 col-sm-6">
								<div className="breadcrumb__links">
									<Link href="/">Home</Link>
									<span>About</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<section className="about spad">
					<div className="container">
						<div className="row">
							<div className="col-lg-12">
								<div className="about__video set-bg" data-setbg="img/about-video.jpg">
									{/* <a href="https://www.youtube.com/watch?v=8PJ3_p7VqHw&list=RD8PJ3_p7VqHw&start_radio=1"
										className="play-btn video-popup"><i className="fa fa-play"></i></a> */}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-lg-6 col-md-6">
								<div className="about__text">
									<div className="section-title">
										<span>Acerca de Deleite</span>
										<h2>¡De mi horno a tu casa!</h2>
									</div>
									<p>Me llamo Lilian Zapien, me considero una mujer emprendedora, creativa y dispuesta a dar todo de mi cuanto algo me apasiona.
										Después de graduarme de la escuela, me comencé a enamorar de la cocina y pronto me di cuenta de que todo lo que quería hacer era crear pasteles.</p>
								</div>
							</div>
							<div className="col-lg-6 col-md-6">
								<div className="about__bar">
									<div className="about__bar__item">
										<p>Diseño</p>
										<div id="bar1" className="barfiller">
											<div className="tipWrap"><span className="tip"></span></div>
											<span className="fill" data-percentage="95"></span>
										</div>
									</div>
									<div className="about__bar__item">
										<p>Calidad</p>
										<div id="bar2" className="barfiller">
											<div className="tipWrap"><span className="tip"></span></div>
											<span className="fill" data-percentage="90"></span>
										</div>
									</div>
									<div className="about__bar__item">
										<p>Recetas</p>
										<div id="bar3" className="barfiller">
											<div className="tipWrap"><span className="tip"></span></div>
											<span className="fill" data-percentage="95"></span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="testimonial spad">
					<div className="container">
						<div className="row">
							<div className="col-lg-12 text-center">
								<div className="section-title">
									<span>Opiniones</span>
									<h2>Nuestros clientes dicen</h2>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="testimonial__slider owl-carousel">
								<div className="col-lg-6">
									<div className="testimonial__item">
										<div className="testimonial__author">
											<div className="testimonial__author__pic">
												<Image src="/img/testimonial/ta-1.jpg" alt="" width={70} height={70} />
											</div>
											<div className="testimonial__author__text">
												<h5>Kerry D.Silva</h5>
												<span>New york</span>
											</div>
										</div>
										<div className="rating">
											<span className="icon_star"></span>
											<span className="icon_star"></span>
											<span className="icon_star"></span>
											<span className="icon_star"></span>
											<span className="icon_star-half_alt"></span>
										</div>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
											ut labore et dolore magna aliqua viverra lacus vel facilisis.</p>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="testimonial__item">
										<div className="testimonial__author">
											<div className="testimonial__author__pic">
												<Image src="/img/testimonial/ta-2.jpg" alt="" width={70} height={70} />
											</div>
											<div className="testimonial__author__text">
												<h5>Kerry D.Silva</h5>
												<span>New york</span>
											</div>
										</div>
										<div className="rating">
											<span className="icon_star"></span>
											<span className="icon_star"></span>
											<span className="icon_star"></span>
											<span className="icon_star"></span>
											<span className="icon_star-half_alt"></span>
										</div>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
											ut labore et dolore magna aliqua viverra lacus vel facilisis.</p>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="testimonial__item">
										<div className="testimonial__author">
											<div className="testimonial__author__pic">
												<Image src="/img/testimonial/ta-1.jpg" alt="" width={70} height={70} />
											</div>
											<div className="testimonial__author__text">
												<h5>Ophelia Nunez</h5>
												<span>London</span>
											</div>
										</div>
										<div className="rating">
											<span className="icon_star"></span>
											<span className="icon_star"></span>
											<span className="icon_star"></span>
											<span className="icon_star"></span>
											<span className="icon_star-half_alt"></span>
										</div>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
											ut labore et dolore magna aliqua viverra lacus vel facilisis.</p>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="testimonial__item">
										<div className="testimonial__author">
											<div className="testimonial__author__pic">
												<Image src="/img/testimonial/ta-2.jpg" alt="" width={70} height={70} />
											</div>
											<div className="testimonial__author__text">
												<h5>Kerry D.Silva</h5>
												<span>New york</span>
											</div>
										</div>
										<div className="rating">
											<span className="icon_star"></span>
											<span className="icon_star"></span>
											<span className="icon_star"></span>
											<span className="icon_star"></span>
											<span className="icon_star-half_alt"></span>
										</div>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
											ut labore et dolore magna aliqua viverra lacus vel facilisis.</p>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="testimonial__item">
										<div className="testimonial__author">
											<div className="testimonial__author__pic">
												<Image src="/img/testimonial/ta-1.jpg" alt="" width={70} height={70} />
											</div>
											<div className="testimonial__author__text">
												<h5>Ophelia Nunez</h5>
												<span>London</span>
											</div>
										</div>
										<div className="rating">
											<span className="icon_star"></span>
											<span className="icon_star"></span>
											<span className="icon_star"></span>
											<span className="icon_star"></span>
											<span className="icon_star-half_alt"></span>
										</div>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
											ut labore et dolore magna aliqua viverra lacus vel facilisis.</p>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="testimonial__item">
										<div className="testimonial__author">
											<div className="testimonial__author__pic">
												<Image src="/img/testimonial/ta-2.jpg" alt="" width={70} height={70} />
											</div>
											<div className="testimonial__author__text">
												<h5>Kerry D.Silva</h5>
												<span>New york</span>
											</div>
										</div>
										<div className="rating">
											<span className="icon_star"></span>
											<span className="icon_star"></span>
											<span className="icon_star"></span>
											<span className="icon_star"></span>
											<span className="icon_star-half_alt"></span>
										</div>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
											ut labore et dolore magna aliqua viverra lacus vel facilisis.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="team spad">
					<div className="container">
						<div className="row">
							<div className="col-lg-7 col-md-7 col-sm-7">
								<div className="section-title">
									<span>Nuestro equipo</span>
									<h2>Dulces pasteleros </h2>
								</div>
							</div>
							<div className="col-lg-5 col-md-5 col-sm-5">
								<div className="team__btn">
									<a href="#" className="primary-btn">Únete al equipo</a>
								</div>
							</div>
						</div>
						<div className="row justify-content-center">
							<div className="col-lg-3  col-md-6 col-sm-6">
								<div className="team__item set-bg" data-setbg="img/team/foto-conoceme.png">
									<div className="team__item__text">
										<h6>Lilian Zapien</h6>
										<span>Pastelera</span>
										<div className="team__item__social">
											<a href="#"><i className="fa fa-facebook"></i></a>
											<a href="#"><i className="fa fa-twitter"></i></a>
											<a href="#"><i className="fa fa-instagram"></i></a>
											<a href="#"><i className="fa fa-youtube-play"></i></a>
										</div>
									</div>
								</div>
							</div>
							{/* <div className="col-lg-3  col-md-6 col-sm-6">
								<div className="team__item set-bg" data-setbg="img/team/team-2.jpg">
									<div className="team__item__text">
										<h6>Randy Butler</h6>
										<span>Decorater</span>
										<div className="team__item__social">
											<a href="#"><i className="fa fa-facebook"></i></a>
											<a href="#"><i className="fa fa-twitter"></i></a>
											<a href="#"><i className="fa fa-instagram"></i></a>
											<a href="#"><i className="fa fa-youtube-play"></i></a>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-3  col-md-6 col-sm-6">
								<div className="team__item set-bg" data-setbg="img/team/team-3.jpg">
									<div className="team__item__text">
										<h6>Randy Butler</h6>
										<span>Decorater</span>
										<div className="team__item__social">
											<a href="#"><i className="fa fa-facebook"></i></a>
											<a href="#"><i className="fa fa-twitter"></i></a>
											<a href="#"><i className="fa fa-instagram"></i></a>
											<a href="#"><i className="fa fa-youtube-play"></i></a>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-3  col-md-6 col-sm-6">
								<div className="team__item set-bg" data-setbg="img/team/team-4.jpg">
									<div className="team__item__text">
										<h6>Randy Butler</h6>
										<span>Decorater</span>
										<div className="team__item__social">
											<a href="#"><i className="fa fa-facebook"></i></a>
											<a href="#"><i className="fa fa-twitter"></i></a>
											<a href="#"><i className="fa fa-instagram"></i></a>
											<a href="#"><i className="fa fa-youtube-play"></i></a>
										</div>
									</div>
								</div>
							</div> */}
						</div>
					</div>
				</section>
			</Layout>
		</>
	);
};

export default About;
