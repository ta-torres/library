class Library {
    constructor() {
        this.books = {};
    }

    addBook(book) {
        this.books[book.title] = book;
    }

    removeBook(title) {
        delete this.books[title];
    }
}

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus()}`;
    }

    readStatus() {
        return this.isRead ? "Already read" : "Not read yet";
    }

    toggleRead() {
        this.isRead = !this.isRead;
    }
}

const library = new Library();

// Event listeners
document.addEventListener("DOMContentLoaded", displayBooks);

document.querySelector(".add-book").addEventListener("click", () => toggleForm());

document.querySelector(".submit").addEventListener("click", (e) => {
    e.preventDefault();
    submitForm();
});

document.querySelector(".library").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        const title = e.target.closest(".card").querySelector(".title").textContent;
        library.removeBook(title);
        displayBooks();
    }
    if (e.target.classList.contains("toggle-read")) {
        const title = e.target.closest(".card").querySelector(".title").textContent;
        const book = library.books[title];
        book.toggleRead();
        displayBooks();
    }
});

// Functions

function displayBooks() {
    const booksContainer = document.querySelector(".books");
    booksContainer.textContent = "";

    for (const title in library.books) {
        if (library.books.hasOwnProperty(title)) {
            const book = library.books[title];

            const card = document.createElement("div");
            card.classList.add("card");

            const bookTitle = document.createElement("h1");
            bookTitle.classList.add("title");
            bookTitle.textContent = book.title;

            const bookAuthor = document.createElement("p");
            bookAuthor.classList.add("author");
            bookAuthor.textContent = book.author;

            const bookPages = document.createElement("p");
            bookPages.classList.add("pages");
            bookPages.textContent = `${book.pages} pages`;

            const bookRead = document.createElement("p");
            bookRead.classList.add("read");
            bookRead.textContent = book.readStatus();

            const btnContainer = document.createElement("div");
            btnContainer.classList.add("buttons");

            const toggleReadBtn = document.createElement("button");
            toggleReadBtn.classList.add("toggle-read");
            toggleReadBtn.textContent = book.isRead ? "Mark unread" : "Mark read";

            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete");
            deleteBtn.textContent = "Delete";

            btnContainer.appendChild(toggleReadBtn);
            btnContainer.appendChild(deleteBtn);

            card.appendChild(bookTitle);
            card.appendChild(bookAuthor);
            card.appendChild(bookPages);
            card.appendChild(bookRead);
            card.appendChild(btnContainer);

            booksContainer.appendChild(card);
        }
    }
}

function addBookToLibrary(title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead);
    library.addBook(book);
}

function toggleForm() {
    const form = document.querySelector(".form-container");
    form.style.display = form.style.display === "none" ? "block" : "none";
}

function clearForm() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#pages").value = "";
    document.querySelector("#read").checked = false;
}

function submitForm() {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;

    if (title === "" || author === "" || pages === "") {
        alert("Please fill out all the fields");
        return;
    }

    if (isNaN(pages) || pages <= 0) {
        alert("Please enter a valid number of pages");
        return;
    }

    addBookToLibrary(title, author, pages, read);
    displayBooks();
    clearForm();
}

// Test
const book = new Book("The Hobbit", "J.R.R. Tolkien", 287, false);
library.addBook(book);
displayBooks();
