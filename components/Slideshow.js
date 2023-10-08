// Slideshow.js
import React from 'react';

const Slideshow = ({ isModalOpen, setIsModalOpen, nfts, currentSlideIndex, mainURL, prevSlide, nextSlide, changeAspectRatio }) => {
	return (
		<>
			{isModalOpen && (
				<div className="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-70 flex items-center justify-center">
					<div className="w-full h-full bg-white relative">
						<img
							src={mainURL + nfts[currentSlideIndex]?.image}
							alt={nfts[currentSlideIndex]?.name}
							className="absolute inset-0 object-cover w-full h-full"
						/>
						<div className="flex justify-between p-4 absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white">
							<button onClick={prevSlide}>前へ</button>
							<button onClick={() => setIsModalOpen(false)}>閉じる</button>
							<button onClick={nextSlide}>次へ</button>
							<button onClick={() => changeAspectRatio('3:2')}>3:2 </button>
							<button onClick={() => changeAspectRatio('9:16')}>9:16 </button>
							<button onClick={() => changeAspectRatio('1:1')}>1:1 </button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Slideshow;
// export { Slideshow };
