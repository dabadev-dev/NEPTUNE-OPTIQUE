import type { Product } from "../data/products"

interface FiltersProps {
  category: string
  shape: string
  type: string
  minPrice: number
  maxPrice: number

  setCategory: (value: string) => void
  setShape: (value: string) => void
  setType: (value: string) => void
  setMinPrice: (value: number) => void
  setMaxPrice: (value: number) => void

  products: Product[]
}

export default function Filters({
  category,
  shape,
  type,
  minPrice,
  maxPrice,
  setCategory,
  setShape,
  setType,
  setMinPrice,
  setMaxPrice,
  products,
}: FiltersProps) {
  return (
    <aside className="w-full lg:w-57.5">

      {/* ================= CATÉGORIES ================= */}

      <div className="mb-8">

        <h2 className="mb-4 font-serif text-lg">
          Des Lunettes Pour Tous
        </h2>

        {["Enfants", "Femmes", "Hommes"].map((item) => (
          <label
            key={item}
            className="flex cursor-pointer items-center justify-between py-2 text-sm"
          >
            <div className="flex items-center gap-2">

              <input
                type="radio"
                name="category"
                checked={category === item}
                onChange={() => setCategory(item)}
                className="accent-[#29438f]"
              />

              <span>{item}</span>

            </div>

            <span className="text-xs text-gray-500">
              (
              {
                products.filter(
                  (product) => product.category === item
                ).length
              }
              )
            </span>
          </label>
        ))}

        {/* Toutes */}
        <button
          onClick={() => setCategory("")}
          className="mt-2 text-xs text-[#29438f] underline"
        >
          Voir toutes
        </button>

      </div>

      {/* ================= TYPES DE MONTURES ================= */}

      <div className="mb-8">

        <h2 className="mb-4 font-serif text-lg">
          Types De Montures
        </h2>

        {[
          "Carrées",
          "Ovales",
          "Rectangulaires",
          "Rondes",
        ].map((item) => (
          <label
            key={item}
            className="flex cursor-pointer items-center gap-2 py-2 text-sm"
          >
            <input
              type="radio"
              name="shape"
              checked={shape === item}
              onChange={() => setShape(item)}
              className="accent-[#29438f]"
            />

            <span>Montures {item}</span>
          </label>
        ))}

        <button
          onClick={() => setShape("")}
          className="mt-2 text-xs text-[#29438f] underline"
        >
          Toutes les montures
        </button>

      </div>

      {/* ================= TYPE LUNETTES ================= */}

      <div className="mb-8">

        <h2 className="mb-4 font-serif text-lg">
          Type De Lunette
        </h2>

        {["Optiques", "Solaires"].map((item) => (
          <label
            key={item}
            className="flex cursor-pointer items-center gap-2 py-2 text-sm"
          >
            <input
              type="radio"
              name="type"
              checked={type === item}
              onChange={() => setType(item)}
              className="accent-[#29438f]"
            />

            <span>Lunettes {item}</span>
          </label>
        ))}

        <button
          onClick={() => setType("")}
          className="mt-2 text-xs text-[#29438f] underline"
        >
          Tous les types
        </button>

      </div>

      {/* ================= PRIX ================= */}

      <div>

        <h2 className="mb-5 font-serif text-lg">
          Grille Tarifaire
        </h2>

        <div className="mb-4 flex items-center justify-between gap-2">

          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-24 border border-gray-300 px-2 py-2 text-xs outline-none"
            placeholder="Min"
          />

          <span>-</span>

          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-24 border border-gray-300 px-2 py-2 text-xs outline-none"
            placeholder="Max"
          />

        </div>

        <button
          onClick={() => {
            setMinPrice(25.000)
            setMaxPrice(350.000)
          }}
          className="bg-[#29438f] px-6 py-2 text-xs font-semibold text-white transition hover:bg-[#1d316e]"
        >
          FILTER
        </button>

      </div>

    </aside>
  )
}