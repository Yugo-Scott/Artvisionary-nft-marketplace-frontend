// components/Slideshow2.js
import { useState, useEffect } from 'react';

const Slideshow2 = ({ playlists, defaultPlaylist = 'ColorfulAnimal', width, height }) => {

	const [currentPlaylist, setCurrentPlaylist] = useState(defaultPlaylist);
	const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

	const nextSlide = () => {
		setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % playlists[currentPlaylist].length);
	};

	const prevSlide = () => {
		setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + playlists[currentPlaylist].length) % playlists[currentPlaylist].length);
	};

	const changePlaylist = (genre) => {
		setCurrentPlaylist(genre);
		setCurrentSlideIndex(0);
	};

	useEffect(() => {
		const intervalId = setInterval(() => {
			nextSlide();
		}, 5000);

		return () => {
			clearInterval(intervalId);
		};
	}, [currentSlideIndex, currentPlaylist]);

	return (

		<div style={{ width: `${width}px`, height: `${height}px` }} className="relative">
			{/* <div className={`relative w-${width} h-${height}`}> */}
			<img
				src={playlists[currentPlaylist][currentSlideIndex]}
				alt={`Image from ${currentPlaylist} ${currentSlideIndex + 1}`}
				className="absolute inset-0 object-cover w-full h-full"
			/>
		</div>

	);
}

export default Slideshow2;
