import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from "next/router";

export default function Sampleplay() {
	const playlists = {

		ColorfulAnimal: [
			"/images/colorfulcat1.jpeg",
			"/images/colorfulcat2.jpeg",
			"/images/colorfuldog.jpeg",
			"/images/colorfulelephant.jpeg"
		],
		PixcelArt: [
			"/images/pixelart1.jpeg",
			"/images/pixelart2.jpeg",
			"/images/pixelart3.jpeg",
			"/images/pixelart4.jpeg"
		],
		Robot: [
			"/images/robot_1.jpeg",
			"/images/robot_2.jpeg",
			"/images/robot_3.jpeg",
			"/images/robot_4.jpeg"
		],
		Microscope: [
			"/images/cell_1.jpeg",
			"/images/cell_2.jpeg",
			"/images/cell_5.jpeg",
			"/images/cell_6.jpeg"
		],
		SF: [
			"/images/space alien.png",
			"/images/spaceboys.jpeg",
			"/images/spacewomen.png"
		]
	};
	const router = useRouter();

	const handleGoBack = () => {
		router.push('/');
	};


	const [currentPlaylist, setCurrentPlaylist] = useState('Microscope');
	const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

	const nextSlide = () => {
		setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % playlists[currentPlaylist].length);
	};

	const prevSlide = () => {
		setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + playlists[currentPlaylist].length) % playlists[currentPlaylist].length);
	};

	const changePlaylist = (genre) => {
		setCurrentPlaylist(genre);
		setCurrentSlideIndex(0); // プレイリストを切り替えるときにスライドのインデックスをリセット
	};

	// 画像の自動切り替え
	useEffect(() => {
		const intervalId = setInterval(() => {
			nextSlide();
		}, 3000); // 3秒おきに次の画像に切り替え

		// コンポーネントがアンマウントされた場合に、intervalをクリアする
		return () => {
			clearInterval(intervalId);
		};
	}, [currentSlideIndex, currentPlaylist]);

	return (
		<>
			<Head>
				<title>Playlist（sample） || Treasure Art</title>
				<link rel="shortcut icon" href="logo.png" />
			</Head>

			<div className="flex items-center justify-center w-full h-screen bg-black">
				<div className="relative bg-black rounded-lg max-w-lg w-full max-h-[80%] h-auto">
					<img
						src={playlists[currentPlaylist][currentSlideIndex]}
						alt={`Image from ${currentPlaylist} ${currentSlideIndex + 1}`}
						className="object-cover w-full h-full rounded-lg"
					/>
					<div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white text-3xl font-semibold p-2 rounded">
						{currentPlaylist}
					</div>
					<div className="flex justify-between p-4 absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white rounded-b-lg">
						<button onClick={prevSlide}>前へ</button>
						<button onClick={handleGoBack}>戻る</button>
						<button onClick={nextSlide}>次へ</button>
					</div>
					<div className="absolute bottom-[-4rem] left-1/2 transform -translate-x-1/2 flex space-x-4 p-4">
						{Object.keys(playlists).map((genre) => (
							<button
								key={genre}
								onClick={() => changePlaylist(genre)}
								className="text-white bg-gray-800 p-2 rounded hover:bg-gray-700">
								{genre}
							</button>
						))}
					</div>
				</div>
			</div>

		</>
	);


}
