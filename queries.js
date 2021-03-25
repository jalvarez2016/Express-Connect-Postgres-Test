const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'jason',
    host: 'localhost',
    database: 'test',
    password: 'DontLook',
    port: 5434,
});

const getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (err, result) => {
        if(err){
            throw err;
        }
        res.status(200).json(result.rows);
    })
}

const getUserByID = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(`
        SELECT * FROM users
        WHERE users.id = ${id};
    `, (err, result) => {
        if(err) throw err;
        res.status(200).json(result.rows);
    })
}

const createUser = (req, res) => {
    const { name, email } = req.body;
    pool.query(`
        INSERT INTO users (name, email)
        VALUES ($1, $2);
    `, [name, email], (err, result) => {
        if(err) throw err;
        res.status(201).send(`${JSON.stringify(result)}`);
    });
}

const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const {name, email} = req.body;

    pool.query(`
        UPDATE users SET name = '${name}',
        email = '${email}'
        WHERE id = ${id}
    `, (err, result) => {
        if(err) throw err;
        res.status(200).send(`User modified with ID: ${id}`);
    })
}

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    
    pool.query(`
        DELETE FROM users WHERE id = ${id}
    `, (err, result) => {
        if(err) throw err;
        res.status(200).send(`User deleted with ID: ${id}`);
    })
}

module.exports = {
    getUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser
}