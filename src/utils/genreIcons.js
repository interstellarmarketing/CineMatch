import { RiMickeyFill } from "react-icons/ri";
import { GiPunchBlast } from "react-icons/gi";
import { FaCompass } from "react-icons/fa";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { FaTheaterMasks } from "react-icons/fa";
import { RiPoliceBadgeFill } from "react-icons/ri";
import { IoMdVideocam } from "react-icons/io";
import { GiDramaMasks } from "react-icons/gi";
import { FaMagic } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";
import { GiGhost } from "react-icons/gi";
import { MdQueueMusic } from "react-icons/md";
import { TbUfo } from "react-icons/tb";
import { GiHarryPotterSkull } from "react-icons/gi";
import { GiDwarfHelmet } from "react-icons/gi";
import { RiCactusLine } from "react-icons/ri";
import { RiHeartsFill } from "react-icons/ri";
import { BsTvFill } from "react-icons/bs";
import { FaHatCowboy } from "react-icons/fa";

const genreIcons = (genre) => {
    if(genre === "Action") {
        return <GiPunchBlast />
    } else if(genre === "Adventure") {
        return <FaCompass />
    } else if(genre === "Animation") {
        return <RiMickeyFill />
    } else if(genre === "Comedy") {
        return <FaTheaterMasks />
    } else if(genre === "Crime") {
        return <RiPoliceBadgeFill />
    } else if(genre === "Documentary") {
        return <IoMdVideocam />
    } else if(genre === "Drama") {
        return <GiDramaMasks />
    } else if(genre === "Family") {
        return <MdOutlineFamilyRestroom />
    } else if(genre === "Fantasy") {
        return <FaMagic />
    } else if(genre === "History") {
        return <GiSandsOfTime />
    } else if(genre === "Horror") {
        return <GiGhost />
    } else if(genre === "Music") {
        return <MdQueueMusic />
    } else if(genre === "Mystery") {
        return <FaHatCowboy />
    } else if(genre === "Romance") {
        return <RiHeartsFill />
    } else if(genre === "Science Fiction") {
        return <TbUfo />
    } else if(genre === "TV Movie") {
        return <BsTvFill />
    } else if(genre === "Thriller") {
        return <GiHarryPotterSkull />
    } else if(genre === "War") {
        return <GiDwarfHelmet />
    } else if(genre === "Western") {
        return <RiCactusLine />
    } else {
        return null
    }
}

export default genreIcons

export const GENRES = [
    {logo: <GiPunchBlast /> ,genre: "Action"},
    {logo: <FaCompass />,genre: "Adventure"},
    {logo: <RiMickeyFill />,genre: "Animation"},
    {logo: <FaTheaterMasks />,genre: "Comedy"},
    {logo: <RiPoliceBadgeFill />,genre: "Crime"},
    {logo: <IoMdVideocam />,genre: "Documentary"},
    {logo: <GiDramaMasks />,genre: "Drama"},
    {logo: <MdOutlineFamilyRestroom />,genre: "Family"},
    {logo: <FaMagic />,genre: "Fantasy"},
    {logo: <GiSandsOfTime />,genre: "History"},
    {logo: <GiGhost />,genre: "Horror"},
    {logo: <MdQueueMusic />,genre: "Music"},
    {logo: <FaHatCowboy />,genre: "Mystery"},
    {logo: <RiHeartsFill />,genre: "Romance"},
    {logo: <TbUfo />,genre: "Science Fiction"},
    {logo: <BsTvFill />,genre: "TV Movie"},
    {logo: <GiHarryPotterSkull />,genre: "Thriller"},
    {logo: <GiDwarfHelmet />,genre: "War"},
    {logo: <RiCactusLine />,genre: "Western"},
]