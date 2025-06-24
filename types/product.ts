export interface Product {
    _id: string;
    name: string;
    slug: {
        current: string;
    };
    description?: string;
    detailedDescription?: any[];
    images: Array<{
        asset: {
            _ref: string;
            _type: string;
        };
        alt: string;
    }>;
    price: number;
    category: {
        _id: string;
        name: string;
        slug: {
            current: string;
        };
    };
    specifications?: Array<{
        name: string;
        value: string;
    }>;
    variants?: Array<{
        name: string;
        price: number;
        image?: {
            asset: {
                _ref: string;
                _type: string;
            };
        };
    }>;
    featured: boolean;
    weight?: number;
    dimensions?: {
        length?: number;
        width?: number;
        height?: number;
    };
}
