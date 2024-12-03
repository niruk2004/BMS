import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavBar from './Components/UI/NavBar';

const pageVariants = {
  initial: { opacity: 0, x: -500 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0 },
};

function AnimatedRoutes() {
  const location = useLocation();
  const firstParam = location.pathname.split('/')[1];


  return (

    <motion.div
      key={firstParam}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <Outlet />
    </motion.div>

  );
}



export default function App() {

 

  return (
    <>
      <NavBar />

      <AnimatedRoutes />

    </>
  );
}
