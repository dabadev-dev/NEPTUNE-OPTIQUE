// "use client";

// import { useRef, useState } from "react";
// import { Play } from "lucide-react";

// const videos = [
//   {
//     src: "/videos/formule1.mp4",
//     poster: "/images/video1.png",
//   },
//   {
//     src: "/videos/formule2.mp4",
//     poster: "/images/video2.png",
//   },
//   {
//     src: "/videos/formule3.mp4",
//     poster: "/images/video3.png",
//   },
// ];

// export default function FormulesVideo() {
//   const [playing, setPlaying] = useState(null);
//   const videoRefs = useRef([]);

//   const handlePlay = (index) => {
//     const video = videoRefs.current[index];

//     if (!video) return;

//     // Arrêter les autres vidéos
//     videoRefs.current.forEach((otherVideo, i) => {
//       if (otherVideo && i !== index) {
//         otherVideo.pause();
//       }
//     });

//     video.play();
//     setPlaying(index);
//   };

//   const handlePause = (index) => {
//     setPlaying(null);
//   };

//   return (
//     <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      
//       {/* TITRE */}
//       <div className="mb-12 text-center">
//         <h2 className="font-serif text-4xl font-medium text-[#3b3b3b] sm:text-5xl">
//           Découvrez nos formules en vidéo
//         </h2>
//       </div>

//       {/* VIDEOS */}
//       <div className="mx-auto grid max-w-[1250px] grid-cols-1 gap-5 md:grid-cols-3">
//         {videos.map((video, index) => (
//           <div
//             key={index}
//             className="
//               group
//               relative
//               aspect-[9/14]
//               w-full
//               overflow-hidden
//               bg-gray-100
//             "
//           >
//             <video
//               ref={(el) => {
//                 videoRefs.current[index] = el;
//               }}
//               src={video.src}
//               poster={video.poster}
//               playsInline
//               preload="metadata"
//               onPause={() => handlePause(index)}
//               onEnded={() => handlePause(index)}
//               className="
//                 h-full
//                 w-full
//                 object-cover
//               "
//             />

//             {/* BOUTON PLAY */}
//             {playing !== index && (
//               <button
//                 onClick={() => handlePlay(index)}
//                 aria-label={`Lire la vidéo ${index + 1}`}
//                 className="
//                   absolute
//                   left-1/2
//                   top-1/2
//                   flex
//                   h-20
//                   w-20
//                   -translate-x-1/2
//                   -translate-y-1/2
//                   items-center
//                   justify-center
//                   rounded-full
//                   border-2
//                   border-white
//                   bg-black/10
//                   backdrop-blur-[2px]
//                   transition
//                   duration-300
//                   hover:scale-110
//                   hover:bg-black/20
//                 "
//               >
//                 <Play
//                   size={30}
//                   strokeWidth={1.5}
//                   fill="white"
//                   className="ml-1 text-white"
//                 />
//               </button>
//             )}

//             {/* PETIT OVERLAY AU SURVOL */}
//             <div
//               className="
//                 pointer-events-none
//                 absolute
//                 inset-0
//                 bg-black/0
//                 transition
//                 duration-300
//                 group-hover:bg-black/5
//               "
//             />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }