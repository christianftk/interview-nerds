const express = require('express')
const req = require('express/lib/request')
const router = express.Router()
const Author = require ('../models/author')
const Book = require ('../models/book')

router.get('/', async (req,res) => {
    try {
        const filters = {};
        
        const authors = await Author.find(req.query);
        res.json(authors);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get a specific author
router.get('/:id', getAuthor, (req, res) => {
    res.json(res.author)
})

router.get('/:id/books', getAuthor, async (req,res) =>{
    try{
        const books = await Book.find({author: res.author._id})
        res.json(books)
    } catch (err){
        res.status(500).json({ message: err.message })
    }
})

router.post('/', async (req,res) => {
    try {
        console.log(req.body)
        const author = new Author({
          name: req.body.name,
          dateOfBirth: req.body.dateOfBirth,
          dateOfDeath: req.body.dateOfDeath
        });
        console.log(author.name);

        // Save the author to the database
        const newAuthor = await author.save();

        res.status(201).json(newAuthor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
})

// Middleware to find a specific author by id

async function getAuthor(req,res,next) {
    let author
    try{
        author = await Author.findById(req.params.id)
        if (author == null) {
            return res.status(404).json({message: 'Cannot find author'})
        }
    } catch (err){
        return res.status(500).json({message: err.message})
    }

    res.author = author
    next()
}


module.exports = router