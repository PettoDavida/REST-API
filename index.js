const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

let books = [
    {
        "isbn": 9781449331818,
        "title": "Learning JavaScript Design Patterns",
        "author": "Addy Osmani",
        "publish_date": "2012-07-01",
        "publisher": "O'Reilly Media",
        "numOfPages": 254
    },
    {
        "isbn": 9781449365035,
        "title": "Speaking JavaScript",
        "author": "Axel Rauschmayer",
        "publish_date": "2014-02-01",
        "publisher": "O'Reilly Media",
        "numOfPages": 460
    }
];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.post('/book', (req, res) => {
    const book = req.body

    books.push(book)
    console.log(books);

    res.send('Book is added to the database')
})

app.listen(port, 'localhost', () => console.log(`Hello world app listening on port ${port}!`))