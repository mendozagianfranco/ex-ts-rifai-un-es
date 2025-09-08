import type React from "react";
import type { Product, Action } from "../App";

type ListProductsProps = {
    products: Product[];
    addProduct: React.Dispatch<Action>;
};

export default function ListProducts({ products, addProduct }: ListProductsProps) {

    return (
        <div>
            {products.map((product, index) => (
                <div key={index}>
                    <h2>{product.name}</h2>
                    <p>Price: {product.price.toFixed(2)} €</p>
                    <button onClick={() => addProduct({ type: 'ADD_ITEM', payload: product })}>Aggiungi al carrello</button>

                </div>
            ))}
        </div>
    );
}