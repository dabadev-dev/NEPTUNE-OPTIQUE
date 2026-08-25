export default function VideoSection() {
  return (
    <section className="w-full bg-white px-4 py-16 md:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* ================= TITRE ================= */}
        <div className="mb-10 text-center">
          <h2
            className="
              text-3xl
              font-bold
              text-gray-700
              md:text-4xl
              lg:text-5xl
            "
          >
            Découvrez nos formules en vidéo
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-base
              leading-relaxed
              text-gray-500
              md:text-lg
            "
          >
            Découvrez nos solutions et trouvez la formule adaptée à vos besoins.
          </p>
        </div>

        {/* ================= VIDÉO ================= */}
        <div
          className="
            relative
            mx-auto
            max-w-5xl
            overflow-hidden
            rounded-[30px]
            shadow-xl
          "
        >
          {/* Image de couverture */}
          <img
            src="/images/video-cover.png"
            alt="Découvrez nos formules en vidéo"
            className="
              aspect-video
              h-full
              w-full
              object-cover
            "
          />

          {/* Overlay */}
          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              bg-black/20
            "
          >
            {/* Bouton Play */}
            <button
              type="button"
              aria-label="Lire la vidéo"
              className="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-white
                shadow-2xl
                transition
                duration-300
                hover:scale-110
              "
            >
              <span
                className="
                  ml-1
                  text-2xl
                  text-[#29438f]
                "
              >
                ▶
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
