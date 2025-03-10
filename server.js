const express = require('express');
const app = express();
const router = express.Router();
const port = 5000;


const Users = [
    { Username: "Bob", age: 25, context:"This is the first post" },
    { Username: "Alice", age: 19, context: "This is the Second post" },
];


app.use(express.json());
app.use('/', router);

router.get('/', (req, res) => {
    res.send("");
});

router.get('/find', (req, res) => {
    try {
        let { Username } = req.query;

        if (!Username || Username.trim() === '') {
            return res.status(400).json({ message: "Username cannot be empty!" });
        }

        Username = Username.trim().toLowerCase();
        const user = Users.find(user => user.Username.toLowerCase() === Username);

        if (!user) {
            return res.status(404).json({ message: "User Details Not Found" });
        }

        res.status(200).json({ message: "User Details found", data: user });
    } catch (error) {
        console.error("Error occurred in /find route:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
