import { Layout } from '@/components/Layout';
import { selectCartState } from '@/features/slices/cartSlice';
import Head from 'next/head';
import Link from 'next/link';
import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Formik } from "formik";
import Quote from '@/domain/entities/Quote';
import QuoteErrors from '@/domain/entities/errors/QuoteErrors';
import QuoteRepo from '@/infrastructure/implementations/httpRequest/axios/QuoteRepo';
import CreateQuoteUseCase from '@/application/usecases/quote/CreateQuoteUseCase';
import QuoteValidationsRepo from '@/infrastructure/implementations/validations/QuoteValidationsRepo';
import { Router, useRouter } from 'next/router';
import CreateQuoteException from '@/domain/exceptions/quote-exceptions/CreateCategoryException';
export interface CheckoutProps { }

const Checkout: React.FC<CheckoutProps> = () => {
	const [cartTotal, setCartTotal] = useState<number>(0);
	const [initialValues, setInitialValues] = useState<Quote>({
		firstName: "",
		lastName: "",
		address: "",
		addressDetails: "",
		city: "",
		zip: "",
		email: "",
		phone: "",
		details: "",
		products: []
	});
	const [errors, setErrors] = useState<QuoteErrors>({
	});

	const router = useRouter();
	const cartState = useSelector(selectCartState);

	const quoteRepo = new QuoteRepo();
	const quoteValidationsRepo = new QuoteValidationsRepo();
	const createQuoteUseCase = new CreateQuoteUseCase(quoteRepo, quoteValidationsRepo);

	const submitCheckoutForm = async (values: Quote) => {
		try {
			const { status } = await createQuoteUseCase.run(values);
			if (status === 201) {
				// await setToastOptions({
				// 	message: "Usuario creado con éxito",
				// 	type: "success"
				// });
				// showResponseToast();
				// navigate(-1);
				router.push("/");
			}
		} catch(err: any) {
			if (err instanceof CreateQuoteException && err.cause) setErrors(err.cause);
			alert("No se pudo solicitar la cotización");
		}
	}

	useEffect(() => {
		let totalPrice = 0;
		let products: any = [];
		cartState.forEach(p => {
			if (p.product.price) totalPrice += (p.product.price * p.qty);
			if (p.product.uuid) products.push({
				product: p.product.uuid,
				qty: p.qty
			});
		});
		setCartTotal(totalPrice);
		setInitialValues({
			...initialValues,
			products
		})
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
						{ Object.keys(errors).length > 0 && <div className="alert alert-danger" role="alert">Los campos con el * son obligatorios.</div> }
						<div className="checkout__form">
							<Formik
								initialValues={initialValues}
								onSubmit={submitCheckoutForm}
								enableReinitialize={true}
							>
								{({
									values,
									handleChange,
									handleSubmit
								}) => (
									<form onSubmit={handleSubmit}>
										<div className="row">
											<div className="col-lg-8 col-md-6">
												{/* <h6 className="coupon__code"><span className="icon_tag_alt"></span> Have a coupon? <a href="#">Click
												here</a> to enter your code</h6> */}
												<h6 className="checkout__title">Información personal</h6>
												<div className="row">
													<div className="col-lg-6">
														<div className="checkout__input">
															<p>Nombre<span>*</span></p>
															<input
																type="text"
																id="firstName"
																name='firstName'
																value={values.firstName}
																onChange={handleChange}
															/>
															{ errors.firstName && <div className="invalid-feedback">{errors.firstName}.</div> }
														</div>
													</div>
													<div className="col-lg-6">
														<div className="checkout__input">
															<p>Apellido<span>*</span></p>
															<input
																type="text"
																id="lastName"
																name='lastName'
																value={values.lastName}
																onChange={handleChange}
															/>
														</div>
													</div>
												</div>
												{/* <div className="checkout__input">
												<p>Country<span>*</span></p>
												<input type="text" />
											</div> */}
												<div className="checkout__input">
													<p>Dirección<span>*</span></p>
													<input
														type="text"
														placeholder="Dirección"
														id="address"
														name='address'
														value={values.address}
														onChange={handleChange}
													/>
													<input
														type="text"
														placeholder="Departamento, suite, unite ect (Opcional)."
														id="addressDetails"
														name='addressDetails'
														value={values.addressDetails}
														onChange={handleChange}
													/>
												</div>
												<div className="checkout__input">
													<p>Ciudad<span>*</span></p>
													<input
														type="text"
														id="city"
														name='city'
														value={values.city}
														onChange={handleChange}
													/>
												</div>
												{/* <div className="checkout__input">
												<p>Country/State<span>*</span></p>
												<input type="text" />
											</div> */}
												<div className="checkout__input">
													<p>Código postal<span>*</span></p>
													<input
														type="text"
														id="zip"
														name='zip'
														value={values.zip}
														onChange={handleChange}
													/>
												</div>
												<div className="row">
													<div className="col-lg-6">
														<div className="checkout__input">
															<p>Celular<span>*</span></p>
															<input
																type="text"
																id="phone"
																name="phone"
																value={values.phone}
																onChange={handleChange}
															/>
														</div>
													</div>
													<div className="col-lg-6">
														<div className="checkout__input">
															<p>Correo<span>*</span></p>
															<input
																type="text"
																id="email"
																name="email"
																value={values.email}
																onChange={handleChange}
															/>
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
												{/* <div className="checkout__input__checkbox">
													<label htmlFor="diff-acc">
														Información adicional, detalles del pedido, detalles de entrega.
														<input type="checkbox" id="diff-acc" />
														<span className="checkmark"></span>
													</label>
												</div> */}
												<div className="checkout__input">
													<p>Detalles del pedido</p>
													<input
														type="text"
														placeholder="Información adicional, detalles del pedido, detalles de entrega (Opcional)."
														style={{ marginBottom: "0" }}
														id="details"
														name='details'
														value={values.details}
														onChange={handleChange}
													/>
													<small className="form-text text-muted">Los detalles extra podrían significar un aumento en el costo del producto.</small>
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
																	<li key={index}><samp>{numeral(index + 1).format("00")}.</samp> {item.product.name} <b>x{item.qty}</b><span>{item.product.price && numeral(item.product.price * item.qty).format("$0,0.00")}</span></li>
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
													<p>La información proporcionada y los productos solicitados no suponen una compra,
														es únicamente una cotización para informar a la tienda de su interés por los
														productos.</p>
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
								)}
							</Formik>
						</div>
					</div>
				</section>
			</Layout>
		</>
	);
};

export default Checkout;
