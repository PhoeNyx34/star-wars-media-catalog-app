import React from "react"

const AboutPageDesktop = () => {
    return (
        <div className="non-media-page">
            <div className="non-media-page-top about-header">
                <h1>About Holocron</h1>
            </div>
            <div className="about-section grid-x">
                <div className="cell medium-7">
                    <h2>A story about a site . . .</h2>
                    <p><span className="media-title">Holocron</span> is an interactive catalog that helps you track your love of Star Wars.</p>
                    <p>Scroll through the ever-growing list of media on the home page and click to view more information. Looking for something specific? Search and filter media to see just want you want to see.</p>
                    <p>With an account, you can note which media you're interested in, which you own, and which you've watched / read / played / etc. And since new Star Wars content comes out regularly, don't forget to check back!</p>
                </div>
                <div className="cell medium-5">
                    <iframe src="https://giphy.com/embed/3ornk57KwDXf81rjWM" width="100%" height="100%" frameBorder="0" allowFullScreen></iframe>
                    <p><a href="https://giphy.com/gifs/starwars-movie-star-wars-3ornk57KwDXf81rjWM" id="obi-wan-gif">via GIPHY</a></p>
                </div>
            </div>
            <div className="about-section grid-x">
                <div className="cell medium-5">
                    <iframe width="100%" height="100%" src="https://giphy.com/embed/gZXI7pNvN5AaY" frameBorder="0" allowFullScreen></iframe>
                    <p><a href="https://giphy.com/gifs/han-solo-star-wars-gZXI7pNvN5AaY">via GIPHY</a></p>
                </div>
                <div className="cell medium-7">
                    <h2 id="about-developer-header">. . . and its developer</h2>
                    <p>Born of passion, <span className="media-title">Holocron</span> was first conceived as a way for me to get back into coding.</p>
                    <p>A long, long time ago, pre-COVID-19 pandemic, I <em>hated</em> Star Wars. In my secluded boredom, I decided to check whether a conscious shift in my perspective on Star Wars would result in a shift in my opinion. The experiment went too well, and I became obsessed.</p>
                    <p>Fast forward a few years and I was feeling a supreme lack of general enthusiasm; suggested by my partner, I started this catalog to feed a hobby that wasn't either video gaming or watching TV.</p>
                    <p>Move on a bit further, and I've quit my job to enroll at a local coding bootcamp, which gave me the skills to take what I had started&mdash;what would've been an inefficient site&mdash;and create a site that has everything I want and more to come.</p>
                </div>
            </div>
        </div>
    )
}

export default AboutPageDesktop