import { Layout } from '@/components/Layout';
import { selectCartState } from '@/features/slices/cartSlice';
import Head from 'next/head';
import Link from 'next/link';
import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
export interface CheckoutProps { }

const Checkout: React.FC<CheckoutProps> = () => {
	// const [cart, setCart] = useState<any>();
	const [cartTotal, setCartTotal] = useState<number>(0);

	const cartState = useSelector(selectCartState);

	useEffect(() => {
		let totalPrice = 0;
		cartState.forEach(p => {
			if (p.product.price) totalPrice += (p.product.price * p.qty);
		});
		setCartTotal(totalPrice);
	}, [cartState]);

	return (
		<>
			<Head>
				<title>Detalles de cotización</title>
			</Head>
			<Layout>
				<div className="breadcrumb-option">
					<div className="container">
						<div className="row">
							<div className="col-lg-6 col-md-6 col-sm-6">
								<div className="breadcrumb__text">
									<h2>Detalles de cotización</h2>
								</div>
							</div>
							<div className="col-lg-6 col-md-6 col-sm-6">
								<div className="breadcrumb__links">
									<Link href="/">Inicio</Link>
									<span>Detalles de cotización</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<section className="checkout spad">
					<div className="container">
						<div className="checkout__form">
							<form action="#">
								<div className="row">
									<div className="col-lg-8 col-md-6">
										{/* <h6 className="coupon__code"><span className="icon_tag_alt"></span> Have a coupon? <a href="#">Click
											here</a> to enter your code</h6> */}
										<h6 className="checkout__title">Información personal</h6>
										<div className="row">
											<div className="col-lg-6">
												<div className="checkout__input">
													<p>Nombre<span>*</span></p>
													<input type="text" />
												</div>
											</div>
											<div className="col-lg-6">
												<div className="checkout__input">
													<p>Apellido<span>*</span></p>
													<input type="text" />
												</div>
											</div>
										</div>
										{/* <div className="checkout__input">
											<p>Country<span>*</span></p>
											<input type="text" />
										</div> */}
										<div className="checkout__input">
											<p>Dirección<span>*</span></p>
											<input type="text" placeholder="Dirección" className="checkout__input__add" />
											<input type="text" placeholder="Departamento, suite, unite ect (opcional)" />
										</div>
										<div className="checkout__input">
											<p>Ciudad<span>*</span></p>
											<input type="text" />
										</div>
										{/* <div className="checkout__input">
											<p>Country/State<span>*</span></p>
											<input type="text" />
										</div> */}
										<div className="checkout__input">
											<p>Código postal<span>*</span></p>
											<input type="text" />
										</div>
										<div className="row">
											<div className="col-lg-6">
												<div className="checkout__input">
													<p>Celular<span>*</span></p>
													<input type="text" />
												</div>
											</div>
											<div className="col-lg-6">
												<div className="checkout__input">
													<p>Correo<span>*</span></p>
													<input type="text" />
												</div>
											</div>
										</div>
										{/* <div className="checkout__input__checkbox">
											<label htmlFor="acc">
												Create an account?
												<input type="checkbox" id="acc" />
												<span className="checkmark"></span>
											</label>
											<p>Create an account by entering the information below. If you are a returning customer
												please login at the top of the page</p>
										</div> */}
										{/* <div className="checkout__input">
											<p>Account Password<span>*</span></p>
											<input type="text" />
										</div> */}
										<div className="checkout__input__checkbox">
											<label htmlFor="diff-acc">
												Información adicional, detalles del pedido, detalles de entrega.
												<input type="checkbox" id="diff-acc" />
												<span className="checkmark"></span>
											</label>
										</div>
										<div className="checkout__input">
											<p>Detalles del pedido<span>*</span></p>
											<input type="text"
												placeholder="Información adicional, detalles del pedido, detalles de entrega." />
										</div>
									</div>
									<div className="col-lg-4 col-md-6">
										<div className="checkout__order">
											<h6 className="order__title">Su cotización</h6>
											<div className="checkout__order__products">Productos <span>Total</span></div>
											<ul className="checkout__total__products">
												{
													cartState.length > 0 && cartState.map((item, index) => {
														return (
															<li key={index}><samp>{numeral(index + 1).format("00")}.</samp> {item.product.name}<span>{item.product.price && numeral(item.product.price * item.qty).format("$0,0.00")}</span></li>
														)
													})
												}
											</ul>
											<ul className="checkout__total__all">
												{/* <li>Subtotal <span>$750.99</span></li> */}
												<li>Total <span>{numeral(cartTotal).format("$0,0.00")}</span></li>
											</ul>
											{/* <div className="checkout__input__checkbox">
												<label htmlFor="acc-or">
													Create an account?
													<input type="checkbox" id="acc-or" />
													<span className="checkmark"></span>
												</label>
											</div> */}
											<p>La información proporcionada y los productos solicitados no significan una compra, es únicamente una cotización para informar a la tienda de su interés por los productos.</p>
											{/* <div className="checkout__input__checkbox">
												<label htmlFor="payment">
													Check Payment
													<input type="checkbox" id="payment" />
													<span className="checkmark"></span>
												</label>
											</div>
											<div className="checkout__input__checkbox">
												<label htmlFor="paypal">
													Paypal
													<input type="checkbox" id="paypal" />
													<span className="checkmark"></span>
												</label>
											</div> */}
											<button type="submit" className="site-btn">COTIZAR</button>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</section>
			</Layout>
		</>
	);
};

export default Checkout;
