"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import "../../CSS/Landing.css";

let interval;

export const CardStack = ({ items, offset, scaleFactor }) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState(items);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);
  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()); // move the last element to the front
        return newArray;
      });
    }, 5000);
  };
  return (
    <div className="relative  h-60 w-60 md:h-60 md:w-96">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute bg-[#020811] bg-opacity-98 h-70 w-[390px] md:h-70  md:w-[420px] rounded-3xl p-4 border border-t-2 border-b-4 border-l-0 border-r-0 flex flex-col justify-between shadow-white shadow-lg hover:shadow-lg hover:shadow-[#1FA3ED]/[0.5] backdrop-blur-md hover:bg-[#00112a] hover:border-l-2 hover:border-r-2 hover:border-t-0 hover:border-b-0 hover:bg-opacity-90 "
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
          >
            <div className="font-normal text-white dark:text-neutral-200">
              {card.content}
            </div>
            <div>
              <p className="font-medium dark:text-white">{card.name}</p>
              <p className="trust-safety-info hover:text-base hover:underline cursor-pointer mt-4">
                {card.explore}
                {/* <img src="/icons/arrow-icon.svg"></img> */}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

CardStack.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      explore: PropTypes.string.isRequired,
      className: PropTypes.string,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
  offset: PropTypes.number,
  scaleFactor: PropTypes.number,
};
