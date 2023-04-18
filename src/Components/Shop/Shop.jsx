import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';

const Shop = () => {
    const [products, setProducts] = useState([]);

    const [cart , setCart] =useState([]);

    useEffect(()=>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data));
    }
    ,[]);

    useEffect(() =>{
        
        const storedCart = getShoppingCart();
        // step 1: get id
        for(const id in storedCart){
            // step 2 : get product by using id
            const addedProduct = products.find(product => product.id === id);
           
            if(addedProduct){
                 // step 3: get quantity of the product
                const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            }
        }
    },[products])

    const handleAddToCart = (product) => {
        let newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id);
    }

    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(product =><Product 
                         key={product.id}
                         product={product}
                         handleAddToCart = {handleAddToCart}
                         ></Product>)
                }
            </div>
           <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div> 
        </div>
    );
};

export default Shop;