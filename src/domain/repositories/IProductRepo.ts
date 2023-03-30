import Product from "../entities/Product";
import ProductFilters from "../entities/ProductFilters";
import ProductsWithTotal from "../entities/productsWithTotal";
import Response from "../entities/Response";

interface IProductRepo {
    getAll(): Promise<Response<Product[]>>;
    getMany(filter: ProductFilters): Promise<Response<ProductsWithTotal>>;
    getRelated(id: string): Promise<Response<Product[]>>;
    getMostVisited(): Promise<Response<Product[]>>;
    getOne(id: string): Promise<Response<Product>>;
    create(product: Product): Promise<Response<Product>>;
    update(id: string, product: Product): Promise<Response<Product>>;
    delete(id: string): Promise<Response<Product>>;
    increaseViews(id: string): Promise<Response<any>>;
}

export default IProductRepo;