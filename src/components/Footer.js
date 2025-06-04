import React from 'react'
import { Link } from 'react-router-dom'
import { LOGO } from '../utils/constants';

const Footer = () => {
  return (
    <div className='bg-black sm:px-16 px-8 py-7'>
        <div className='flex justify-center'>
            <Link href="/">
                <img className='w-[250px]' src={LOGO} alt='logo' />
            </Link>
        </div>

        <div className='flex max-md:flex-col mt-3 items-center justify-center'>
            <p className='md:flex gap-1 text-center text-white text-sm sm:text-lg' >Developed by King Smith <span className='hidden md:flex md:items-center'>|</span>  </p>
            <p className='text-center pl-1 text-white text-sm sm:text-lg' > © {new Date().getFullYear()} CineMatch. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer