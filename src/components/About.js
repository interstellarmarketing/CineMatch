import React from "react";

const About = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl pt-16 text-center">
        <h1 className="text-4xl font-bold mb-6 text-sky-400">About Filmnest</h1>
        <p className="text-lg mb-4">
          Welcome to <span className="text-sky-400 font-semibold">Filmnest</span>, your one-stop destination for exploring the world of movies! Whether you’re a casual viewer looking for your next favorite flick or a die-hard cinephile seeking to expand your knowledge about the film industry, we’ve got you covered.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-sky-300">Who We Are</h2>
        <p className="text-lg mb-4">
          At <span className="text-sky-400 font-semibold">Filmnest</span>, we’re passionate about the magic of cinema. Our platform brings together the art of storytelling and cutting-edge technology to deliver a seamless experience for discovering, learning, and sharing everything about movies.
        </p>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-sky-300 text-center">What We Do</h2>
            <ul className="text-lg list-none space-y-4">
                <li className="flex items-start gap-3">
                <div>
                    <strong className="text-sky-400">Personalized Recommendations: </strong> 
                    Powered by advanced algorithms and your preferences, Filmnest tailors movie suggestions just for you. Whether you’re in the mood for adventure, drama, or thrillers, we’ve got you covered.
                </div>
                </li>
                <li className="flex items-start gap-3">
                <div>
                    <strong className="text-sky-400">Comprehensive Movie Encyclopedia: </strong> 
                    Explore detailed information about movies, directors, actors, and behind-the-scenes trivia to enrich your cinematic knowledge.
                </div>
                </li>
                <li className="flex items-start gap-3">
                <div>
                    <strong className="text-sky-400">User-Centric Features:     </strong> 
                    Create personalized watchlists, rate and review movies, and stay updated with the latest releases and trends.
                </div>
                </li>
            </ul>
            </div>


        <h2 className="text-2xl font-semibold mt-8 mb-4 text-sky-300">Our Mission</h2>
        <p className="text-lg mb-4">
          We aim to unite movie lovers from around the globe by fostering a community where everyone can discover, explore, and celebrate the art of cinema. At <span className="text-sky-400 font-semibold">Filmnest</span>, we believe movies have the power to inspire, educate, and bring people together.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-sky-300">Join Us on This Cinematic Journey!</h2>
        <p className="text-lg">
          Whether you’re looking to discover hidden gems, relive iconic moments, or dive into the history of filmmaking, <span className="text-sky-400 font-semibold">Filmnest</span> is here to make your movie journey unforgettable. Let’s explore the stories that captivate, inspire, and entertain us all.
        </p>
      </div>
    </div>
  );
};

export default About;
