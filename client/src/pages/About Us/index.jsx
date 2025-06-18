import React from 'react'
import Sidebar from '../components/Sidebar'
import AboutUs from './AboutUs'

const About = () => {
    return (
        <div className='flex'>
            <div className="w-56">
                <Sidebar/>
            </div>
            <div className='w-full h-screen bg-white text-black text-2xl'> 
                <AboutUs/>
            </div>
        </div>
    )
}

export default About
