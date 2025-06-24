// //@ts-ignore
// import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
// import { motion } from "framer-motion";

// import { useState } from "react";
// import { AnimatePresence } from "framer-motion";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "./ui/dialog";

// const SlideShow = ({ images }: { images: string[] }) => {
//   const [hovering, setHovering] = useState(false);
//   return (
//     <Splide
//       options={{
//         autoplay: "true",
//         perPage: 1,
//         // start: 0,
//         rewind: true,
//         padding: {left:'3rem',right:'3rem'},
//         gap: "1rem",
//       }}
//       hasTrack={false}
//     >
//       <SplideTrack>
//         {images.map((image, idx) => (
//           <SplideSlide key={idx} className="flex items-center">
//             <Dialog>
//               <DialogTrigger
//                 className="relative"
//                 onMouseEnter={() => setHovering(true)}
//                 onMouseLeave={() => setHovering(false)}
//               >
//                 <img
//                 src={image}
//                 alt="screenshot"
//                 width={1000}
//                 height={1000}
//                 className="w-full rounded-lg h-auto"
//                 />

//                 <AnimatePresence>
//                   {hovering && (
//                     <motion.div
//                       className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 text-white backdrop-blur-[1px]"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                     >
//                       Click to zoom
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </DialogTrigger>
//               <DialogContent className="min-w-[90vw] h-[90vh] bg-transparent outline-none border-none p-0 m-0">
//                 <DialogHeader className="w-full">
//                   {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
//                   <DialogDescription>
//                     {image.split("/").pop()}
//                   </DialogDescription>
//                 </DialogHeader>
//                 <img
//                     src={image}
//                     alt="screenshot"
//                     width={1000}
//                     height={1000}
//                     className="w-full"
//                     style={{ objectFit: "contain", width: "100vw" }}
//                 />

//               </DialogContent>
//             </Dialog>
//           </SplideSlide>
//         ))}
//       </SplideTrack>
//       <div className="splide__progress">
//         <div className="splide__progress__bar"></div>
//       </div>
//     </Splide>
//   );
// };
// export default SlideShow;

import { Swiper, SwiperSlide } from "swiper/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";

import 'swiper/css';

const SlideShow = ({ images }: { images: string[] }) => {
  const [hoveringIndex, setHoveringIndex] = useState<number | null>(null);

  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 3000 }}
      className="w-full"
    >
      {images.map((image, idx) => (
        <SwiperSlide key={idx} className="flex items-center">
          <Dialog>
            <DialogTrigger
              className="relative"
              onMouseEnter={() => setHoveringIndex(idx)}
              onMouseLeave={() => setHoveringIndex(null)}
            >
              <img
                src={image}
                alt="screenshot"
                width={1000}
                height={1000}
                className="w-full rounded-lg h-auto"
              />

              <AnimatePresence>
                {hoveringIndex === idx && (
                  <motion.div
                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 text-white backdrop-blur-[1px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Click to zoom
                  </motion.div>
                )}
              </AnimatePresence>
            </DialogTrigger>
            <DialogContent className="min-w-[90vw] h-[90vh] bg-transparent outline-none border-none p-0 m-0">
              <DialogHeader className="w-full">
                <DialogDescription>{image.split("/").pop()}</DialogDescription>
              </DialogHeader>
              <img
                src={image}
                alt="screenshot"
                width={1000}
                height={1000}
                className="w-full"
                style={{ objectFit: "contain", width: "100vw" }}
              />
            </DialogContent>
          </Dialog>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SlideShow;
