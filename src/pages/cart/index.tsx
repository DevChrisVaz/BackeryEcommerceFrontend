import { Layout } from '@/components/Layout';
import Product from '@/domain/entities/Product';
import { decreaseProductQty, increaseProductQty, removeItem, selectCartState } from '@/features/slices/cartSlice';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
export interface CartProps { }

const Cart: React.FC<CartProps> = () => {
	const [cartTotal, setCartTotal] = useState<number>(0);

	const router = useRouter();
	const dispatch = useDispatch();
	const cart = useSelector(selectCartState);

	const handleRemoveFromCart = (productId: string) => {
		dispatch(removeItem(productId));
	}

	const handleIncreaseQty = (productId: string) => {
		dispatch(increaseProductQty(productId));
	}

	const handleDecreaseQty = (productId: string) => {
		dispatch(decreaseProductQty(productId));
	}

	useEffect(() => {
		let totalPrice: number = 0;
		cart.forEach(p => {
			if (p.product.price) totalPrice += (p.product.price * p.qty);
		});
		setCartTotal(totalPrice);
	}, [cart]);

	return (
		<>
			<Head>
				<title>Carrito</title>
			</Head>
			<Layout>
				<div className="breadcrumb-option">
					<div className="container">
						<div className="row">
							<div className="col-lg-6 col-md-6 col-sm-6">
								<div className="breadcrumb__text">
									<h2>Carrito</h2>
								</div>
							</div>
							<div className="col-lg-6 col-md-6 col-sm-6">
								<div className="breadcrumb__links">
									<Link href="/">Inicio</Link>
									<span>Carrito</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<section className="shopping-cart spad">
					<div className="container">
						<div className="row">
							<div className="col-lg-8">
								<div className="shopping__cart__table">
									<table>
										<thead>
											<tr>
												<th>Producto</th>
												<th>Cantidad</th>
												<th>Total</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{
												cart.length > 0 &&
												cart.map((item, index) => {
													return (
														<tr key={index}>
															<td className="product__cart__item">
																<div className="product__cart__item__pic">
																	<img src="img/shop/cart/cart-1.jpg" alt="" />
																</div>
																<div className="product__cart__item__text">
																	<h6 onClick={() => router.push("/product-details?id=" + item.product.uuid)}>{item.product.name}</h6>
																	<h5>{numeral(item.product.price).format("$0,0.00")}</h5>
																</div>
															</td>
															<td className="quantity__item">
																<div className="quantity">
																	<div className="pro-qty">
																		<span
																			className="dec qtybtn"
																			onClick={() => item.qty === 1 ? handleRemoveFromCart(item.product.uuid ?? "") : handleDecreaseQty(item.product.uuid ?? "")}
																		>{item.qty === 1 ? <i className="bi bi-trash" style={{ fontSize: "12px" }} /> : "-"}</span>
																		<input type="text" value={item.qty} />
																		<span className="inc qtybtn" onClick={() => handleIncreaseQty(item.product.uuid ?? "")}>+</span>
																	</div>
																</div>
															</td>
															<td className="cart__price">{item.product.price && numeral(item.product.price * item.qty).format("$0,0.00")}</td>
															<td className="cart__close"><span className="icon_close"></span></td>
															|											</tr>
													)
												})
											}
										</tbody>
									</table>
								</div>
								<div className="row">
									<div className="col-lg-6 col-md-6 col-sm-6">
										<div className="continue__btn">
											<Link href="/shop">Continuar comprando</Link>
										</div>
									</div>
									<div className="col-lg-6 col-md-6 col-sm-6" style={{ visibility: "hidden" }}>
										<div className="continue__btn update__btn">
											<a href="#"><i className="fa fa-spinner"></i> Update cart</a>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="cart__discount">
									<h6>Código promocional</h6>
									<form action="#">
										<input type="text" placeholder="Cupón" />
										<button type="submit">Aplicar</button>
									</form>
								</div>
								<div className="cart__total">
									<h6>Cart total</h6>
									<ul>
										<li>Subtotal <span>{numeral(cartTotal).format("$0,0.00")}</span></li>
										<li>Total <span>{numeral(cartTotal).format("$0,0.00")}</span></li>
									</ul>
									<Link href="/checkout" className="primary-btn">Proceder al pago</Link>
								</div>
							</div>
						</div>
					</div>
				</section>
			</Layout>
		</>
	)
};

export default Cart;
