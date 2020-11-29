const mongoose = require("mongoose")
require('dotenv').config()
// import the data_base connection 
const connectDB = require('./config/connectionDB')
// connect to database 
connectDB()
// import Person Model
const PersonModel = require('./models/Person')
// import Data to Create 
const oneRecord = require('./Data/oneRecord') // 
const manyRecord = require('./Data/manyRecord')


// Create and Save a Record of a Model:
let personDocument = new PersonModel(oneRecord)
personDocument.save().then(
    console.log("added Successfully")).catch(error => {
        console.log(`there is an error : ${error}`)
    })


// Create Many Records with model.create()
PersonModel.create(manyRecord).then(
    console.log("added Successfully")).catch(error => {
            console.log(`there is an error : ${error}`)
        })


// Use model.find() to Search Your Database
PersonModel.find({}).then (data => {
    console.log(data)
        }).then(error => {
            console.log(`can't retrieve data of ${error}`)
    })


// Use model.findOne() to Return a Single Matching Document from Your Database
PersonModel.findOne({favoriteFoods:"pasta"}).then(data => console.log(data)).catch(error => {
    console.log(`there is an Error ${error}`)
})

const filter_id ={_id:"5fc3021b4b5c251dfc2e2160"}
// Use model.findById() to Search Your Database By _id
PersonModel.findById(filter_id).then(data => {
    console.log(data)}).catch(error => {
        console.log(`there is an Error ${error}`)
    })


//Perform Classic Updates by Running Find, Edit, then Save
const new_food = "escalope" // New food to update
PersonModel.findById(filter_id).then(data => {
    data.favoriteFoods.push(new_food) 
    data.save()
    console.log(`updated successfully`)
}).catch(error => {
        console.log(`there is an Error ${error}`)
    })


//Perform New Updates on a Document Using model.findOneAndUpdate()
const filter = { name:"mouna"}; // filter by name 
const update = { age: 20 }; // update the age 
PersonModel.findOneAndUpdate(filter,update).then(data => {
    data.save()
    console.log("Age has been updated successfully")}).catch(error => console.log(`cant'update : ${error}`))


//Delete One Document Using model
const delete_id = {_id:"5fc3021b4b5c251dfc2e215e"} //document id to delete
PersonModel.findOneAndRemove(delete_id).then(
    console.log("person is removed")).catch(error => {
        console.log(`there is an error ${error}`)
    })


//MongoDB and Mongoose - Delete Many Documents with model.remove()
const remove_name= {name:"mary"}
PersonModel.remove(remove_name).then(console.log("item deleted")).catch(error => {
    console.log(`can't delete : ${error}`)
})


// Chain Search Query Helpers to Narrow Search Results

PersonModel.find({favoriteFoods:"burrito"})
            .sort({name:1}).limit(2)
            .select({age :false}).exec().then(data => {
            console.log(data)
            }).catch(error => console.log(`there is an error ${error}`))