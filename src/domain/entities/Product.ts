import Category from "./Category";
import Timestamps from "./Timestamps";

interface Product extends Timestamps {
    uuid?: string;
    name?: string;
    recipe?: string;
    description?: string;
    size?: string;
    category?: string;
    categoryRef: Category;
    price?: number;
    images?: any;
    tags: string[];
    tagsRef: Category[];
    views?: number;
    inStock?: number;
    status?: string;
}

export default Product;