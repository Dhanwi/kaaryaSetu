"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

export const StickyScroll = ({ content, contentClassName }) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const sectionHeight = 1 / cardLength;
    const activeIndex = Math.min(
      Math.floor(latest / sectionHeight),
      cardLength - 1
    );
    setActiveCard(activeIndex);
  });

  // Cyberpunk-style colors
  const backgroundColors = ["#02101E", "#041124", "#020C1B"];
  const linearGradients = [
    "linear-gradient(to bottom right, #0052cc, #000814)", // Deep Blue
    "linear-gradient(to bottom right, #002855, #041124)", // Cyber Dark Blue
    "linear-gradient(to bottom right, #011627, #001F3F)", // Midnight Navy
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="h-[30rem] overflow-y-auto flex justify-center custom-scrollbar relative space-x-10 rounded-md p-10"
      ref={ref}
    >
      <div className="relative flex items-start px-10 w-full">
        <div className="max-w-2xl w-full">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-24">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-bold text-cyan-400"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                transition={{ duration: 0.3 }}
                className="text-lg text-gray-300 max-w-sm mt-1"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        style={{ background: backgroundGradient }}
        className={`hidden lg:block h-60 w-80 rounded-lg bg-gray-900 shadow-xl shadow-cyan-500/20 sticky top-10 overflow-hidden border border-cyan-500 ${contentClassName}`}
      >
        {content[activeCard]?.content ?? null}
      </div>
    </motion.div>
  );
};

StickyScroll.propTypes = {
  content: PropTypes.array.isRequired,
  contentClassName: PropTypes.string,
};

StickyScroll.defaultProps = {
  content: [],
  contentClassName: "",
};
