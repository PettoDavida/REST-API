const express = require('express');

const app = express();
const port = 3000;

let books = [
    {
        "id": 1,
        "title": "Learning JavaScript Design Patterns",
        "author": "Addy Osmani",
        "publisher": "O'Reilly Media",
        "numOfPages": 254
    },
    {
        "id": 2,
        "title": "Speaking JavaScript",
        "author": "Axel Rauschmayer",
        "publisher": "O'Reilly Media",
        "numOfPages": 460
    }
];

app.use(express.json());


app.get('/', (req, res) => {
    res.send(books)
})

app.post('/', (req, res) => {
    const book = {
        "id": books[books.length-1].id + 1,
        "title": req.body.title,
        "author": req.body.author,
        "publisher": req.body.publisher,
        "numOfPages": req.body.numOfPages
    }

    books.push(book)

    res.send('Book is added to the database')
})

app.delete('/:id', (req, res) => {
    const id = req.params.id
    books= books.filter(i => {
        if (i.id !== parseInt(id)) {
            return true
        }
        return false
    })

    res.send(books)
})

app.put('/:id', (req, res) => {
    
    const id = req.params.id
    const editedBook = req.body
    for (let i = 0; i < books.length; i++) {
        let book = books[i];
        if (book.id === id){
            books[i] = editedBook
        }
        
    }

    res.send(books)
})

app.listen(port, 'localhost', () => console.log(`Hello world app listening on port ${port}!`))