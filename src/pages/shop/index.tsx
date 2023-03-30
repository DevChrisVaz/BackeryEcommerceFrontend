import GetAllCategoriesUseCase from '@/application/usecases/category/GetAllCategoriesUseCase';
import GetManyProductsUseCase from '@/application/usecases/product/GetManyProductsUseCase';
import { Layout } from '@/components/Layout';
import { ProductPreview } from '@/components/ProductPreview';
import Category from '@/domain/entities/Category';
import Product from '@/domain/entities/Product';
import ProductFilters from '@/domain/entities/ProductFilters';
import CategoryRepo from '@/infrastructure/implementations/httpRequest/axios/CategoryRepo';
import ProductRepo from '@/infrastructure/implementations/httpRequest/axios/ProductRepo';
import { Formik } from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Hearts } from "react-loader-spinner";

export interface ShopProps { };

const Shop: React.FC<ShopProps> = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalProducts, setTotalProducts] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageButtons, setPageButtons] = useState<any>([]);
    const [currentFilter, setCurrentFilter] = useState<ProductFilters>({});
    const [initialValues, setInitialValues] = useState<ProductFilters>({
        category: "",
        searchBy: ""
    });

    const router = useRouter();
    const { page } = router.query;

    const productRepo = new ProductRepo();
    const categoryRepo = new CategoryRepo();
    const getManyProductsUseCase = new GetManyProductsUseCase(productRepo);
    const getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoryRepo);

    const getFilteredProducts = async (filter: ProductFilters) => {
        try {
            setLoading(true);
            const { data, status } = await getManyProductsUseCase.run(filter);
            if (status === 200 && data) {
                setCurrentFilter(filter);
                setProducts(data.products);
                setTotalProducts(data.total);
            }
            setLoading(false);
        } catch (err) {

        }
    }

    const getAllCategories = async () => {
        try {
            const { data, status } = await getAllCategoriesUseCase.run();
            if (status === 200 && data) {
                setCategories(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getFilteredProducts(currentFilter);
        getAllCategories();
    }, []);

    useEffect(() => {
        if (totalProducts > 0) {
            setPageButtons(Array.from({ length: Math.ceil(totalProducts / 12) }, (_, i) => i + 1));
            // setPageButtons()
        }
    }, [totalProducts]);

    useEffect(() => {
        let temp: number;
        temp = page ? (Array.isArray(page) ? parseInt(page[0]) : parseInt(page)) : 0;
        setCurrentPage(temp);
    }, [page]);

    useEffect(() => {
        const filter: ProductFilters = {
            ...currentFilter,
            page: currentPage
        }
        getFilteredProducts(filter);
    }, [currentPage]);

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
                                    <Link href="/">Inicio</Link>
                                    <span>Tienda</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="shop spad">
                    <div className="container">
                        <div className="shop__option">
                            <div className="row">
                                <div className="col-lg-8 col-md-8">
                                    <div className="shop__option__search">
                                        <Formik
                                            initialValues={initialValues}
                                            onSubmit={getFilteredProducts}
                                        >
                                            {({
                                                values,
                                                handleChange,
                                                handleBlur,
                                                handleSubmit
                                            }) => (
                                                <form onSubmit={handleSubmit}>
                                                    <select
                                                        id="category"
                                                        name="category"
                                                        value={values.category}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    >
                                                        <option value="">Categorías</option>
                                                        {
                                                            categories.length > 0 && categories.map((category, index) => {
                                                                return (
                                                                    <option key={index} value={category.uuid}>{category.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                    <input
                                                        type="text"
                                                        placeholder="Buscar"
                                                        name="searchBy"
                                                        value={values.searchBy}
                                                        onChange={handleChange}
                                                    />
                                                    <button type="submit"><i className="fa fa-search"></i></button>
                                                </form>
                                            )}
                                        </Formik>
                                    </div>
                                </div>
                                {/* <div className="col-lg-5 col-md-5">
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
                                    </div> */}
                            </div>
                        </div>
                        {
                            loading ?
                                <div className="w-100 d-flex justify-content-center">
                                    <Hearts
                                        height={120}
                                        width={120}
                                        color="#573c30"
                                        ariaLabel="hearts-loading"
                                        visible={true}
                                    />
                                </div>
                                :
                                <div className="row">
                                    {
                                        products.length > 0 ?
                                            products.map((product, index) => (
                                                <ProductPreview key={index} product={product} />
                                            )) :
                                            <span>No se encontraron productos</span>
                                    }
                                </div>
                        }
                        <div className="shop__last__option">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <div className="shop__pagination">
                                        {pageButtons.map((num: number, index: number) => (
                                            <a key={index}
                                                onClick={() => {
                                                    router.push({
                                                        pathname: router.pathname,
                                                        query: {
                                                            page: num
                                                        }
                                                    })
                                                }}
                                                className={num === currentPage ? "selected" : ""}
                                                style={{ cursor: "pointer" }}
                                            >{num}</a>
                                        ))}
                                        {
                                            pageButtons.length + 1 !== currentPage &&
                                            <a onClick={() => setCurrentPage(currentPage + 1)}><span className="arrow_carrot-right" /></a>
                                        }
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <div className="shop__last__text">
                                        <p>Mostrando {currentPage === 1 ? currentPage : 12 * (currentPage - 1) + 1}-{(12 * currentPage) > totalProducts ? totalProducts : (12 * currentPage)} de {totalProducts} resultados</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export default Shop;