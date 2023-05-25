const express=require('express')
const router=express.Router()
const {uploadAdminData}=require('../controller/controlleradmin')
const {fetchnames}=require('../fetch/fetchhome')
const {deletedata}=require('../delete/deleteproduct')
const {updatedata}=require('../update/updateproduct')
router.post('/admin',uploadAdminData)
router.get('/',fetchnames)
router.delete('/delete/product/:productId',deletedata);
router.put('/update/product/:productId',updatedata);
module.exports=router