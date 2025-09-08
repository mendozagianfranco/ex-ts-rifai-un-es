import { useReducer } from 'react';
import ListProducts from './components/ListProducts';

const products: Product[] = [
  { name: 'Mela', price: 0.5 },
  { name: 'Pane', price: 1.2 },
  { name: 'Latte', price: 1.0 },
  { name: 'Pasta', price: 0.7 },
];

export type Product = {
  name: string,
  price: number;
};

type CartItem = Product & {
  quantity: number;
};

export type Action =
  | { type: 'ADD_ITEM', payload: Product; }
  | { type: 'UPDATE_QUANTITY', payload: { name: string, quantity: number; }; }
  | { type: 'REMOVE_ITEM'; payload: { name: string; }; };

function App() {
  // const [addedProducts, SetAddedProducts] = useState([]);
  const [addedProducts, dispatch] = useReducer(cartReducer, []);

  function cartReducer(state: CartItem[], action: Action): CartItem[] {
    switch (action.type) {
      case 'ADD_ITEM':
        const findProduct = state.find(p => p.name === action.payload.name);
        if (findProduct) {
          return state.map(p =>
            p.name === action.payload.name ? { ...p, quantity: p.quantity + 1 } : p
          );
        } else {
          return [...state, { ...action.payload, quantity: 1 }];
        }

      case 'UPDATE_QUANTITY':
        const quantity = action.payload.quantity;
        if (Number(quantity) % 1 != 0 || Number(quantity) < 1) return state;
        return state.map(p => p.name === action.payload.name ? { ...p, quantity } : p);
      case 'REMOVE_ITEM':
        return state.filter(p => p.name !== action.payload.name);
      default:
        return state;
    }
  }

  const totalPrice = addedProducts.reduce((acc, curr) => {
    return acc + (curr.price * (curr.quantity));
  }, 0);

  return (
    <>
      <h1>Lista Prodotti</h1>
      <ListProducts products={products} addProduct={dispatch} />

      {addedProducts.length > 0 && (
        <>
          <h2>List dei prodotti nel carrello</h2>
          <div>Totale nel carrello: {totalPrice.toFixed(2)} €</div>
          {addedProducts.map((p, index) => (
            <div key={index}>
              <h3>{p.name}</h3>
              <p>Price: {p.price.toFixed(2)} €</p>
              {/* <p>Quantity: {p.quantity}</p>*/}
              <p>Quantity : <input type="number" value={p.quantity} onChange={(e) => dispatch({ type: 'UPDATE_QUANTITY', payload: { name: p.name, quantity: Number(e.target.value) } })} /></p>
              <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: p })}>Rimuovi dal carrello</button>
            </div>
          ))}
        </>)
      }
    </>
  );
}

export default App;
