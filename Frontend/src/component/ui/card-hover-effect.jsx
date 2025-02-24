import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import PropTypes from "prop-types";

export const HoverEffect = ({ items, className }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-10 ${className}`}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className="flex items-center space-x-4">
              {item.icon}
              <CardTitle>{item.title}</CardTitle>
            </div>
            <CardDescription>{item.description}</CardDescription>
            {item.content}
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({ className, children }) => {
  return (
    <div
      className={`rounded-2xl h-full w-full p-4 overflow-hidden bg-[#02101E] border border-transparent dark:border-[#041124] group-[]:border-cyan-500 relative shadow-black shadow-xl z-20 ${className}`}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export const CardTitle = ({ className, children }) => {
  return (
    <h4 className={`text-cyan-400 font-bold tracking-wide mt-4 ${className}`}>
      {children}
    </h4>
  );
};
export const CardDescription = ({ className, children }) => {
  return (
    <p
      className={`mt-8 mb-5 text-white tracking-wide leading-relaxed text-sm ${className}`}
    >
      {children}
    </p>
  );
};

CardTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

CardDescription.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

HoverEffect.propTypes = {
  items: PropTypes.array.isRequired,
  className: PropTypes.string,
};
