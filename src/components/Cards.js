import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Backup from "../assets/images/backup.png"

export const Cards = ({movie}) => {
  const { id, original_title, overview, poster_path } = movie;
  const image = poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : Backup ;

  return (
    <motion.div
      className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
      transition={{ duration: 0.3 }}
    >
        <Link to={`/movie/${id}`}>
          <img className="rounded-t-lg" src={image} alt="" />
        </Link>
      <div className="p-5">
           <Link to={`/movie/${id}`}>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{original_title}</h5>
           </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{overview}</p>
      </div>
   </motion.div>
  )
}