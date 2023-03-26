import GetAllProductsUseCase from '@/application/usecases/product/GetAllProductsUseCase';
import { Layout } from '@/components/Layout';
import { ProductPreview } from '@/components/ProductPreview';
import Product from '@/domain/entities/Product';
import ProductRepo from '@/infrastructure/implementations/httpRequest/axios/ProductRepo';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export interface ShopProps { };

const Shop: React.FC<ShopProps> = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // const router  = useRouter();
    const productRepo = new ProductRepo();
    const getAllProductsUseCase = new GetAllProductsUseCase(productRepo);    

    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data, status } = await getAllProductsUseCase.run();
            if (status === 200 && data) {
                setProducts(data);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <>
        <Head>
            <title>Tienda</title>
        </Head>
        <Layout>
            <div className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="breadcrumb__text">
                                <h2>Tienda</h2>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="breadcrumb__links">
                                <Link href="/">Home</Link>
                                <span>Shop</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                !loading &&
                <section className="shop spad">
                    <div className="container">
                        <div className="shop__option">
                            <div className="row">
                                <div className="col-lg-7 col-md-7">
                                    <div className="shop__option__search">
                                        <form action="#">
                                            <select>
                                                <option value="">Categories</option>
                                                <option value="">Red Velvet</option>
                                                <option value="">Cup Cake</option>
                                                <option value="">Biscuit</option>
                                            </select>
                                            <input type="text" placeholder="Search" />
                                            <button type="submit"><i className="fa fa-search"></i></button>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-5 col-md-5">
                                    <div className="shop__option__right">
                                        <select>
                                            <option value="">Default sorting</option>
                                            <option value="">A to Z</option>
                                            <option value="">1 - 8</option>
                                            <option value="">Name</option>
                                        </select>
                                        <a href="#"><i className="fa fa-list"></i></a>
                                        <a href="#"><i className="fa fa-reorder"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            { 
                                products.length > 0 ? 
                                products.map((product, index) => (
                                    <ProductPreview key={index} product={product} />
                                )) : 
                                <span>No se encontraron productos</span>
                            }
                            {/* <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="product__item">
                                    <div className="product__item__pic set-bg" data-setbg="img/shop/product-1.jpg">
                                        <div className="product__label">
                                            <span>Cupcake</span>
                                        </div>
                                    </div>
                                    <div className="product__item__text">
                                        <h6><Link href="/product-details">Dozen Cupcakes</Link></h6>
                                        <div className="product__item__price">$32.00</div>
                                        <div className="cart_add">
                                            <a href="#">Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="product__item">
                                    <div className="product__item__pic set-bg" data-setbg="img/shop/product-2.jpg">
                                        <div className="product__label">
                                            <span>Cupcake</span>
                                        </div>
                                    </div>
                                    <div className="product__item__text">
                                        <h6><Link href="/product-details">Cookies and Cream</Link></h6>
                                        <div className="product__item__price">$30.00</div>
                                        <div className="cart_add">
                                            <a href="#">Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
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
                            <div className="col-lg-3 col-md-6 col-sm-6">
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
                            <div className="col-lg-3 col-md-6 col-sm-6">
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
                            <div className="col-lg-3 col-md-6 col-sm-6">
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
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="product__item">
                                    <div className="product__item__pic set-bg" data-setbg="img/shop/product-7.jpg">
                                        <div className="product__label">
                                            <span>Cupcake</span>
                                        </div>
                                    </div>
                                    <div className="product__item__text">
                                        <h6><a href="#">Dulce De Leche</a></h6>
                                        <div className="product__item__price">$32.00</div>
                                        <div className="cart_add">
                                            <a href="#">Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="product__item">
                                    <div className="product__item__pic set-bg" data-setbg="img/shop/product-8.jpg">
                                        <div className="product__label">
                                            <span>Cupcake</span>
                                        </div>
                                    </div>
                                    <div className="product__item__text">
                                        <h6><a href="#">Mississippi Mud</a></h6>
                                        <div className="product__item__price">$08.00</div>
                                        <div className="cart_add">
                                            <a href="#">Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="product__item">
                                    <div className="product__item__pic set-bg" data-setbg="img/shop/product-9.jpg">
                                        <div className="product__label">
                                            <span>Cupcake</span>
                                        </div>
                                    </div>
                                    <div className="product__item__text">
                                        <h6><a href="#">VEGAN/GLUTEN FREE</a></h6>
                                        <div className="product__item__price">$98.85</div>
                                        <div className="cart_add">
                                            <a href="#">Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="product__item">
                                    <div className="product__item__pic set-bg" data-setbg="img/shop/product-10.jpg">
                                        <div className="product__label">
                                            <span>Cupcake</span>
                                        </div>
                                    </div>
                                    <div className="product__item__text">
                                        <h6><a href="#">SWEET CELTICS</a></h6>
                                        <div className="product__item__price">$5.77</div>
                                        <div className="cart_add">
                                            <a href="#">Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="product__item">
                                    <div className="product__item__pic set-bg" data-setbg="img/shop/product-11.jpg">
                                        <div className="product__label">
                                            <span>Cupcake</span>
                                        </div>
                                    </div>
                                    <div className="product__item__text">
                                        <h6><a href="#">SWEET AUTUMN LEAVES</a></h6>
                                        <div className="product__item__price">$26.41</div>
                                        <div className="cart_add">
                                            <a href="#">Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="product__item">
                                    <div className="product__item__pic set-bg" data-setbg="img/shop/product-12.jpg">
                                        <div className="product__label">
                                            <span>Cupcake</span>
                                        </div>
                                    </div>
                                    <div className="product__item__text">
                                        <h6><a href="#">PALE YELLOW SWEET</a></h6>
                                        <div className="product__item__price">$22.47</div>
                                        <div className="cart_add">
                                            <a href="#">Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="shop__last__option">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <div className="shop__pagination">
                                        <a href="#">1</a>
                                        <a href="#">2</a>
                                        <a href="#">3</a>
                                        <a href="#"><span className="arrow_carrot-right"></span></a>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <div className="shop__last__text">
                                        <p>Showing 1-9 of 10 results</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </Layout>
        </>
    );
}

export default Shop;