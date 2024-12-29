import { assets } from "../assets/assets";
import { motion } from "motion/react";

const Footer = () => {
  return (
    <div className="flex items-center justify-between gap-4 py-3 mt-20">
      <img src={assets.logo} alt="logo" width={150} />
      <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">
        Copyright @luckyGalav.dev | All right reserved.
      </p>

      <div className="flex gap-2.5 cursor-pointer">
        <motion.img
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            default: { duration: 0.5 },
            opacity: { delay: 0.8, duration: 1 },
          }}
          src={assets.facebook_icon}
          alt="facebook_icon"
          width={35}
        />
        <motion.img
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            default: { duration: 0.5 },
            opacity: { delay: 0.8, duration: 1 },
          }}
          src={assets.twitter_icon}
          alt="twitter_icon"
          width={35}
        />
        <motion.img
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            default: { duration: 0.5 },
            opacity: { delay: 0.8, duration: 1 },
          }}
          src={assets.instagram_icon}
          alt="instagram_icon"
          width={35}
        />
      </div>
    </div>
  );
};

export default Footer;
