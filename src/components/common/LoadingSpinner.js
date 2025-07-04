import React from "react";
import { motion } from "framer-motion";
import "./LoadingSpinner.css";

const LoadingSpinner = ({ size = "medium", color = "#6a5acd" }) => {
  const getSize = () => {
    switch (size) {
      case "small":
        return 24;
      case "large":
        return 64;
      case "medium":
      default:
        return 40;
    }
  };

  const spinnerSize = getSize();

  return (
    <div className="loading-spinner-container">
      <motion.div
        className="loading-spinner"
        style={{
          width: spinnerSize,
          height: spinnerSize,
          borderColor: `${color} transparent transparent transparent`,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          ease: "linear",
          repeat: Infinity,
        }}
      />
    </div>
  );
};

export default LoadingSpinner; 