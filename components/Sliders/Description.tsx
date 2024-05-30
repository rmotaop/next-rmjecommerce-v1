import React from "react";
import { images } from "./Constants";
import { motion } from "framer-motion";
import Link from "next/link";
import { LeftArrow } from "@/public/arrows/left";
import { RightArrow } from "@/public/arrows/right";

type Props = {
  activeImage: any;
  clickNext: any;
  clickPrev: any;
};

const Description = ({ activeImage, clickNext, clickPrev }: Props) => {
  return (
    <div className="grid place-items-start w-full bg-[#e7dfd9] relative md:rounded-tr-3xl md:rounded-br-3xl">
      <div className="uppercase text-sm absolute right-4 top-2 underline-offset-4 underline">
        rmjEcommerce
      </div>
      {images.map((elem, idx) => (
        <div
          key={idx}
          className={`${
            idx === activeImage
              ? "block w-full h-full md:h-[50vh] py-20 md:px-20 px-10 text-left"
              : "hidden"
          }`}
        >
          <motion.div
            initial={{
              opacity: idx === activeImage ? 0 : 0.5,
              scale: idx === activeImage ? 0.5 : 0.3,
            }}
            animate={{
              opacity: idx === activeImage ? 1 : 0.5,
              scale: idx === activeImage ? 1 : 0.3,
            }}
            transition={{
              ease: "linear",
              duration: 2,
              x: { duration: 1 },
            }}
            className="w-full"
          >
            <div className="py-1 text-3xl md:text-sm md:h-8 font-extrabold">
              {elem.title}
            </div>
            <div className="leading-relaxed font-medium text-base tracking-wide ms:text-balance h-30 md:h-8 md:text-sm mb-12 italic text-gray-600">
              {" "}
              {elem.desc}
            </div>
          </motion.div>

          <Link
            className="bg-[#caab54] text-white uppercase px-4 py-2 rounded-md mt-6"
            href={`/product/${elem.slug}`}
          >
            Compre agora
          </Link>

          <div className="absolute md:bottom-1 bottom-10 right-10 md:right-0 w-full flex justify-center items-center">
            <div
              className=" mr-1 absolute bottom-2 right-10 cursor-pointer"
              onClick={clickPrev}
            >
              <LeftArrow className="h-10 w-10" />
            </div>

            <div
              className=" absolute bottom-2 right-2 cursor-pointer"
              onClick={clickNext}
            >
              <RightArrow className="h-10 w-10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Description;
