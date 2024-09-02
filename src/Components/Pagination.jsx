const Pagination = ({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage,
  nextPage,
  prevPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={prevPage}
        className="px-4 py-2 mx-1 bg-gray-200 border border-gray-300 rounded hover:bg-gray-300 disabled:opacity-50"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`px-4 py-2 mx-1 border border-gray-300 rounded ${
            number === currentPage
              ? "bg-[#0A043C] text-white"
              : "bg-white hover:bg-gray-200"
          }`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={nextPage}
        className="px-4 py-2 mx-1 bg-gray-200 border border-gray-300 rounded hover:bg-gray-300 disabled:opacity-50"
        disabled={currentPage === Math.ceil(totalProducts / productsPerPage)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
