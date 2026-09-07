import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* ================= IMAGE ================= */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <img src="neptuneimg.png"
         
          alt="Famille Neptune Optique"
          className="h-full w-full object-cover"
        />

        {/* ================= COURBE BLANCHE ================= */}
        <div
          className="
            absolute
            -bottom-[100px]
            left-1/2
            h-[170px]
            w-[120%]
            -translate-x-1/2
            rounded-[50%]
            bg-white
          "
        />
      </div>

      {/* ================= CONTENU ================= */}
      <div className="relative z-10 -mt-2 bg-white px-4 pb-20 pt-8 text-center">
        {/* Titre */}
        <h1
          className="
            mx-auto
            max-w-5xl
            text-3xl
            font-bold
            leading-tight
            text-gray-700
            md:text-4xl
            lg:text-5xl
          "
        >
          Sublimez votre regard, affirmez votre style.
        </h1>

        {/* Sous-titre */}
        <p
          className="
            mx-auto
            mt-4
            max-w-2xl
            text-base
            text-gray-600
            md:text-lg
          "
        >
          Et si prendre soin de vos yeux devient enfin simple et accessible ?
        </p>

        {/* Petite phrase */}
        <p className="mt-3 text-base font-bold text-gray-700">Dalal ak jaam</p>

        {/* ================= BOUTONS ================= */}
        <div
          className="
            mt-6
            flex
            flex-col
            items-center
            justify-center
            gap-4
            sm:flex-row
          "
        >
          {/* Bouton 1 */}
          <Link
            to="/catalogue"
            className="
              rounded-full
              bg-[#29438f]
              px-7
              py-3
              text-sm
              font-bold
              text-white
              transition
              duration-300
              hover:bg-[#1f3474]
              hover:shadow-lg
            "
          >
            EXPLOREZ NOTRE BOUTIQUE
          </Link>

          {/* Bouton 2 */}
          <Link
            to="/offres"
            className="
              rounded-full
              border-2
              border-[#29438f]
              bg-white
              px-7
              py-3
              text-sm
              font-semibold
              text-[#29438f]
              transition
              duration-300
              hover:bg-[#29438f]
              hover:text-white
            "
          >
            DÉCOUVREZ NOS OFFRES
          </Link>
        </div>
      </div>
    </section>
  );
}
