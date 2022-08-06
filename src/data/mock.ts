import {Product} from "../model/product";

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Basic Tee',
    description: "Front of men's Basic Tee in black.",
    images: [
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
    ],
    price: 35,
    colors: ['green', 'cyan', 'purple'],
    highlights: [
      'Hand cut and sewn locally',
      'Dyed with our proprietary colors',
      'Pre-washed & pre-shrunk',
      'Ultra-soft 100% cotton',
    ],
    reviews: {
      average: 3,
      totalCount: 88,
    },
    sizes: [
      'XXS',
      'XS',
      'S',
      'M',
    ],
  },
  {
    id: 2,
    name: 'Street T-Shirt',
    description: "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
    images: [
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
      'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
    ],
    price: 20,
    colors: ['white', 'lightgreen', 'lightblue'],
    highlights: [
      'Hand cut and sewn locally',
      'Dyed with our proprietary colors',
      'Pre-washed & pre-shrunk',
      'Ultra-soft 100% cotton',
    ],
    reviews: {
      average: 4,
      totalCount: 88,
    },
    sizes: [
      'XXS',
      'XS',
      'S',
      'M',
      'L',
      'XL',
      '2XL',
      '3XL',
    ],
  },
  {
    id: 3,
    name: 'Fit Slim Tee',
    description: 'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    images: [
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg',      'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
    ],
    price: 15,
    colors: ['gray', 'lightgray', 'darkgray'],
    highlights: [
      'Hand cut and sewn locally',
      'Dyed with our proprietary colors',
      'Pre-washed & pre-shrunk',
      'Ultra-soft 100% cotton',
    ],
    reviews: {
      average: 3,
      totalCount: 22,
    },
    sizes: [
      'L',
      'XL',
      '2XL',
      '3XL',
    ],
  },
]
