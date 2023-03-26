import Product from '@/domain/entities/Product';
import Link from 'next/link';
import React from 'react';
import numeral from "numeral";
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, selectCartState } from '@/features/slices/cartSlice';

export interface ProductPreviewProps {
	product: Product;
}

const ProductPreview: React.FC<ProductPreviewProps> = ({ product }) => {

	const dispatch = useDispatch();
	const cart = useSelector(selectCartState);

	const handleAddItem = (product: Product) => {
        dispatch(addItem(product));
    }

	const handleRemoveFromCart = (uuid: string) => {
		dispatch(removeItem(uuid));
	}

	const isInCart = (id: string): boolean => {
		if (cart.find(i => i.product.uuid === id)?.qty) return true;
		return false;
	}

	return (
		<div className="col-lg-3 col-md-6 col-sm-6">
			<div className="product__item">
				<div className="product__item__pic set-bg" data-setbg={process.env.NEXT_PUBLIC_API_URL_PUBLIC + product.images[0]}>
					<div className="product__label">
						<span>{product.categoryRef.name}</span>
					</div>
				</div>
				<div className="product__item__text">
					<h6><Link href={"/product-details?id=" + product.uuid}>{product.name}</Link></h6>
					<div className="product__item__price">{numeral(product.price).format("$0,0.00")}</div>
					{
						isInCart(product.uuid ?? "") ? 
						<div className="cart_remove" onClick={() => handleRemoveFromCart(product.uuid ?? "")}>
							<a style={{ cursor: "pointer" }}>Remover del carrito</a>
						</div>
						:
						<div className="cart_add" onClick={() => handleAddItem(product)}>
							<a style={{ cursor: "pointer" }}>Agregar al carrito</a>
						</div>
					}
				</div>
			</div>
		</div>
	);
};

export default ProductPreview;
