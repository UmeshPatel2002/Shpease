import React, {createContext, useEffect, useState} from 'react';

export const ShopContext=createContext();

const getDefaultCart=()=>{
    let cart={};
    for(let i=0;i<300+1;++i){
        cart[i]=0;
    }
    return cart;
}

const ShopContextProvider=(props)=>{
    const [all_product,setAll_product]=useState([])
    const [cartItems, setCartItems]=useState(getDefaultCart());

    useEffect(()=>{
         fetch('http://localhost:4000/allproducts')
        .then((res)=>res.json())
        .then((data)=>setAll_product(data))

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                 body:"",
            })
            .then((res)=>res.json)
            .then((data)=>setCartItems(data))
        }
    },[])
    
    const addTocart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'Application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((res)=>res.json())
            .then((data)=>console.log(data))
        }
    }
    
    const removeFromcart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'Application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((res)=>res.json())
            .then((data)=>console.log(data))
        }
    }
    
    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo=all_product.find((product)=>product.id===Number(item))
                totalAmount+=itemInfo.new_price*cartItems[item]
            }
        }
        return  totalAmount;
    }

    const getTotalCartItem=()=>{
        let totalitem=0;
        for(const item in cartItems){
           if(cartItems[item]>0){
             totalitem+=cartItems[item];
           }
        }
        return totalitem;
    }


    const contextValue={getTotalCartItem,getTotalCartAmount, all_product,cartItems,addTocart,removeFromcart};
    


    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}

        </ShopContext.Provider>
    )
}

export default ShopContextProvider;