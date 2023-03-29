import Product from "@/domain/entities/Product";
import Response from "@/domain/entities/Response";
import IProductRepo from "@/domain/repositories/IProductRepo";

class GetRelatedProductsUseCase {
    private readonly productRepo: IProductRepo;

    constructor(productRepo: IProductRepo) {
        this.productRepo = productRepo;
    }

    async run(id: string): Promise<Response<Product[]>> {
        const response: Response<Product[]> = await this.productRepo.getRelated(id);
        return response;
    }
}

export default GetRelatedProductsUseCase;