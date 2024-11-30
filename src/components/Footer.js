import React from 'react'
import { Link } from 'react-router-dom'

import { FaXTwitter, FaLinkedin, FaMedium, FaInstagram, FaRedditAlien, FaHeart   } from "react-icons/fa6";
import Login from './Login';
import { LOGO } from '../utils/constants';


const Footer = () => {
  return (
    <div className='bg-black sm:px-16 px-8 py-7'>
        <div className='flex justify-center'>
            <Link href="/">
                <img className='w-[250px]' src={LOGO} alt='logo' />
            </Link>
        </div>

        <div className=" gap-3 flex flex-col text-white">

            <div className='flex gap-3 justify-center sm:mt-5 text-2xl'>
                    <Link to='https://x.com/sankar_axi' target="_blank">
                        <span><FaXTwitter /></span>
                    </Link>
                    <Link to='https://www.linkedin.com/in/sankargnanasekar/' target="_blank" >
                        <span><FaLinkedin /></span>
                    </Link>
                    <Link to='' target="_blank" >
                        <span><FaMedium /></span>
                    </Link>
                    <Link to='https://instagram.com/sankar_axi' target="_blank" >
                        <span><FaInstagram /></span>
                    </Link>
                    <Link to='' target="_blank" >
                        <span><FaRedditAlien  /></span>
                    </Link>
                </div>
        </div>

        <div className='flex max-md:flex-col mt-3 items-center justify-center'>
            <p className='md:flex gap-1 text-center text-white text-sm sm:text-lg' >Developed by Sankar Gnanasekar <span className='hidden md:flex md:items-center'>|</span>  </p>
            <p className='text-center pl-1 text-white text-sm sm:text-lg' > © {new Date().getFullYear()} Filmnest. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer