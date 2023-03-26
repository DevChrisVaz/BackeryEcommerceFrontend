import { selectCartState } from '@/features/slices/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
export interface OffCanvasMenuProps { }

const OffCanvasMenu: React.FC<OffCanvasMenuProps> = () => {

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
		<>
			<div className="offcanvas-menu-overlay"></div>
			<div className="offcanvas-menu-wrapper">
				<div className="offcanvas__cart">
					<div className="offcanvas__cart__links">
						{/* <a href="#" className="search-switch"><Image src="/img/icon/search.png" width={100} height={100} alt="" /></a> */}
						<a href="#"><Image src="/img/icon/heart.png" alt="" width={26} height={23} /></a>
					</div>
					<div className="offcanvas__cart__item">
						<Link href="/cart"><Image src="/img/icon/cart.png" alt="" width={23} height={27} /> <span>{totalItems}</span></Link>
						<div className="cart__price">Total: <span>{numeral(cartTotal).format("$0,0.00")}</span></div>
					</div>
				</div>
				<div className="offcanvas__logo">
					<Link href="/"><Image src="/img/logos/logo-deleite-cafe_oscuro.png" alt="" width={128} height={60} /></Link>
				</div>
				<div id="mobile-menu-wrap"></div>
				<div className="offcanvas__option" style={{ visibility: "hidden" }}>
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
			</div>
		</>
	);
};

export default OffCanvasMenu;
