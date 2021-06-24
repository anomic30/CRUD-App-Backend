const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();

const UserModel = require('./Models/User');

app.use(express.json());
app.use(cors());

const URL = process.env.URL;
mongoose.connect(`${URL}`, {
    useNewUrlParser: true,
});

app.post('/insert', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const gender = req.body.gender;
    const age = req.body.age;

    const user = new UserModel({
        name: name,
        email: email,
        phone: phone,
        gender: gender,
        age: age,
    });

    try {
        await user.save();
        res.send("Inserted Data");
    } catch (err) {
        console.log(err);
    }
});

app.get('/read', async (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.send(result);
    })
});

app.get('/person/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await UserModel.findById(id, (err, result) => {
            if (err) {
                res.send(err);
            }
            res.send(result);
        });
    } catch (err) {
        console.log(err);
    }
    
});

app.put('/update', async (req, res) => {
    const id = req.body.id;
    const newName = req.body.name;
    const newEmail = req.body.email;
    const newPhone = req.body.phone;
    const newGender = req.body.gender;
    const newAge = req.body.age;
    
    try {
        await UserModel.findById(id, (err, updatedUser) => {
            updatedUser.name = newName;
            updatedUser.email = newEmail;
            updatedUser.phone = newPhone;
            updatedUser.gender = newGender;
            updatedUser.age = newAge;
            updatedUser.save();
            res.send("update");
        });
    } catch (err) {
        console.log(err);
    }
});

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    
    await UserModel.findByIdAndRemove(id).exec();
    res.send("Deleted");
})

app.listen(process.env.PORT || 3001, () => {
    console.log("Server established!");
});