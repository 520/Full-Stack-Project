class Page {
    constructor() {}

    static new(records, currentPage, totalPages) {
        return {
            records,
            currentPage,
            totalPages
        }
    }
}

module.exports = Page;
