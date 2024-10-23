import { Link } from "react-router-dom";
import Header from "./Header";

const Body = () => {
  return (
    <div className="pt-96" >
        <h1 className="text-6xl">Sankar</h1>
        <Link to="/browse" className="text-2xl">Browse</Link>
        <Link to="/login" className="text-2xl">Login</Link>
    </div>
  )
}

export default Body;