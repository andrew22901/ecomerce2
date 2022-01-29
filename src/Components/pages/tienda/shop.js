
import FeaturedProduct from "../../shared/featuredProduct";
import { ProductsContext } from "../../Context/productsContext";
import './shop.css'
import { Link } from "react-router-dom";
import Loader from '../../Loader/Loader'

import React, { useContext, useEffect, useState } from "react";

import Layout from "../../shared/Layout";

import { useParams } from 'react-router-dom'

import { CartContext } from "../../Context/cartContext";
import { isInCart } from "../../../helpers/helper";
import db from "../../../Firebase"
import { collection, getDocs } from 'firebase/firestore/lite';



const Shop = () => {
    const { products } = useContext(ProductsContext);
    const [loader, setLoader] = useState(true)
    const {addProduct, cartItems, increase} = useContext(CartContext)
        



    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const itemInCart = isInCart(product, cartItems)

    async function getProducts(db) {
        const ProductosCol = collection(db, 'Productos');
        const ProductosSnapshot = await getDocs(ProductosCol);
        const ProductosList = ProductosSnapshot.docs.map(doc => doc.data());
        console.log("firebase", ProductosList)
        return ProductosList;
        
    }
    

    useEffect(() => {
        getProducts(db).then(resultsProducts => {
            resultsProducts.map(resultProduct => {
               
                    setProduct(resultProduct)
                   setLoader(false)
                
            })
        })
    }, [id])


    console.log(products)

  
    return(
        <Layout>
            <div>
            {products.map(product => { 
                
            const { img, name, price, stock, id} = product;
                return(
            loader
            ?
            <Loader />
            :
            <div className="Container ">
            <div >
                <img className="imagen" src={img} alt="producto" />
            </div>
            <div className="text">
                <h3>{name}</h3>
                <p>Precio: $ {price} </p>
                <p>Stock: {stock} </p>
                {
                    !itemInCart &&
                    <button className="add" onClick={() => addProduct(product)}>
                        Agregar al carrito
                    </button>
                }
                {
                    itemInCart &&
                    <button className="add" onClick={() => increase(product)}> 
                        Agregar Mas
                    </button>
                }
                <Link to={`/product/${id}`}>
                    <button className="add">Ver Mas</button>
                </Link>
            </div>
        </div>
         )
        })
            }
        </div>

        </Layout>
    )

}
export default Shop