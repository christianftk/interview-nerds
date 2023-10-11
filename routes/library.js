const express = require('express')
const req = require('express/lib/request')
const router = express.Router()
const Author = require ('../models/author')
const Book = require('../models/book')
const authors = require('./authors')


// GET
// all available books - if no query
// all books in the library of a given author - if author in the query
// specific book - if title/id is passed
router.get('/', async (req,res) => {
    try {
        const filters = {};

        // Check if user requests a given title
        if (req.query.title) {
            filters.title = decodeURIComponent(req.query.title);
        }
        // Check if user requests all the books of a given author
        if (req.query.authorId) {
            filters.author._id = req.query.authorId;
        }
        let query = Book.find({...filters}).populate('author')

        if (req.query.deceased){
            console.log(req.query.deceased)
            if(req.query.deceased == true){
                query = query.where('author.dateOfDeath').ne(null);
            }
            if(req.query.deceased == false){
                query = query.where('author.dateOfDeath').equals(null);
            }
        }
        if (req.query.before){
            query = query.where('publishedIn').lt(req.query.before)
        }

        // Check if sorting by rating or publication date is requested
        if (req.query.sortBy) {
            if (req.query.sortBy === "rating" || req.query.sortBy === "publishedIn"){
                query = query.sort(req.query.sortBy)
            }
        }
        const books = await query
        
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get a specific book by id
router.get('/:id', getBook, (req, res) => {
    res.json(res.book)
})


router.post('/', async (req, res) => {
    try {
      // Create a new book with the author's reference
      const author = await Author.findById(req.body.author._id)

      const book = new Book({
        title: req.body.title,
        author: author._id, // Use the author's id (author must exist)
        publishedIn: req.body.publishedIn,
        rating: req.body.rating
      });
  
      // Save the book to the database
      const newBook = await book.save();
  
      res.status(201).json(newBook.populate('author'));
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

// (not requested) Update a book
router.patch('/:id', getBook, async (req, res) => {
    if (req.body.title != null){
        res.book.title = req.body.title
    }
    if (req.body.author != null){
        res.book.author = req.body.author
    }

    try{
        const updatedBook = await res.book.save();
        res.json(updatedBook)
    } catch (err){
        res.status(400).json({message: err.message})
    }
})

// Delete a book
router.delete('/:id', getBook, async (req, res) => {
    try{
        await res.book.deleteOne()
        res.json({message: 'Deleted book'})
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

// Middleware to find a specific book by id
async function getBook(req,res,next) {
    let book
    try{
        book = await Book.findById(req.params.id)
        if (book == null) {
            return res.status(404).json({message: 'Cannot find book'})
        }
    } catch (err){
        return res.status(500).json({message: err.message})
    }

    res.book = book
    next()
}

module.exports = router