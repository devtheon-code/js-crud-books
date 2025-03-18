// Function to load books from local storage
function loadBooks() {
  const storedBooks = localStorage.getItem('books');
  return storedBooks ? JSON.parse(storedBooks) : [];
}

// Function to save books to local storage
function saveBooks() {
  localStorage.setItem('books', JSON.stringify(books));
}

// Array to hold the books (initializing with books from local storage)
let books = loadBooks();

// Function to render the books list
function renderBooks() {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = ''; // Clear the current list

  books.forEach((book, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
            <div class="textDisplay">${book.title} by ${book.author}</div>
            <button onclick="deleteBook(${index})">Delete</button>
            <button onclick="editBook(${index})">Edit</button>
        `;
    bookList.appendChild(li);
  });
}

// Function to add a new book
function addBook() {
  const titleInput = document.getElementById('book-title');
  const authorInput = document.getElementById('book-author');

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (title && author) {
    // Add book to the array
    books.push({ title, author });

    // Save the updated books to local storage
    saveBooks();

    // Clear the inputs
    titleInput.value = '';
    authorInput.value = '';

    // Re-render the book list
    renderBooks();
  } else {
    alert('Please provide both a title and an author.');
  }
}

// Function to delete a book
function deleteBook(index) {
  books.splice(index, 1); // Remove the book from the array

  // Save the updated books to local storage
  saveBooks();

  // Re-render the book list
  renderBooks();
}

// Function to edit a book
function editBook(index) {
  const newTitle = prompt('Enter the new title:', books[index].title);
  const newAuthor = prompt('Enter the new author:', books[index].author);

  if (newTitle && newAuthor) {
    books[index] = { title: newTitle, author: newAuthor };

    // Save the updated books to local storage
    saveBooks();

    // Re-render the book list
    renderBooks();
  }
}

// Initial render
renderBooks();
