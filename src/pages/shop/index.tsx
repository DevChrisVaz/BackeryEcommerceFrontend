import GetAllCategoriesUseCase from '@/application/usecases/category/GetAllCategoriesUseCase';
import GetAllProductsUseCase from '@/application/usecases/product/GetAllProductsUseCase';
import { Layout } from '@/components/Layout';
import { ProductPreview } from '@/components/ProductPreview';
import Category from '@/domain/entities/Category';
import Product from '@/domain/entities/Product';
import ProductRepo from '@/infrastructure/implementations/httpRequest/axios/ProductRepo';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export interface ShopProps { };

const Shop: React.FC<ShopProps> = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const productRepo = new ProductRepo();
    const getAllProductsUseCase = new GetAllProductsUseCase(productRepo);  
    const getAllCategoriesUseCase = new GetAllCategoriesUseCase(productRepo);  

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

    const getAllCategories = async () => {
        try {
            const { data, status } = await getAllCategoriesUseCase.run();
            if (status === 200 && data) {
                setCategories(data);
            }
        } catch(error) {
            console.log(error);
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
                                                {
                                                    categories.length > 0 && categories.map((category, index) => {
                                                        return (
                                                            <option key={index} value={category.uuid}>{category.name}</option>
                                                        )
                                                    })
                                                }
                                                {/* <option value="">Red Velvet</option>
                                                <option value="">Cup Cake</option>
                                                <option value="">Biscuit</option> */}
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
                                        <p>Mostrando 1-12 de 12 resultados</p>
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