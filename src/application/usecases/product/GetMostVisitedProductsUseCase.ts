import Product from "@/domain/entities/Product";
import Response from "@/domain/entities/Response";
import IProductRepo from "@/domain/repositories/IProductRepo";

class GetMostVisitedProductsUseCase {
    private readonly productRepo: IProductRepo;

    constructor(productRepo: IProductRepo) {
        this.productRepo = productRepo;
    }

    async run(): Promise<Response<Product[]>> {
        const response: Response<Product[]> = await this.productRepo.getMostVisited();
        return response;
    }
}

export default GetMostVisitedProductsUseCase;