import type Timestamps from "./Timestamps";

interface Category extends Timestamps {
    uuid?: string;
    name?: string;
    description?: string;
    status?: string;
}

export default Category;