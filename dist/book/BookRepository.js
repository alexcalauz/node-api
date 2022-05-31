"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BookRepository {
    constructor() {
        this.books = [
            { id: 1, name: 'The Pragmatic Programmer' },
            { id: 2, name: 'Poems that Solve Puzzles' },
        ];
    }
    getBooks() {
        return this.books;
    }
}
exports.default = BookRepository;
//# sourceMappingURL=BookRepository.js.map