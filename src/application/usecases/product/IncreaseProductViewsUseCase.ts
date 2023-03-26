import Product from "../../../domain/entities/Product";
import Response from "../../../domain/entities/Response";
import IProductRepo from "../../../domain/repositories/IProductRepo";

class IncreaseProductViewsUseCase {
    private readonly productRepo: IProductRepo;

    constructor(productRepo: IProductRepo) {
        this.productRepo = productRepo;
    }

    async run(id: string): Promise<Response<Product>> {
        const response: Response<Product> | null = await this.productRepo.increaseViews(id);
        return response;
    }
}

export default IncreaseProductViewsUseCase;