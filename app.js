// book class -> represents book
class Book {
    constructor(title, author, comments) {
        this.title = title;
        this.author = author;
        this.comments = comments;
    }
}

// UI class: handles UI tasks  hello
class UI {
    static displayBooks() {
        const books = Store.getBooks()

        books.forEach((book)=> UI.addBookToList(book))
    }

    static addBookToList(book) {
        // create a row, "book-id"
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');


        row.innerHTML = `
            <td>${book.title} </td>
            <td>${book.author} </td>
            <td>${book.comments} </td>
            <td><a href="#" class="btn btn-danger btn-sm delete">
            X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')) {
            // gets the whole row 
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        // insert epic elert
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        // put something in the div^^
        setTimeout(() => document.querySelector('.alert').remove(), 
        2000)

        // removes in 2 seconds
    }


    static clearFields() {
        document.querySelector('#title').value = ''; 
        document.querySelector('#author').value = ''; 
        document.querySelector('#comments').value = ''; 
    }
}
// loops through books nad we add to list

// Store class -> takes care of storage
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        // checks if theres an item 

        return books;
    }

    static addBook(book) {
// book is string representing a book 
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(comments) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.comments === comments) {
                console.log('Removed!')
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// event -> display books 
document.addEventListener('DOMContentLoaded', UI.displayBooks);
document.querySelector('#book-form').addEventListener('submit', (e) =>{
    e.preventDefault()
    
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const comments = document.querySelector('#comments').value;

// checks if its a valid input

if(title ==='' || author === '' || comments === '') {
    UI.showAlert('Please fill in all fields', 'danger')
} else {
    UI.showAlert('Book Successfully Added!', 'success')
    const book = new Book(title, author, comments);

    // add book to the site
    // next step -> put to local storage and also clear form
    UI.addBookToList(book);
    Store.addBook(book);

    // clears field
    UI.clearFields();

}


});

// removing a book when button is pressed
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
 // e.target gives link
 Store.removeBook(e.target.parentElement.parentElement.querySelector('td:nth-child(3)').textContent.trim());

   
   
    UI.showAlert('Book Successfully Deleted!', 'success');
});

