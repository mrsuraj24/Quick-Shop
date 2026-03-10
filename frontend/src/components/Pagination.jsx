import { useSelector } from 'react-redux';

function Pagination({
    currentPage,
    onPageChange,
    activeClass = 'active',
    nextPageText = "Next",
    prevPageText = "Prev",
    firstPageText = "1st",
    lastPageText = "Last"
}) {
    const { totalPages, products } = useSelector((state) => state.product);
    if (products.length === 0 || totalPages <= 1) return null;

    // Generate page number
    const getPageNumbers = () => {
        const pageNumbers = [];
        const pageWindow = 2;
        for (let i = Math.max(1, currentPage - pageWindow); i <= Math.min(totalPages, currentPage + pageWindow); i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    }
    const baseBtn =
        "w-15 h-10  px-4 py-2 text-sm  font-semibold rounded-full border transition-all duration-200";
    const normalBtn =
        "w-15 h-10  bg-white text-gray-700 border-gray-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 hover:shadow-md";
    const activeBtn =
        "w-15 h-10 bg-indigo-600 text-white border-indigo-600 shadow-md cursor-default scale-105 ";
    const disabledBtn =
        "w-15 h-10 bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed";
    return (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-24 px-4 py-3 bg-white/70 backdrop-blur-md rounded-full shadow-sm">
            {/* Previous ans first button */}
            {
                currentPage > 1 && (
                    <>
                        <button className={`${baseBtn} ${normalBtn}`} onClick={() => onPageChange(1)}>{firstPageText}</button>
                        <button className={`${baseBtn} ${normalBtn}`} onClick={() => onPageChange(currentPage - 1)}>{prevPageText}</button>
                    </>
                )
            }
            {/* Display numbers */}
            {
                getPageNumbers().map((number) => (
                    <button className={`${baseBtn} ${currentPage === number ? activeBtn : normalBtn}`} key={number} onClick={() => onPageChange(number)}>
                        {number}
                    </button>
                ))
            }
            {/* Last ans next button */}
            {
                currentPage < totalPages && (
                    <>
                        <button className={`${baseBtn} ${normalBtn}`} onClick={() => onPageChange(currentPage + 1)}>
                            {nextPageText}
                        </button>
                        <button className={`${baseBtn} ${normalBtn}`} onClick={() => onPageChange(totalPages)}>
                            {lastPageText}
                        </button>
                    </>
                )
            }
        </div>
    )
}

export default Pagination