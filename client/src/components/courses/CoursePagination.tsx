import { cn } from "@/lib/utils";

interface CoursePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CoursePagination: React.FC<CoursePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const handlePageClick = (page: number) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      onPageChange(page);
      
      // Scroll to top of course section
      setTimeout(() => {
        const coursesSection = document.getElementById('courses-section');
        if (coursesSection) {
          coursesSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  };

  // Generate page numbers to display
  const renderPageNumbers = () => {
    const pageNumbers = [];
    
    // Always show first page
    pageNumbers.push(
      <a
        key={1}
        href="#"
        className={cn(
          "relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium",
          currentPage === 1
            ? "bg-[#0a192f] text-[#64ffda]"
            : "bg-[#1e1e1e] text-gray-300 hover:bg-[#172a46]"
        )}
        onClick={(e) => {
          e.preventDefault();
          handlePageClick(1);
        }}
      >
        1
      </a>
    );
    
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pageNumbers.push(
        <span
          key="ellipsis-start"
          className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-[#1e1e1e] text-sm font-medium text-gray-500"
        >
          ...
        </span>
      );
    }
    
    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <a
          key={i}
          href="#"
          className={cn(
            "relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium",
            currentPage === i
              ? "bg-[#0a192f] text-[#64ffda]"
              : "bg-[#1e1e1e] text-gray-300 hover:bg-[#172a46]"
          )}
          onClick={(e) => {
            e.preventDefault();
            handlePageClick(i);
          }}
        >
          {i}
        </a>
      );
    }
    
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pageNumbers.push(
        <span
          key="ellipsis-end"
          className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-[#1e1e1e] text-sm font-medium text-gray-500"
        >
          ...
        </span>
      );
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pageNumbers.push(
        <a
          key={totalPages}
          href="#"
          className={cn(
            "relative inline-flex items-center px-4 py-2 border border-gray-700 text-sm font-medium",
            currentPage === totalPages
              ? "bg-[#0a192f] text-[#64ffda]"
              : "bg-[#1e1e1e] text-gray-300 hover:bg-[#172a46]"
          )}
          onClick={(e) => {
            e.preventDefault();
            handlePageClick(totalPages);
          }}
        >
          {totalPages}
        </a>
      );
    }
    
    return pageNumbers;
  };

  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex justify-center">
      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        <a
          href="#"
          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-700 bg-[#1e1e1e] text-sm font-medium text-gray-300 hover:bg-[#172a46]"
          onClick={(e) => {
            e.preventDefault();
            handlePageClick(currentPage - 1);
          }}
        >
          <span className="sr-only">Previous</span>
          <i className="fas fa-chevron-left h-5 w-5"></i>
        </a>
        
        {renderPageNumbers()}
        
        <a
          href="#"
          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-700 bg-[#1e1e1e] text-sm font-medium text-gray-300 hover:bg-[#172a46]"
          onClick={(e) => {
            e.preventDefault();
            handlePageClick(currentPage + 1);
          }}
        >
          <span className="sr-only">Next</span>
          <i className="fas fa-chevron-right h-5 w-5"></i>
        </a>
      </nav>
    </div>
  );
};

export default CoursePagination;
