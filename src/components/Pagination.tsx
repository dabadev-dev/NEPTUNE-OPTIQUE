import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  setCurrentPage: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationProps) {

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="mt-12 flex items-center justify-center gap-2">

      {/* PRÉCÉDENT */}

      <button
        disabled={currentPage === 1}
        onClick={() =>
          setCurrentPage(currentPage - 1)
        }
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          border
          border-gray-300
          disabled:cursor-not-allowed
          disabled:opacity-30
        "
      >
        <ChevronLeft size={15} />
      </button>

      {/* NUMÉROS */}

      {Array.from(
        { length: totalPages },
        (_, index) => index + 1
      ).map((page) => (

        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`
            flex
            h-8
            w-8
            items-center
            justify-center
            text-xs
            ${
              currentPage === page
                ? "bg-[#29438f] text-white"
                : "border border-gray-300 text-gray-700"
            }
          `}
        >
          {page}
        </button>

      ))}

      {/* SUIVANT */}

      <button
        disabled={currentPage === totalPages}
        onClick={() =>
          setCurrentPage(currentPage + 1)
        }
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          border
          border-gray-300
          disabled:cursor-not-allowed
          disabled:opacity-30
        "
      >
        <ChevronRight size={15} />
      </button>

    </div>
  )
}