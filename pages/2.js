import Head from "next/head";
import Image from "next/image";
import data from "../constants/mock-nft.json";
import mockartist from "../constants/mock-artist.json";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Footer, Header, Slideshow2 } from "../components";
import Link from 'next/link';

export default function Home() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const [addr, setAddr] = useState("");

  const router = useRouter();

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please Install MetaMask");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setIsWalletConnected(true);
      localStorage.setItem("walletAddress", accounts[0]);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const addr = localStorage.getItem("walletAddress");
    setAddr(addr);
  }, []);

  const playlists = {

    ColorfulAnimal: [
      "/images/colorfulcat1.jpeg",
      "/images/colorfulcat2.jpeg",
      "/images/colorfuldog.jpeg",
      "/images/colorfulelephant.jpeg",
      "/images/pixelart1.jpeg",
      "/images/pixelart2.jpeg",
      "/images/pixelart3.jpeg",
      "/images/pixelart4.jpeg",
      "/images/robot_1.jpeg",
      "/images/robot_2.jpeg",
      "/images/robot_3.jpeg",
      "/images/robot_4.jpeg",
      "/images/cell_1.jpeg",
      "/images/cell_2.jpeg",
      "/images/cell_5.jpeg",
      "/images/cell_6.jpeg",
      "/images/space alien.png",
      "/images/spaceboys.jpeg",
      "/images/spacewomen.png"
    ]
  };

  return (
    <div className="bg-black top-0">
      <Head>
        <title>Treasure Art</title>
        <link rel="shortcut icon" href="logo.png" />
      </Head>

      {/* <div className="bg-[#1242ef] absolute left-[-250px] top-[-210px] h-[352px] w-[652px] blur-[350px] rounded-full "></div> */}

      {isWalletConnected || addr ? <Header /> : null}



      <div className="relative overflow-hidden bg-black">

        <section className="max-w-[1240px] mt-10 mb-20 mx-auto grid grid-cols-2  gap-2 font-body h-[930px] overflow-hidden top-7 md:gap-12 medium md:px-5 sm:grid-cols-1 sm:h-full relative ">
          <div className="relative flex flex-col items-center justify-center h-full min-h-[56vh] sm:items-center">

            <div className="absolute top-0 left-0 w-full h-[0px] pb-full">
              <img src="/images/heroimage3.jpeg" className="absolute top-0 left-0 w-full  object-cover" alt="Background Image" />
            </div>


            <div className="absolute top-1/4 left-0 w-full h-1/4 transform -translate-y-1/2">
              <img src="/images/Treasure Art_LOGO_L.png" className="w-full  object-cover" alt="Foreground Image" />
            </div>

            <div className="absolute top-[calc(30%+12.5%)] left-[15px] w-full">
              {addr ? (
                <button
                  type="button"
                  className="bg-[#1E50FF] outline-none border-none py-3 px-5 rounded-xl font-body cursor-pointer transition duration-250 ease-in-out hover:scale-125 hover:drop-shadow-xl hover:shadow-sky-600 w-auto focus:scale-90 z-20"
                  onClick={connectWallet}
                >
                  Create an NFT
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-[#1E50FF] outline-none border-none py-3 px-5 rounded-xl font-body cursor-pointer duration-250 ease-in-out hover:transform-x-1 hover:drop-shadow-xl hover:shadow-sky-600 w-auto transition transform hover:-translate-y-3 motion-reduce:transition-none motion-reduce:hover:transform-none z-20"
                  onClick={connectWallet}
                >
                  Connect Wallet
                </button>
              )}
            </div>
            <p className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 text-white text-lg w-[70%] text-center">
              「育つ財宝」を探し出すアートマーケットプレイス！
              あなたの目が選んだアートピースがショーケースに並びます。
              ディスプレイして鑑賞するだけでなく、売ることもできる。
              自分だけのコレクションにもできる。
              アートを楽しめば楽しむほど、アーチストの応援になります。
            </p>

          </div>

          <div className="w-full flex  justify-center ">
            <div className="w-[350px] h-[480px] bg-[#272D37]/60 rounded-2xl flex flex-col p-6 sm:h-max mt-44">
              <Slideshow2 playlists={playlists} width="300" height="300" />
              <div className="">
                <h1>example</h1>
                <div className="h-[56px] flex justify-between">
                  <div className="flex flex-row gap-2">
                    <img
                      src="images/mockcreator.jpg"
                      alt="creator-image"
                      className="h-[56px] w-[56px] rounded-xl"
                    />
                    <div>
                      <p className="my-1 text-base text-[#8F9CA9]">Creator </p>
                      <h4 className="my-0">0x000...0000</h4>
                    </div>
                  </div>
                  <div>
                    <p className="my-1 text-[#8F9CA9]">Current Price</p>
                    <h4 className="my-0 ">4.99 ETH</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>
        {/* 
        <section className="max-w-[1240px] mt-10 mb-20 mx-auto grid grid-cols-3 gap-2 font-body h-[930px] overflow-hidden top-7 md:gap-12 medium md:px-5 sm:grid-cols-1 sm:h-full relative ">

        


        {/* <section className="max-w-[1240px] mt-[-7rem] mb-20 mx-auto  gap-2 font-body top-7 "> */}
        <section className="max-w-[1240px] mt-10 mb-20 mx-auto  gap-2 font-body top-7 ">
          <h1 className="text-center w-full text-[#fff]">Create and sell your NFTs</h1>

          <div className="top-7 grid grid-cols-3 gap-5 sm:grid-cols-1 sm:p-12 md:grid-cols-1 md:mx-10">
            {data.map((item) => (
              <div
                key={item.id}
                className="w-full bg-[#52565e] flex flex-col justify-center items-center p-3 rounded-xl"
              >
                <div className="w-[80px] h-[80px] flex  justify-center items-center ">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full"
                  />
                </div>
                <h4 className="font-bold text-[24px] md:text-[14px]">
                  {item.title}
                </h4>
                <p className="text-center text-[#ADB9C7] text-[14px]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-[1240px] my-20 mx-auto  gap-2 font-body top-7 ">
          <h1 className="text-center w-full text-[#fff]">Show case</h1>

          <div className="grid grid-cols-4 gap-3 sm:gap-y-8 md:grid-cols-2 sm:grid-cols-1 sm:p-12 md:mx-10">
            {mockartist.map((data) => (
              <Link href={`/${data.name}`} key={data.id}>
                <a className="w-full bg-[#52565e] flex flex-col justify-center items-center p-3 rounded-xl">
                  <div className="w-full relative" style={{ paddingBottom: '100%' }}>
                    <img
                      src={data.bgImage}
                      alt={data.name}
                      layout="responsive"
                      className="absolute w-full h-full rounded-2xl object-fit: contain"
                    />
                  </div>
                  <div className="w-full text-center mt-8 font-bold">
                    <h3>{data.name}</h3>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </section>



        {/* Community */}
        <section className="max-w-[1240px] bg- my-20 mx-auto bg-[#52565e] gap-2 font-body top-7 text-center rounded-xl sm:mx-10 md:m-10 border border-solid border-sky-600">
          <div>
            <h1 className="text-4xl sm:text-2xl">Create Your Own NFT!</h1>
            {/* <p className="text-[#ADB9C7] px-[120px] sm:p-2 ms:p-1">
              We have a large scale group to support each other in this game,
              Join us to get the news as soon as possible and follow our latest
              announcements!
            </p> */}

          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
