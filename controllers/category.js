const express = require('express')
const Categorie = require('../Models/categorie')
const router = express.Router()

router.get('/categories',async (req,res)=>{
    try{
        const categories=await Categorie.find();
        res.status(201).json({success:true,data:categories})
    }catch (error){
        res.status(404).send(error)
    }
})

router.post('/addCategorie', async (req,res)=>{
    try{
        let newCategory=new Categorie(req.body);
        const savedCatgory=await newCategory.save();
        res.status(201).json({success: true , data : savedCatgory })  
    }catch (error){
        res.status(404).send(error)
    }
})

router.put('/:id', async (req,res)=>{
    try{
        let id = req.params.id
        let updateData = req.body;
        let category = await Categorie.findByIdAndUpdate(id,updateData)  
        if(!category) return res.status(404).send("No user found in the database.")  
        res.status(200).json({'User updated': 'This user has been updated.'});  
    }catch (error){
        res.status(404).send(error)
    }
})

router.delete('/:id', (req,res)=>{
    try{
        const {id} = req.params
         Categorie.findByIdAndDelete(id)
         res.status(200).json({message:"Deleted"})

    }catch(error){
        console.log(error)
        res.status(404).send(error)
    }
})

module.exports = router