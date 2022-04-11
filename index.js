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


app.get('/', (_req, res) => {
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
    let found = false
    let index = 0

    for (let i = 0; i < books.length; i++) {
        if (books[i].id === parseInt(id)) {
            found = true
            index = i
            break
        }
    }

    if (found) {
        books.splice(index, 1)
        res.status(200).json({ Success: "Book Removed" })
    }else{
        res.status(404).json({ Error: "Book does not exist" })
    }

})

app.put('/:id', (req, res) => {
    
    const id = req.params.id
    const editedBook = req.body
    let edited = false
    for (let i = 0; i < books.length; i++) {
        let book = books[i];
        if (book.id === parseInt(id)){
            editedBook['id'] = book.id
            books[i] = editedBook
            edited = true
        }
        
    }

    if (edited) {
        res.status(200).json({ Success: "Book Edited" })
    }else{
        res.status(404).json({ Error: "Book does not exist" })
    }
})

app.listen(port, 'localhost', () => console.log(`Hello world app listening on port ${port}!`))