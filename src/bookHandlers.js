const { DataStore } = require("./datastore");
const { LibraryItem } = require("./bookEntity");
const { AppError } = require("./errors");

const bookStorage = new DataStore();

// Add a new book
function addBook(request, h) {
  const bookDetails = request.payload;
  try {
    const newBook = new LibraryItem(bookDetails);
    bookStorage.insertRecord(newBook.id, newBook);
    return h
      .response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: { bookId: newBook.id },
      })
      .code(201);
  } catch (error) {
    if (error instanceof AppError) {
      return h
        .response({ status: "fail", message: error.message })
        .code(error.statusCode);
    }
    return h
      .response({ status: "fail", message: "Internal server error" })
      .code(500);
  }
}

// Fetch all books
function fetchBooks(request, h) {
  try {
    const queryParams = request.query;
    let bookList = bookStorage.findAll();

    if (queryParams.name) {
      bookList = bookStorage.findByName(queryParams.name);
    } else if (queryParams.reading) {
      bookList = bookStorage.findByReadingStatus(queryParams.reading !== "0");
    } else if (queryParams.finished) {
      bookList = bookStorage.findByCompletionStatus(
        queryParams.finished !== "0"
      );
    }

    return h
      .response({ status: "success", data: { books: bookList } })
      .code(200);
  } catch (error) {
    console.error("Error from fetchBooks handler:", error);
    return h
      .response({ status: "fail", message: "Internal server error" })
      .code(500);
  }
}

// Get book by ID with better error handling
function fetchBookById(request, h) {
  const bookId = request.params.bookId;
  try {
    const book = bookStorage.findRecordById(bookId);
    return h.response({ status: "success", data: { book } }).code(200);
  } catch (error) {
    if (error instanceof AppError) {
      return h
        .response({ status: "fail", message: "Buku tidak ditemukan" })
        .code(404);
    }
    return h
      .response({ status: "fail", message: "Internal server error" })
      .code(500);
  }
}

// Update book with detailed validation error response
function modifyBook(request, h) {
  const bookId = request.params.bookId;
  const updatedData = request.payload;
  try {
    bookStorage.updateRecord(bookId, updatedData);
    return h
      .response({ status: "success", message: "Buku berhasil diperbarui" })
      .code(200);
  } catch (error) {
    if (error instanceof AppError) {
      return h
        .response({ status: "fail", message: error.message })
        .code(error.statusCode);
    }
    return h
      .response({ status: "fail", message: "Internal server error" })
      .code(500);
  }
}

// Delete book with improved error response
function removeBook(request, h) {
  const bookId = request.params.bookId;
  try {
    bookStorage.deleteRecord(bookId);
    return h
      .response({ status: "success", message: "Buku berhasil dihapus" })
      .code(200);
  } catch (error) {
    if (error instanceof AppError) {
      return h
        .response({
          status: "fail",
          message: "Buku gagal dihapus. Id tidak ditemukan",
        })
        .code(404);
    }
    return h
      .response({ status: "fail", message: "Internal server error" })
      .code(500);
  }
}

module.exports = { addBook, fetchBooks, fetchBookById, modifyBook, removeBook };
