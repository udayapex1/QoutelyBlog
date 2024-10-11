import React from 'react'
import { BackgroundGradient } from './ui/GradientHover'
import Image from 'next/image'
import Typewriter from 'typewriter-effect'


function AboutQ() {
  return (
   <BackgroundGradient>
     <section id="about" class=" m-2 bg-white rounded-xl flex gap-1 md:flex-row sm:flex-col ">
    <div class=" container m-10 text-center px-4 w-[100%]">
      <div>
      <h2 class="orange_gradient text-4xl font-bold text-gray-800 mb-6">About Us</h2>
      </div>
        <p class="text-lg text-gray-700 mb-4">
            Welcome to Quotely, a platform where words inspire and connect. Our mission is to create a community
            where everyone can share their thoughts, experiences, and wisdom through quotes. We believe that
            every voice matters, and every quote has the power to resonate with someone, somewhere.
        </p>
        <p class="text-lg text-gray-700">
            At Quotely, we encourage authenticity. When you share a quote, you reveal your identity, allowing others
            to connect with you on a deeper level. Join us in celebrating the beauty of expression and the power
            of words!
        </p>
    </div>
  
</section>
   </BackgroundGradient>
  )
}

export default AboutQ