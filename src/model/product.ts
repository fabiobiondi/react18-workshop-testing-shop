export interface Product {
  id: number;
  name: string;
  description: string;
  images: string[];
  price: number;
  colors: string[];
  sizes: string[];
  highlights: string[];
  reviews: Review;
}

export interface Review {
  average: number;
  totalCount: number;
}

