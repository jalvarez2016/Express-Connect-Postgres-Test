const express = require('express');
const app = express()
const methodOverride = require('method-override');
const PORT = process.env.PORT || 8020;
const {getUsers, getUserByID, createUser, updateUser, deleteUser} = require('./queries');

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})

app.use(express.urlencoded({ extended: true}));
app.use(methodOverride('_method')); //not being used in this project

app.get('/', (req,res) => {
    res.json({info: 'Node.js, Express, and Postgres API'});
});

app.get('/users', getUsers);

app.get('/users/:id', getUserByID);

app.post('/users', createUser);

app.put('/users/:id', updateUser);

app.delete('/users/:id', deleteUser);


app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}!`);
})