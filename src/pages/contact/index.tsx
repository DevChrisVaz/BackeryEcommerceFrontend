import { Layout } from '@/components/Layout';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
export interface ContactProps { };

const Contact: React.FC<ContactProps> = () => {
    return (
        <>
        <Head>
            <title>Contáctanos</title>
        </Head>
        <Layout>
            <section className="contact spad">
                <div className="container">
                    <div className="map">
                        {/* <div className="container">
                            <div className="row d-flex justify-content-center">
                                <div className="col-lg-4 col-md-7">
                                    <div className="map__inner">
                                        <h6>Mérida, Yucatán</h6>
                                        <ul>
                                            <li>Calle 123 No. 709 Cerrada Arboleda C.P 97314</li>
                                            <li>Sweetcake@support.com</li>
                                            <li>+1 800-786-1000</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className="map__iframe">
                            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10784.188505644011!2d19.053119335158936!3d47.48899529453826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1543907528304" height="300" style={{ border:0 }} allowFullScreen aria-hidden="false" tabIndex={0}></iframe> */}
                            <iframe src="https://www.google.com.mx/maps/embed?pb=!1m18!1m12!1m3!1d939.8240993739833!2d-89.70453841788654!3d20.981653061574032!2m3!1f0!2f19.000000000000007!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f560cb3c3a7a477%3A0xa16dfce83140372a!2sC.%20123%2C%2097314%20Yuc.!5e0!3m2!1sen!2smx!4v1648259286217!5m2!1sen!2smx"  height="300" style={{ border:0 }} allowFullScreen aria-hidden="false" tabIndex={0}></iframe>

                        </div>
                    </div>
                    <div className="contact__address">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="contact__address__item">
                                    <h6>Caucel, Yucatán</h6>
                                    <ul>
                                        <li>
                                            <span className="icon_pin_alt"></span>
                                            <p>calle 123 No. 709 Cerrada Arboleda C.P 97314</p>
                                        </li>
                                        <li><span className="icon_headphones"></span>
                                            <p>+52 999-389-3779</p>
                                        </li>
                                        <li><span className="icon_mail_alt"></span>
                                            <p>deleitelzt@gmail.com</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="contact__address__item">
                                    <h6>Los angeles</h6>
                                    <ul>
                                        <li>
                                            <span className="icon_pin_alt"></span>
                                            <p>639 S Spring St, Los Angeles, CA 90014, USA</p>
                                        </li>
                                        <li><span className="icon_headphones"></span>
                                            <p>+1 213-612-3000</p>
                                        </li>
                                        <li><span className="icon_mail_alt"></span>
                                            <p>Sweetcake@support.com</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="contact__address__item">
                                    <h6>san bernardino</h6>
                                    <ul>
                                        <li>
                                            <span className="icon_pin_alt"></span>
                                            <p>1000 Lakepoint Dr, Frisco, CO 80443, USA</p>
                                        </li>
                                        <li><span className="icon_headphones"></span>
                                            <p>+1 800-786-1000</p>
                                        </li>
                                        <li><span className="icon_mail_alt"></span>
                                            <p>Sweetcake@support.com</p>
                                        </li>
                                    </ul>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="contact__text">
                                <h3>Contáctanos</h3>
                                <ul style={{ visibility: "hidden" }}>
                                    <li>Representatives or Advisors are available:</li>
                                    <li>Mon-Fri: 5:00am to 9:00pm</li>
                                    <li>Sat-Sun: 6:00am to 9:00pm</li>
                                </ul>
                                <Image src="/img/cake-piece.png" alt="" width={88} height={100} />
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="contact__form">
                                <form action="#">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <input type="text" placeholder="Nombre" />
                                        </div>
                                        <div className="col-lg-6">
                                            <input type="text" placeholder="Correo" />
                                        </div>
                                        <div className="col-lg-12">
                                            <textarea placeholder="Mensaje"></textarea>
                                            <button type="submit" className="site-btn">Envíanos</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
        </>
    );
}

export default Contact;