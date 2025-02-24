"use client";
import { motion, useInView, stagger } from "framer-motion";
import { cn } from "../../lib/utils";
import PropTypes from "prop-types";
import { useRef } from "react";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}) => {
  const wordsArray = words.split(" ");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false }); // Replay when in view

  const renderWords = () => {
    return (
      <motion.div
        ref={containerRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, filter: filter ? "blur(10px)" : "none" },
          visible: {
            opacity: 1,
            filter: "blur(0px)",
            transition: {
              staggerChildren: 0.2, // stagger the animation for each word
            },
          },
        }}
      >
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={`word-${idx}`}
              variants={{
                hidden: { opacity: 0, filter: filter ? "blur(10px)" : "none" },
                visible: { opacity: 1, filter: "blur(0px)" },
              }}
              transition={{ duration: duration }}
              className=" space-x-2"
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn(className)}>
      <div className="leading-snug tracking-wide" style={{ textShadow: "2px 2px 6px rgba(0, 0, 0, 0.7)" }}>
        {renderWords()}
      </div>
    </div>
  );
};

TextGenerateEffect.propTypes = {
  words: PropTypes.string.isRequired,
  className: PropTypes.string,
  filter: PropTypes.bool,
  duration: PropTypes.number,
};
