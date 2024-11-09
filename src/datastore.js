const { AppError } = require("./errors");

class DataStore {
  collection;

  constructor() {
    this.collection = new Map();
  }

  insertRecord(id, item) {
    this.collection.set(id, item);
  }

  findAll() {
    return this._filterItems(() => true);
  }

  findByReadingStatus(readingStatus) {
    return this._filterItems((item) => item.reading === readingStatus);
  }

  findByCompletionStatus(completionStatus) {
    return this._filterItems((item) => item.finished === completionStatus);
  }

  findByName(name) {
    return this._filterItems((item) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  findRecordById(id) {
    const item = this.collection.get(id);
    if (!item) throw new AppError("Buku tidak ditemukan", 404);
    return item;
  }

  updateRecord(id, data) {
    const item = this.collection.get(id);
    if (!item)
      throw new AppError("Gagal memperbarui buku. Id tidak ditemukan", 404);
    item.update(data);
  }

  deleteRecord(id) {
    const item = this.collection.get(id);
    if (!item)
      throw new AppError("Buku gagal dihapus. Id tidak ditemukan", 404);
    this.collection.delete(id);
  }

  _filterItems(condition) {
    const items = [];
    this.collection.forEach((item, itemId) => {
      if (condition(item)) {
        items.push({ id: itemId, name: item.name, publisher: item.publisher });
      }
    });
    return items;
  }
}

module.exports = { DataStore };
