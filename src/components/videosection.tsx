"use client";

import { useState } from "react";

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-white px-4 py-16 sm:px-6 md:py-20 lg:px-12">
      <div className="mx-auto max-w-6xl">

        {/* TITRE */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-[#293f91] sm:text-4xl">
            Découvrez nos formules en vidéo
          </h2>
        </div>

        {/* VIDEO */}
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[30px] bg-black shadow-lg">

          {!isPlaying ? (
            <>
              {/* IMAGE DE COUVERTURE */}
              <img
                src="/images/famille.png"
                alt="Découvrez nos formules Neptune Optique"
                className="aspect-video w-full object-cover"
              />

              {/* VOILE */}
              <div className="absolute inset-0 bg-black/20" />

              {/* BOUTON PLAY */}
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                aria-label="Lire la vidéo"
                className="
                  absolute
                  left-1/2
                  top-1/2
                  flex
                  h-20
                  w-20
                  -translate-x-1/2
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  text-[#293f91]
                  shadow-xl
                  transition
                  duration-300
                  hover:scale-110
                "
              >
                <span className="ml-1 text-3xl">
                  ▶
                </span>
              </button>
            </>
          ) : (
            /* VIDEO */
            <video
              className="aspect-video w-full object-cover"
              controls
              autoPlay
            >
              <source
                src="/videos/formules.mp4"
                type="video/mp4"
              />

              Votre navigateur ne supporte pas la lecture de cette vidéo.
            </video>
          )}

        </div>

      </div>
    </section>
  );
};

export default VideoSection;