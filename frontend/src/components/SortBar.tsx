import {
  List,
  LayoutGrid,
  Grid3X3,
  ArrowDownUp,
} from "lucide-react"

export type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"

export type ViewMode = "list" | "grid2" | "grid3"

interface SortBarProps {
  sort: SortOption
  setSort: (value: SortOption) => void

  viewMode: ViewMode
  setViewMode: (value: ViewMode) => void
}

export default function SortBar({
  sort,
  setSort,
  viewMode,
  setViewMode,
}: SortBarProps) {
  return (
    <div className="mb-8 flex items-center justify-between border border-gray-200">

      {/* ================= TRI ================= */}

      <div className="flex items-center">

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value as SortOption)
          }
          className="
            h-10
            border-none
            bg-white
            px-4
            text-xs
            outline-none
          "
        >
          <option value="default">
            Tri par défaut
          </option>

          <option value="price-asc">
            Prix : croissant
          </option>

          <option value="price-desc">
            Prix : décroissant
          </option>

          <option value="name-asc">
            Nom : A → Z
          </option>

          <option value="name-desc">
            Nom : Z → A
          </option>
        </select>

        <ArrowDownUp
          size={15}
          className="mr-3 text-gray-500"
        />

      </div>

      {/* ================= VUE ================= */}

      <div className="flex items-center gap-4 px-4">

        {/* LISTE */}
        <button
          onClick={() => setViewMode("list")}
          className={
            viewMode === "list"
              ? "text-[#29438f]"
              : "text-gray-400"
          }
        >
          <List size={18} />
        </button>

        {/* 2 COLONNES */}
        <button
          onClick={() => setViewMode("grid2")}
          className={
            viewMode === "grid2"
              ? "text-[#29438f]"
              : "text-gray-400"
          }
        >
          <LayoutGrid size={18} />
        </button>

        {/* 3 COLONNES */}
        <button
          onClick={() => setViewMode("grid3")}
          className={
            viewMode === "grid3"
              ? "text-[#29438f]"
              : "text-gray-400"
          }
        >
          <Grid3X3 size={18} />
        </button>

      </div>

    </div>
  )
}