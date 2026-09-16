export default function VideoSection() {
  const videos = [
    {
      id: 1,
      videoId: "jpSzAzjizYk",
    },
    {
      id: 2,
      videoId: "BCsWRq2hvbs",
    },
    {
      id: 3,
      videoId: "SVUMYnpSpO4",
    },
  ];

  return (
    <section className="w-full bg-white px-4 py-16 md:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* TITRE */}
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

        {/* VIDÉOS */}
        <div
          className="
            grid
            grid-cols-1
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {videos.map((video) => (
            <div
              key={video.id}
              className="
                relative
                aspect-9/16
                w-full
                overflow-hidden
                bg-gray-100
              "
            >
              <iframe
                src={`https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1`}
                title="Vidéo Neptune Optique"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  border-0
                "
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
