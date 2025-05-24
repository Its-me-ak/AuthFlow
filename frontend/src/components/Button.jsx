import { motion } from "framer-motion";
import { Loader } from "lucide-react"; // or your own loader

const Button = ({
  type = "button",
  onClick,
  isLoading = false,
  children,
  className = "",
  ...props
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
        font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 
        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
        focus:ring-offset-gray-900 transition duration-200 ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader className="w-6 h-6 animate-spin mx-auto" />
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;
