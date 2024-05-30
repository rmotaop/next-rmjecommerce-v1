"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { images } from "./Constants";
import Description from "./Description";

const Slider = () => {
  const [activeImage, setActiveImage] = useState(0);

  const clickNext = useCallback(() => {
    activeImage === images.length - 1
      ? setActiveImage(0)
      : setActiveImage(activeImage + 1);
  }, [activeImage]);

  const clickPrev = () => {
    activeImage === 0
      ? setActiveImage(images.length - 1)
      : setActiveImage(activeImage - 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      clickNext();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [activeImage, clickNext]);

  return (
    <main className="grid place-items-center md:grid-cols-2 grid-cols-1 w-full mx-auto max-w-5xl shadow-2xl rounded-2xl">
      <div
        className={`w-full flex justify-center items-center gap-4 transition-transform ease-in-out duration-1000 md:rounded-2xl p-6 md:p-0`}
      >
        {images.map((elem, idx) => (
          <div
            key={idx}
            className={`${
              idx === activeImage
                ? "block w-full h-[50vh] object-fill transition-all duration-1000 ease-in-out"
                : "hidden"
            }`}
          >
            <Image
              src={elem.src}
              priority={false}
              alt=""
              width={400}
              height={400}
              className="w-full h-full object-fill md:rounded-tl-3xl md:rounded-bl-3xl"
            />
          </div>
        ))}
      </div>
      <Description
        activeImage={activeImage}
        clickNext={clickNext}
        clickPrev={clickPrev}
      />
    </main>
  );
};

export default Slider;
