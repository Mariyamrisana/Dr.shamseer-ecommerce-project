const product = require('../models/Product');

console.log('control');


const getAllProducts = async ( req , res)=>{
    try{
        const products =await product.find();
        res.status(200).json(products);
    }catch (error){
        res.status(200).json({message:'Error fetching products',error});
    }
};

const addProduct = async (req,res)=>{
    try{
        const newProduct = new product(req.body);
        await newProduct.save();
        res.status(201).json({message:'Product added successfully',newProduct});
    }catch(error){
        res.status(500).json({message:'Error adding Product',error})
    }
};

module.exports = {getAllProducts,addProduct};