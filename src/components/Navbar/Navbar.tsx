import { selectCartState } from '@/features/slices/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
export interface NavbarProps { }

const Navbar: React.FC<NavbarProps> = () => {
	const [totalItems, setTotalItems] = useState<number>(0);
	const [cartTotal, setCartTotal] = useState<number>(0);

	const cartState = useSelector(selectCartState);
	// const cartTotal = useSelector(selectCartTotal);

	useEffect(() => {
		let total: number = 0;
		let totalPrice: number = 0;
		cartState.forEach(p => {
			total += p.qty;
			if (p.product.price) totalPrice += (p.product.price * p.qty);
		});
		setTotalItems(total);
		setCartTotal(totalPrice);
	}, [cartState]);

	return (
		<header className="header">
			<div className="header__top">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="header__top__inner">
								<div className="header__top__left" style={{ visibility: "hidden" }}>
									<ul>
										<li>USD <span className="arrow_carrot-down"></span>
											<ul>
												<li>EUR</li>
												<li>USD</li>
											</ul>
										</li>
										<li>ENG <span className="arrow_carrot-down"></span>
											<ul>
												<li>Spanish</li>
												<li>ENG</li>
											</ul>
										</li>
										<li><a href="#">Sign in</a> <span className="arrow_carrot-down"></span></li>
									</ul>
								</div>
								<div className="header__logo">
									<Link href="/"><Image src="/img/logos/logo-deleite-cafe_oscuro.png" alt="" width={120} height={52} /></Link>
								</div>
								<div className="header__top__right">
									<div className="header__top__right__links">
										{/* <a href="#" className="search-switch"><img src="img/icon/search.png" alt="" /></a> */}
										{/* <Link href="/wish-list"><Image src="/img/icon/heart.png" alt="" width={26} height={23} /></Link> */}
									</div>
									<div className="header__top__right__cart">
										<Link href="/cart"><Image src="/img/icon/cart.png" alt="" width={23} height={27} /> <span>{totalItems}</span></Link>
										<div className="cart__price">Total: <span>{numeral(cartTotal).format("$0,0.00")}</span></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="canvas__open"><i className="fa fa-bars"></i></div>
				</div>
			</div>
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<nav className="header__menu mobile-menu">
							<ul>
								{/* <li className="active"><Link href="/">Home</Link></li> */}
								<li><Link href="/">Inicio</Link></li>
								<li><Link href="/about">Cónocenos</Link></li>
								<li><Link href="/shop?page=1">Tienda</Link></li>
								{/* <li><Link href="#">Pages</Link>
									<ul className="dropdown">
										<li><Link href="./shop-details.html">Shop Details</Link></li>
										<li><Link href="./shoping-cart.html">Shoping Cart</Link></li>
										<li><Link href="./checkout.html">Check Out</Link></li>
										<li><Link href="./wisslist.html">Wisslist</Link></li>
										<li><Link href="./Class.html">Class</Link></li>
										<li><Link href="./blog-details.html">Blog Details</Link></li>
									</ul>
								</li> */}
								{/* <li><Link href="/blog">Blog</Link></li> */}
								<li><Link href="/contact">Contacto</Link></li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
