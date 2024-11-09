const { nanoid } = require("nanoid");
const { AppError } = require("./errors");

class LibraryItem {
  constructor(data) {
    // Validasi nama buku
    if (!data.name || data.name.trim() === "") {
      throw new AppError("Gagal menambahkan buku. Mohon isi nama buku", 400);
    }

    // Validasi `readPage` tidak boleh lebih besar dari `pageCount`
    if (data.readPage > data.pageCount) {
      throw new AppError(
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        400
      );
    }

    this.id = nanoid(10);
    this.name = data.name;
    this.year = data.year;
    this.author = data.author;
    this.summary = data.summary;
    this.publisher = data.publisher;
    this.pageCount = data.pageCount;
    this.readPage = data.readPage;
    this.finished = data.readPage === data.pageCount;
    this.reading = data.reading;
    this.insertedAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  update(data) {
    // Validasi nama buku saat pembaruan
    if (!data.name || data.name.trim() === "") {
      throw new AppError("Gagal memperbarui buku. Mohon isi nama buku", 400);
    }

    // Validasi `readPage` saat pembaruan
    if (data.readPage > data.pageCount) {
      throw new AppError(
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        400
      );
    }

    this.name = data.name;
    this.year = data.year;
    this.author = data.author;
    this.summary = data.summary;
    this.publisher = data.publisher;
    this.pageCount = data.pageCount;
    this.readPage = data.readPage;
    this.finished = data.readPage === data.pageCount;
    this.reading = data.reading;
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = { LibraryItem };
