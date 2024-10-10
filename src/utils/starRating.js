import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa"

function starRating(stars){

    if (stars > 9.5){
      return <p className="starRating">
        <span><FaStar /></span>
        <span><FaStar /></span>
        <span><FaStar /></span>
        <span><FaStar /></span>
        <span><FaStar /></span>
      </p>
    }else if(stars > 0 && stars < 1){
      return <p className="starRating">
        <span><FaStarHalfAlt /></span>
        <span><FaRegStar /></span>
        <span><FaRegStar /></span>
        <span><FaRegStar /></span>
        <span><FaRegStar /></span>
      </p>
    }else if(stars > 1 && stars < 2){
      return <p className="starRating">
        <span><FaStar /></span>
        <span><FaRegStar /></span>
        <span><FaRegStar /></span>
        <span><FaRegStar /></span>
        <span><FaRegStar /></span>
      </p>
    }else if(stars > 2 && stars < 3){
      return <p className="starRating">
        <span><FaStar /></span>
        <span><FaStarHalfAlt /></span>
        <span><FaRegStar /></span>
        <span><FaRegStar /></span>
        <span><FaRegStar /></span>
      </p>
    }else if(stars > 3 && stars < 4){
      return <p className="starRating">
        <span><FaStar /></span>
        <span><FaStar /></span>
        <span><FaRegStar /></span>
        <span><FaRegStar /></span>
        <span><FaRegStar /></span>
      </p>
    }else if(stars > 4 && stars < 5){
      return <p className="starRating">
        <span><FaStar /></span>
        <span><FaStar /></span>
        <span><FaStarHalfAlt /></span>
        <span><FaRegStar /></span>
        <span><FaRegStar /></span>
      </p>
    }else if(stars > 5 && stars < 6){
      return <p className="starRating">
        <span><FaStar /></span>
        <span><FaStar /></span>
        <span><FaStar /></span>
        <span><FaRegStar /></span>
        <span><FaRegStar /></span>
      </p>
    }else if(stars > 6 && stars < 7){
      return <p className="starRating">
        <span><FaStar /></span>
        <span><FaStar /></span>
        <span><FaStar /></span>
        <span><FaStarHalfAlt /></span>
        <span><FaRegStar /></span>
      </p>
    }else if(stars > 7 && stars < 8){
      return <p className="starRating">
        <span><FaStar /></span>
        <span><FaStar /></span>
        <span><FaStar /></span>
        <span><FaStar /></span>
        <span><FaRegStar /></span>
      </p>
    }else if(stars > 8 && stars < 9){
      return <p className="starRating">
        <span><FaStar /></span>
        <span><FaStar /></span>
        <span><FaStar /></span>
        <span><FaStar /></span>
        <span><FaStarHalfAlt /></span>
      </p>
    }

  }

  export default starRating;