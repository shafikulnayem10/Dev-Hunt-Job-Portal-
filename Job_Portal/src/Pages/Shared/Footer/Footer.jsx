import React from 'react';
import { motion } from 'framer-motion'; // ✅ Import Framer Motion

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Footer = () => {
  return (
    <motion.footer
      className="footer sm:footer-horizontal bg-base-200 text-base-content p-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 🌀 Logo and About */}
      <motion.aside variants={childVariants}>
        <motion.svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          className="fill-current mb-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
        >
          <path d="M22.672 15.226l-2.432.811..." />
        </motion.svg>
        <p>
          ACME Industries Ltd.
          <br />
          Providing reliable tech since 1992
        </p>
      </motion.aside>

      {/* 📦 Services */}
      <motion.nav variants={childVariants}>
        <h6 className="footer-title">Services</h6>
        {['Branding', 'Design', 'Marketing', 'Advertisement'].map((item, i) => (
          <motion.a
            key={i}
            className="link link-hover"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item}
          </motion.a>
        ))}
      </motion.nav>

      {/* 🏢 Company */}
      <motion.nav variants={childVariants}>
        <h6 className="footer-title">Company</h6>
        {['About us', 'Contact', 'Jobs', 'Press kit'].map((item, i) => (
          <motion.a
            key={i}
            className="link link-hover"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item}
          </motion.a>
        ))}
      </motion.nav>

      {/* 🧾 Legal */}
      <motion.nav variants={childVariants}>
        <h6 className="footer-title">Legal</h6>
        {['Terms of use', 'Privacy policy', 'Cookie policy'].map((item, i) => (
          <motion.a
            key={i}
            className="link link-hover"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item}
          </motion.a>
        ))}
      </motion.nav>
    </motion.footer>
  );
};

export default Footer;
