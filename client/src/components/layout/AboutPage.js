import React, { useEffect, useState } from 'react'

import AboutPageDesktop from './AboutPageDesktop'
import AboutPageMobile from './AboutPageMobile'

const AboutPage = () => {
    const [pageWidth, setPageWidth] = useState(window.innerWidth)
    const breakpoint = 769

    useEffect(() => {
        window.addEventListener("resize", () => {
            setPageWidth(window.innerWidth)
        })
            
    })

    return pageWidth < breakpoint ? <AboutPageMobile /> : <AboutPageDesktop />
}

export default AboutPage