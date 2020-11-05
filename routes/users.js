import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

let users =  [];

//Todos os usuarios do servidor
router.get('/', (req, res) => {  
    console.log(users);

    res.send(users);
});

//Novo usuario
router.post('/',(req,res) => {
    const user = req.body;

    users.push({ ...user, id: uuidv4()}); //adiciona um ID unico ao 'modelo' de usuario anterior

    res.send(`User with the name ${user.firstName} added to the database!`);
});

//Retorna usuario especifico atraves da id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    
    const foundUser = users.find((user) => user.id == id);

    res.send(foundUser);
});


//Deleta usuario
router.delete('/:id', (req, res) =>{
    const { id } = req.params;

    users = users.filter((user) => user.id !== id);

    res.send(`User with the ID ${id} deleted`);
});


//Atualiza usuario
router.patch('/:id', (req, res) => {
    const { id } =req.params;
    const { firstName, lastName, age} = req.body;

    const user = users.find((user) => user.id == id);

    if(firstName) user.firstName = firstName;
    if(lastName) user.lastName = lastName;
    if(age) user.age = age;

    res.send(`User with the ID: ${id} has been updated`);
})
export default router;