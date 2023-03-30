import ProductFilters from "@/domain/entities/ProductFilters";
import ProductsWithTotal from "@/domain/entities/ProductsWithTotal";
import Response from "@/domain/entities/Response";
import IProductRepo from "@/domain/repositories/IProductRepo";

class GetManyProductsUseCase {
    private readonly productRepo: IProductRepo;

    constructor(productRepo: IProductRepo) {
        this.productRepo = productRepo;
    }

    async run(filters: ProductFilters): Promise<Response<ProductsWithTotal>> {
        const response: Response<ProductsWithTotal> = await this.productRepo.getMany(filters);
        return response;
    }
}

export default GetManyProductsUseCase;