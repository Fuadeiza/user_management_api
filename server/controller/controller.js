const { response } = require('express');
var Userdb = require('../model/model');

// create and save new user

exports.create = (req, res) => {
    // validate request
    if (!req.body){ res.status(400).send({ message: "Content can not be empty" })}
    // new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    // save user to DB
    user
        .save(user)
        .then(data => {
            // res.send(data)
            res.redirect('/')
        })
        .catch(err => {
            res.status(500).send({
                message: err.messge || "Some error occured while creating the user"
            })
        })

}

// retrieve and return all user , single user
exports.find = (req, res) => {
    // get data from DB and return

    if (req.query.id){
        const id = req.query.id

        Userdb.findById(id)
        .then(data =>{
            if(!data){
                res.status(404).send({message: "User not found"})
            }else{
                res.send(data)
            }
        }).catch(err =>{
            res.status(500).send({message: "Error retrieving user with ID=" +id})
        })
    }else{

    Userdb.find()
    .then(user =>{
        res.send(user)
    })
    .catch(err =>{
        res.status(500).send({message: err.mesage || "Error occured while retrieving user"})
    })
    }
}

// Update a new identified user by userid
exports.update = (req, res) => {
    if (!req.body) return res.status(400).send( {message: "Data to update cannot be empty"})

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
     .then(data =>{
         if (!data){
             res.status(404).send({message: "Cannot update USer"})
         }else{
             res.send(data)
         }
     })
     .catch(err =>{
         res.status(500).send({message : "Error occured during update method"})
     })
}

// Delete a user with specified user id
exports.delete = (req, res) => {

    const id = req.params.id

    Userdb.findByIdAndDelete(id)
    .then(data =>{
        if(!data){
            res.status(404).send({message:"Cannot delete user" })
        }else{
            res.send({message: "User deleted successfully"})
        }
    })
    .catch(err =>{
        res.status(500).send({message: "Could not deleted user with id=" + id})
    })

}