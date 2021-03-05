import { Product } from './../../models/product.model';

export interface Item extends Product {
    quantity?: number;
}