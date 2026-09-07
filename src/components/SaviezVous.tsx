import { Link } from "react-router-dom";

export default function SaviezVous() {
  return (
    <section className="w-full">

      {/* ================= LE SAVIEZ-VOUS ================= */}
      <div
        className="
          flex
          min-h-105
          w-full
          flex-col
          items-center
          justify-center
          bg-[#071321]
          px-5
          py-16
          text-center
          md:min-h-117.5
          md:px-8
          lg:px-16
        "
      >

        {/* TITRE */}
        <h2
          className="
            font-serif
            text-3xl
            font-bold
            text-white
            md:text-4xl
            lg:text-5xl
          "
        >
          Le saviez-vous ?
        </h2>

        {/* DESCRIPTION */}
        <p
          className="
            mt-4
            max-w-190
            text-base
            font-medium
            leading-6
            text-white
            md:text-lg
            md:leading-7
          "
        >
          Le dépistage visuel est totalement gratuit exclusivement au sein
          de notre boutique de Keur Massar (en face de SEDIMA). Passez nous
          voir pour faire le point sur votre santé visuelle !
        </p>

        {/* ================= BOUTONS ================= */}
        <div
          className="
            mt-10
            flex
            flex-col
            items-center
            justify-center
            gap-4
            sm:flex-row
          "
        >

          {/* BOUTON OÙ NOUS TROUVER */}
          <Link
            to="/contact"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-full
              bg-white
              px-6
              py-2.5
              text-base
              font-medium
              text-gray-600
              shadow-sm
              transition
              duration-300
              hover:scale-105
              hover:shadow-lg
            "
          >
            {/* Icône localisation */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z"
              />
              <circle cx="12" cy="10" r="2.2" />
            </svg>

            Où nous trouver ?
          </Link>

          {/* BOUTON RENDEZ-VOUS */}
          <Link
            to="/rendez-vous"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-full
              border-2
              border-white
              bg-transparent
              px-6
              py-2
              text-base
              font-medium
              text-white
              transition
              duration-300
              hover:bg-white
              hover:text-[#071321]
            "
          >
            {/* Icône téléphone */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M22 16.92v3a2 2 0 0 1-2.18 2
                19.79 19.79 0 0 1-8.63-3.07
                19.5 19.5 0 0 1-6-6
                19.79 19.79 0 0 1-3.07-8.67
                A2 2 0 0 1 4.11 2h3
                a2 2 0 0 1 2 1.72
                12.84 12.84 0 0 0 .7 2.81
                2 2 0 0 1-.45 2.11L8.09 9.91
                a16 16 0 0 0 6 6l1.27-1.27
                a2 2 0 0 1 2.11-.45
                12.84 12.84 0 0 0 2.81.7
                A2 2 0 0 1 22 16.92Z"
              />
            </svg>

            Prendre Rendez-vous
          </Link>

        </div>

        {/* ================= SERVICE CLIENT ================= */}
        <p
          className="
            mt-10
            text-sm
            font-semibold
            text-white
            md:text-base
          "
        >
          Service client disponible du Lundi au vendredi de 9h à 18h
        </p>

      </div>

     

    </section>
  );
}