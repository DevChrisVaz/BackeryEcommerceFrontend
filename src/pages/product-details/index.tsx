import GetProductByIdUseCase from '@/application/usecases/product/GetProductByIdUseCase';
import { Layout } from '@/components/Layout';
import Product from '@/domain/entities/Product';
import ProductRepo from '@/infrastructure/implementations/httpRequest/axios/ProductRepo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import numeral from "numeral";
import IncreaseProductViewsUseCase from '@/application/usecases/product/IncreaseProductViewsUseCase';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, decreaseProductQty, increaseProductQty, removeItem, selectCartState } from '@/features/slices/cartSlice';
export interface ProductDetailsProps { }

// function getServerSideProps(context: any) {
// 	const id
// }

const ProductDetails: React.FC<ProductDetailsProps> = () => {
	const [product, setProduct] = useState<Product>();
	const [loading, setLoading] = useState<boolean>(true);

	const productRepo = new ProductRepo();
	const getProductByIdUseCase = new GetProductByIdUseCase(productRepo);
	const increaseProductViewsUseCase = new IncreaseProductViewsUseCase(productRepo);

	const bigImgRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const dispatch = useDispatch();
	const cart = useSelector(selectCartState);

	const { id } = router.query;

	const handleIncreaseQty = () => {
		dispatch(increaseProductQty(product?.uuid));
	}

	const handleDecreaseQty = () => {
		dispatch(decreaseProductQty(product?.uuid));
	}

	const handleAddToCart = () => {
		dispatch(addItem(product));
	}

	const handleRemoveFromCart = () => {
		dispatch(removeItem(product?.uuid));
	}

	const isInCart = (): boolean => {
		if (cart.find(i => i.product.uuid === product?.uuid)?.qty) return true;
		return false;
	}

	const getProduct = async () => {
		try {
			setLoading(true);
			if (id) {
				const { data, status } = await getProductByIdUseCase.run(Array.isArray(id) ? id[0] : id);
				if (status === 200) {
					setProduct(data);
					console.log(data)
					await increaseProductViewsUseCase.run(Array.isArray(id) ? id[0] : id);
				}
				setLoading(false);
			} else {
				throw new Error("No se proporcionó un id");
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}

	useEffect(() => {
		getProduct();
	}, [id]);

	return loading ? <span>Loading...</span> : (
		<>
			<Head>
				<title>{product?.name}</title>
			</Head>
			<Layout>
				<div className="breadcrumb-option">
					<div className="container">
						<div className="row">
							<div className="col-lg-6 col-md-6 col-sm-6">
								<div className="breadcrumb__text">
									<h2>Detalles del producto</h2>
								</div>
							</div>
							<div className="col-lg-6 col-md-6 col-sm-6">
								<div className="breadcrumb__links">
									<Link href="/">Inicio</Link>
									<Link href="/shop">Tienda</Link>
									<span>{product?.name}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<section className="product-details spad">
					<div className="container">
						<div className="row">
							<div className="col-lg-6">
								<div className="product__details__img">
									<div className="product__details__big__img" ref={bigImgRef}>
										<img className="big_img" src={"http://localhost:5000/" + product?.images[0]} alt="" />
									</div>
									<div className="product__details__thumb">
										{
											product?.images.length > 0 &&
											product?.images.map((image: string, index: number) => (
												<div key={index} className="pt__item active">
													<img data-imgbigurl={"http://localhost:5000/" + image}
														src={"http://localhost:5000/" + image} alt="" />
												</div>
											))
										}
									</div>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="product__details__text">
									<div className="product__label">{product?.categoryRef.name}</div>
									<h4>{product?.name}</h4>
									<h5>{numeral(product?.price).format("$0,0.00")}</h5>
									<p>{product?.description}</p>
									<ul>
										<li>SKU: <span>17</span></li>
										<li>Category: <span>Biscuit cake</span></li>
										<li>
											Tags: <span>{
												product?.tagsRef && product?.tagsRef.length > 0 && product?.tagsRef.map((tag, index) => {
													return <span key={index}>{(tag.name ?? "") + (index !== product?.tagsRef.length - 1 ? ", " : "")}</span>
												}
												)}</span>
										</li>
									</ul>
									<div className="product__details__option">
										{
											!isInCart() ?
												<a onClick={handleAddToCart} className="primary-btn" style={{ cursor: "pointer" }}>Añadir al carrito</a>
												:
												<>
													<div className="quantity">
														<div className="pro-qty">
															<span 
																className="dec qtybtn" 
																onClick={cart.find(i => i.product.uuid === product?.uuid)?.qty === 1 ? handleRemoveFromCart : handleDecreaseQty}
															>{cart.find(i => i.product.uuid === product?.uuid)?.qty === 1 ? <i className="bi bi-trash" style={{ fontSize: "12px" }} /> : "-" }</span>
															<input type="text" value={cart.find(i => i.product.uuid === product?.uuid)?.qty} />
															<span className="inc qtybtn" onClick={handleIncreaseQty}>+</span>
														</div>
													</div>
													<a onClick={handleRemoveFromCart} className="danger-btn" style={{ cursor: "pointer" }}>Quitar del carrito</a>
												</>
										}
										<a href="#" className="heart__btn"><span className="icon_heart_alt"></span></a>
									</div>
								</div>
							</div>
						</div>
						<div className="product__details__tab">
							<div className="col-lg-12">
								<ul className="nav nav-tabs" role="tablist">
									<li className="nav-item">
										<a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">Description</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab">Additional information</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Previews(1)</a>
									</li>
								</ul>
								<div className="tab-content">
									<div className="tab-pane active" id="tabs-1" role="tabpanel">
										<div className="row d-flex justify-content-center">
											<div className="col-lg-8">
												<p>This delectable Strawberry Pie is an extraordinary treat filled with sweet and
													tasty chunks of delicious strawberries. Made with the freshest ingredients, one
													bite will send you to summertime. Each gift arrives in an elegant gift box and
													arrives with a greeting card of your choice that you can personalize online!</p>
											</div>
										</div>
									</div>
									<div className="tab-pane" id="tabs-2" role="tabpanel">
										<div className="row d-flex justify-content-center">
											<div className="col-lg-8">
												<p>This delectable Strawberry Pie is an extraordinary treat filled with sweet and
													tasty chunks of delicious strawberries. Made with the freshest ingredients, one
													bite will send you to summertime. Each gift arrives in an elegant gift box and
													arrives with a greeting card of your choice that you can personalize online!2
												</p>
											</div>
										</div>
									</div>
									<div className="tab-pane" id="tabs-3" role="tabpanel">
										<div className="row d-flex justify-content-center">
											<div className="col-lg-8">
												<p>This delectable Strawberry Pie is an extraordinary treat filled with sweet and
													tasty chunks of delicious strawberries. Made with the freshest ingredients, one
													bite will send you to summertime. Each gift arrives in an elegant gift box and
													arrives with a greeting card of your choice that you can personalize online!3
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="related-products spad">
					<div className="container">
						<div className="row">
							<div className="col-lg-12 text-center">
								<div className="section-title">
									<h2>Related Products</h2>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="related__products__slider owl-carousel">
								<div className="col-lg-3">
									<div className="product__item">
										<div className="product__item__pic set-bg" data-setbg="img/shop/product-1.jpg">
											<div className="product__label">
												<span>Cupcake</span>
											</div>
										</div>
										<div className="product__item__text">
											<h6><a href="#">Dozen Cupcakes</a></h6>
											<div className="product__item__price">$32.00</div>
											<div className="cart_add">
												<a href="#">Add to cart</a>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-3">
									<div className="product__item">
										<div className="product__item__pic set-bg" data-setbg="img/shop/product-2.jpg">
											<div className="product__label">
												<span>Cupcake</span>
											</div>
										</div>
										<div className="product__item__text">
											<h6><a href="#">Cookies and Cream</a></h6>
											<div className="product__item__price">$30.00</div>
											<div className="cart_add">
												<a href="#">Add to cart</a>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-3">
									<div className="product__item">
										<div className="product__item__pic set-bg" data-setbg="img/shop/product-3.jpg">
											<div className="product__label">
												<span>Cupcake</span>
											</div>
										</div>
										<div className="product__item__text">
											<h6><a href="#">Gluten Free Mini Dozen</a></h6>
											<div className="product__item__price">$31.00</div>
											<div className="cart_add">
												<a href="#">Add to cart</a>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-3">
									<div className="product__item">
										<div className="product__item__pic set-bg" data-setbg="img/shop/product-4.jpg">
											<div className="product__label">
												<span>Cupcake</span>
											</div>
										</div>
										<div className="product__item__text">
											<h6><a href="#">Cookie Dough</a></h6>
											<div className="product__item__price">$25.00</div>
											<div className="cart_add">
												<a href="#">Add to cart</a>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-3">
									<div className="product__item">
										<div className="product__item__pic set-bg" data-setbg="img/shop/product-5.jpg">
											<div className="product__label">
												<span>Cupcake</span>
											</div>
										</div>
										<div className="product__item__text">
											<h6><a href="#">Vanilla Salted Caramel</a></h6>
											<div className="product__item__price">$05.00</div>
											<div className="cart_add">
												<a href="#">Add to cart</a>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-3">
									<div className="product__item">
										<div className="product__item__pic set-bg" data-setbg="img/shop/product-6.jpg">
											<div className="product__label">
												<span>Cupcake</span>
											</div>
										</div>
										<div className="product__item__text">
											<h6><a href="#">German Chocolate</a></h6>
											<div className="product__item__price">$14.00</div>
											<div className="cart_add">
												<a href="#">Add to cart</a>
											</div>
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
};

export default ProductDetails;
