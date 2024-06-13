module.exports = (objectPagination, query, countPage) => {

    if (query.page) {
        objectPagination.currentPage = parseInt(query.page);
    }

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;
    const totalPage = Math.ceil(countPage / objectPagination.limitItems);
    objectPagination.totalPage = totalPage;

    

    return objectPagination;
}

