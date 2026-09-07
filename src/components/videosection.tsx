export default function VideoSection() {
  const videos = [
    {
      id: 1,
      title: "Nos offres",
      src: "/videos/video1.mp4",
    },
    {
      id: 2,
      title: "Nos services",
      src: "/videos/video2.mp4",
    },
    {
      id: 3,
      title: "Pourquoi nous choisir ?",
      src: "/videos/video3.mp4",
    },
  ];

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
        </div>

        {/* ================= 3 VIDÉOS ================= */}
        <div
          className="
            flex
            flex-col
            gap-6
            md:flex-row
            md:items-stretch
            md:justify-center
          "
        >
          {videos.map((video) => (
            <div
              key={video.id}
              className="
                group
                relative
                w-full
                overflow-hidden
                rounded-3xl
                bg-gray-100
                shadow-md
                transition
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
                md:w-1/3
              "
            >
              <video
                src={video.src}
                controls
                playsInline
                preload="metadata"
                className="
                  aspect-[9/16]
                  h-full
                  w-full
                  object-cover
                "
              />

              {/* TITRE */}
              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  bg-gradient-to-t
                  from-black/70
                  to-transparent
                  px-5
                  pb-5
                  pt-12
                "
              >
                <h3 className="text-lg font-bold text-white">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}