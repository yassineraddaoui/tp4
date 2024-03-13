const express = require('express')
const Produit = require('../Models/produit')
const Categorie = require('../Models/categorie')
const router = express.Router()

router.get('/produits',async (req,res)=>{
    try{
        const produits=await Produit.find();
        res.status(201).json({success:true,data:produits})
    }catch (error){
        res.status(404).send(error)
    }
})

router.post('/addProduit', async (req,res)=>{
    try{

        const {name,description,prix,categorie} = req.body;
        let category = await Categorie.findOne({name:categorie})
        let newCategory=new Produit(
            {   name : name , 
                description : description ,
                prix : prix ,
                categorie :category._id
                }
        );
        const savedCatgory=await newCategory.save();
        res.status(201).json({success: true , data : savedCatgory })  
    }catch (error){
        res.status(404).send(error)
    }
})

router.put('/:id' ,async (req,res)=>{
    try{
        let id = req.params.id
        let updateData = req.body;
        let produit = await Produit.findByIdAndUpdate(id,updateData)  
        if(!produit) return res.status(404).send("No user found in the database.")  
        res.status(200).json({'User updated': 'This user has been updated.'});  
    }catch (error){
        res.status(404).send(error)
    }
})

router.delete('/:id', (req,res)=>{
    try{
        const {id} = req.params
         Produit.findByIdAndDelete(id)
         res.status(200).json({message:"Deleted"})

    }catch(error){
        console.log(error)
        res.status(404).send(error)
    }
})

module.exports = router