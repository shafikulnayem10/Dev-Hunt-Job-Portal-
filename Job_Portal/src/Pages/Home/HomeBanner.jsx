import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";

const floatSwayVariant = {
  animate: {
    y: [0, -15, 0],
    rotate: [0, 2, -2, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const childVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const HomeBanner = () => {
  const bannerRef = useRef(null);

  // Scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <motion.div
      ref={bannerRef}
      style={{ y: parallaxY }}
      className="hero bg-base-200 min-h-[60vh] overflow-hidden pt-16"
    >
      <div className="hero-content flex-col lg:flex-row-reverse">

        
        <motion.div
          className="flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
        
        </motion.div>

       
        <motion.div
          className="flex-1 text-center lg:text-left"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={childVariant}
            className="text-4xl sm:text-5xl font-bold text-primary"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          >
            Latest Jobs For YOU!
          </motion.h1>

          <motion.p variants={childVariant} className="py-6 max-w-lg mx-auto lg:mx-0">
            Tired of endless job hunts? We got you.
            From internships to top-tier roles — search smart, apply fast, and get hired.
            This isn’t just a job board — it’s your career launchpad. 🚀
          </motion.p>

         

          
          <motion.div
            whileHover={{
              y: -200,
              opacity: 0,
              transition: { duration: 2, ease: 'easeOut' },
            }}
            className="text-5xl mt-8 w-fit mx-auto cursor-pointer"
          >
            🎈
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomeBanner;





