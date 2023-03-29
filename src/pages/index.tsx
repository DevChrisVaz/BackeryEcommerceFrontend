import Head from 'next/head';
import { Layout } from '@/components/Layout';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Comment from '@/domain/entities/Comment';
import CommentRepo from '@/infrastructure/implementations/httpRequest/axios/CommentRepo';
import GetPublicCommentsUseCase from '@/application/usecases/comment/GetPublicCommentsUseCase';
import { Comment as CommentComponent } from '@/components/Comment';
import Product from '@/domain/entities/Product';
import ProductRepo from '@/infrastructure/implementations/httpRequest/axios/ProductRepo';
import GetMostVisitedProductsUseCase from '@/application/usecases/product/GetMostVisitedProductsUseCase';
import { ProductPreview } from '@/components/ProductPreview';

export default function Home() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [mostVisitedProducts, setMostVisitedProducts] = useState<Product[]>([]);

  const commentRepo = new CommentRepo();
  const getPublicCommentsUseCase = new GetPublicCommentsUseCase(commentRepo);
  const productRepo = new ProductRepo();
  const getMostVisitedProductsUseCase = new GetMostVisitedProductsUseCase(productRepo);

  const getPublicComments = async () => {
    try {
      const { data, status } = await getPublicCommentsUseCase.run();
      if (status === 200 && data) setComments(data);
    } catch (err) {

    }
  }

  const getMostVisitedProducts = async () => {
    try {
      const { data, status } = await getMostVisitedProductsUseCase.run();
      if (status === 200 && data) setMostVisitedProducts(data);
    } catch (err) {

    }
  }

  // useEffect(() => {
  //   const jqueryBarfillerScript = document.createElement("script");
  //   jqueryBarfillerScript.src = "js/jquery.barfiller.js";
  //   jqueryBarfillerScript.async = true;
  //   document.body.appendChild(jqueryBarfillerScript);

  //   const jqueryMagnificPopUp = document.createElement("script");
  //   jqueryMagnificPopUp.src = "js/jquery.magnific-popup.min.js";
  //   jqueryMagnificPopUp.async = true;
  //   document.body.appendChild(jqueryMagnificPopUp);

  //   const jqueryNiceSelect = document.createElement("script");
  //   jqueryNiceSelect.src = "js/jquery.nice-select.min.js";
  //   jqueryNiceSelect.async = true;
  //   document.body.appendChild(jqueryNiceSelect);

  //   const jqueryNiceScroll = document.createElement("script");
  //   jqueryNiceScroll.src = "js/jquery.nicescroll.min.js";
  //   jqueryNiceScroll.async = true;
  //   document.body.appendChild(jqueryNiceScroll);

  //   const jquerySlickNav = document.createElement("script");
  //   jquerySlickNav.src = "js/jquery.slicknav.js";
  //   jquerySlickNav.async = true;
  //   document.body.appendChild(jquerySlickNav);

  //   const owlCarousel = document.createElement("script");
  //   owlCarousel.src = "js/owl.carousel.min.js";
  //   owlCarousel.async = true;
  //   document.body.appendChild(owlCarousel);

  //   const mainScript = document.createElement("script");
  //   mainScript.src = "js/main.js";
  //   mainScript.async = true;
  //   document.body.appendChild(mainScript);

  //   return () => {
  //     document.body.removeChild(jqueryBarfillerScript);
  //     document.body.removeChild(jqueryMagnificPopUp);
  //     document.body.removeChild(jqueryNiceSelect);
  //     document.body.removeChild(jqueryNiceScroll);
  //     document.body.removeChild(jquerySlickNav);
  //     document.body.removeChild(owlCarousel);
  //     document.body.removeChild(mainScript);
  //   }
  // }, []);

  useEffect(() => {
    getPublicComments();
    getMostVisitedProducts();
  }, []);

  return (
    <>
      <Head>
        <title>Deleite D&apos;Lillian</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <section className="hero">
          <div className="hero__slider owl-carousel">
            <div className="hero__item set-bg" data-setbg="img/hero/hero-1.jpg">
              <div className="container">
                <div className="row d-flex justify-content-center">
                  <div className="col-lg-8">
                    <div className="hero__text">
                      <h2>¡De mi horno a tu mesa!</h2>
                      <a href="#" className="primary-btn">Nuestros pasteles</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero__item set-bg" data-setbg="img/hero/hero-1.jpg">
              <div className="container">
                <div className="row d-flex justify-content-center">
                  <div className="col-lg-8">
                    <div className="hero__text">
                      <h2>¡Haciendo tu vida más dulce una mordida a la vez!</h2>
                      <a href="#" className="primary-btn">Nuestros pasteles</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="about spad">
          <div className="container">
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
											<span className=" data-percentage="95"></span>
										</div>
									</div>
									<div className="about__bar__item">
										<p>Calidad</p>
										<div id="bar2" className="barfiller">
											<div className="tipWrap"><span className="tip"></span></div>
											<span className=" data-percentage="90"></span>
										</div>
									</div>
									<div className="about__bar__item">
										<p>Recetas</p>
										<div id="bar3" className="barfiller">
											<div className="tipWrap"><span className="tip"></span></div>
											<span className=" data-percentage="95"></span>
										</div>
									</div>
								</div>
							</div>
						</div>
          </div>
        </section> */}
        <div className="categories">
          <div className="container">
            <div className="row">
              <div className="categories__slider owl-carousel">
                <div className="categories__item">
                  <div className="categories__item__icon">
                    <span className="flaticon-004-piece-of-cake"></span>
                    <h5>Brownies</h5>
                  </div>
                </div>
                <div className="categories__item">
                  <div className="categories__item__icon">
                    <span className="flaticon-031-cupcake-1"></span>
                    <h5>Cupcakes</h5>
                  </div>
                </div>
                <div className="categories__item">
                  <div className="categories__item__icon">
                    <span className="flaticon-038-cake-8"></span>
                    <h5>Gelatinas</h5>
                  </div>
                </div>
                <div className="categories__item">
                  <div className="categories__item__icon">
                    <span className="flaticon-005-pancake"></span>
                    <h5>Hot-Cakes</h5>
                  </div>
                </div>
                <div className="categories__item">
                  <div className="categories__item__icon">
                    <span className="flaticon-023-doughnut"></span>
                    <h5>Donas</h5>
                  </div>
                </div>
                <div className="categories__item">
                  <div className="categories__item__icon">
                    <span className="flaticon-050-cake"></span>
                    <h5>Pasteles</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          mostVisitedProducts.length > 0 &&
          <section className="product spad">
            <div className="container">
              <div className="row">
                {
                  mostVisitedProducts.map((product, index) => (
                    <ProductPreview key={index} product={product} />
                  ))
                }
              </div>
            </div>
          </section>
        }
        {/* <section className="class spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="class__form">
                  <div className="section-title">
                    <span>Síguenos en Tiktok</span>
                    <h2>Made from your <br />own hands</h2>
                    <blockquote
                        className="tiktok-embed"
                        cite="https://www.tiktok.com/@lillianzapientorr/video/7149195003825229061"
                        data-video-id="7149195003825229061"
                        style={{ maxWidth: "605px", minWidth: "325px" }}>
                        <section>
                          <a target="_blank" title="@lillianzapientorr" href="https://www.tiktok.com/@lillianzapientorr?refer=embed">@lillianzapientorr</a>
                          <a title="quesophiladelphia" target="_blank" href="https://www.tiktok.com/tag/quesophiladelphia?refer=embed">#quesophiladelphia</a>
                          <a title="parati" target="_blank" href="https://www.tiktok.com/tag/parati?refer=embed">#parati</a>
                          <a title="deleitelzt" target="_blank" href="https://www.tiktok.com/tag/deleitelzt?refer=embed">#Deleitelzt</a>
                          <a title="servdomicilio" target="_blank" href="https://www.tiktok.com/tag/servdomicilio?refer=embed">#servdomicilio</a>
                          <a title="fyp" target="_blank" href="https://www.tiktok.com/tag/fyp?refer=embed">#fyp</a>
                          <a target="_blank" title="♬ Tiempo De Vals - Chayanne" href="https://www.tiktok.com/music/Tiempo-De-Vals-223346608011354113?refer=embed">♬ Tiempo De Vals - Chayanne</a>
                        </section>
                      </blockquote>
                  </div>
                  <form action="#">
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Phone" />
                    <select>
                      <option value="">Studying Class</option>
                      <option value="">Writting Class</option>
                      <option value="">Reading Class</option>
                    </select>
                    <input type="text" placeholder="Type your requirements" />
                    <button type="submit" className="site-btn">registration</button>
                  </form>
                </div>
              </div>
            </div>
            <blockquote
              className="tiktok-embed"
              cite="https://www.tiktok.com/@lillianzapientorr/video/7179725951066983686"
              data-video-id="7179725951066983686"
              style={{ maxWidth: "605px", minWidth: "325px" }}>
              <section>
                <a target="_blank" title="@lillianzapientorr" href="https://www.tiktok.com/@lillianzapientorr?refer=embed">@lillianzapientorr</a>
                <a title="deleitelzt" target="_blank" href="https://www.tiktok.com/tag/deleitelzt?refer=embed">#Deleitelzt</a>
                <a title="servdom" target="_blank" href="https://www.tiktok.com/tag/servdom?refer=embed">#servdom</a>
                <a title="frutos" target="_blank" href="https://www.tiktok.com/tag/frutos?refer=embed">#frutos</a>
                <a title="parati" target="_blank" href="https://www.tiktok.com/tag/parati?refer=embed">#parati</a>
                <a title="fyp" target="_blank" href="https://www.tiktok.com/tag/fyp?refer=embed">#fyp</a>
                <a title="queso" target="_blank" href="https://www.tiktok.com/tag/queso?refer=embed">#queso</a>
                <a target="_blank" title="♬ sonido original - deleitelzt" href="https://www.tiktok.com/music/sonido-original-7179725949179562757?refer=embed">♬ sonido original - deleitelzt</a>
              </section>
            </blockquote>

            <div className="class__video set-bg" data-setbg="img/class-video.jpg">
              <a href="https://www.youtube.com/watch?v=8PJ3_p7VqHw&list=RD8PJ3_p7VqHw&start_radio=1"
                className="play-btn video-popup"><i className="fa fa-play"></i></a>
            </div>
          </div>
        </section> */}
        {/* <section className="team spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-7 col-sm-7">
                <div className="section-title">
                  <span>Our team</span>
                  <h2>Sweet Baker </h2>
                </div>
              </div>
              <div className="col-lg-5 col-md-5 col-sm-5">
                <div className="team__btn">
                  <a href="#" className="primary-btn">Join Us</a>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="team__item set-bg" data-setbg="img/team/team-1.jpg">
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
              <div className="col-lg-3 col-md-6 col-sm-6">
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
              <div className="col-lg-3 col-md-6 col-sm-6">
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
              <div className="col-lg-3 col-md-6 col-sm-6">
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
              </div>
            </div>
          </div>
        </section> */}
        {
          comments.length > 0 &&
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
                  {
                    comments.map((comment, index) => (
                      <div className="col-lg-6">
                        <CommentComponent key={index} comment={comment} />
                      </div>
                    ))
                  }
                  {/* <div className="col-lg-6">
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
                  </div> */}
                </div>
              </div>
            </div>
          </section>
        }
        <section className="instagram spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 p-0">
                <div className="instagram__text">
                  <div className="section-title">
                    <span>Síguenos en instagram</span>
                    <h2>Los momentos dulces se conservan como recuerdos.</h2>
                  </div>
                  <h5><i className="fa fa-instagram"></i> @deleitelzt</h5>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                    <div className="instagram__pic">
                      <Image src="/img/instagram/instagram1.jpg" alt="" width={240} height={240} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                    <div className="instagram__pic middle__pic">
                      <Image src="/img/instagram/instagram2.jpg" alt="" width={240} height={240} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                    <div className="instagram__pic">
                      <Image src="/img/instagram/instagram3.jpg" alt="" width={240} height={240} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                    <div className="instagram__pic">
                      <Image src="/img/instagram/instagram4.jpg" alt="" width={240} height={240} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                    <div className="instagram__pic middle__pic">
                      <Image src="/img/instagram/instagram5.jpg" alt="" width={240} height={240} />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                    <div className="instagram__pic">
                      <Image src="/img/instagram/instagram6.jpeg" alt="" width={240} height={240} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
