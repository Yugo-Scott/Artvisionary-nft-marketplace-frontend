import Head from "next/head";
import React, { useEffect, useState } from "react";
import ContractABI from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import { toast } from "react-toastify";
import axios from "axios";
import { ethers } from "ethers";
// import { truncateEthAddress } from "../utils/truncAddress";
import { useRouter } from "next/router";
import { QRCodeComponent } from "../components";


const mainURL = `https://arweave.net/`;

export default function Square() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/playlist');
  };


  const getContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    let contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      ContractABI.abi,
      provider
    );
    return contract;
  };

  const getNfts = async () => {
    try {
      const contract = await getContract();

      const data = await contract.fetchMarketItems();

      const items = await Promise.all(
        data?.map(async (i) => {
          const tokenURI = await contract.tokenURI(i.tokenId);
          const meta = await axios.get(mainURL + tokenURI);
          let price = ethers.utils.formatUnits(i.price.toString(), "ether");

          let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
            tokenURI,
          };
          return item;
        })
      );
      // setNfts(items);

      setNfts([...items].reverse());
      setLoading(true);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };



  useEffect(() => {
    getNfts();
  }, []);



  // useEffectの内部で画像のスライドショーの動作を設定
  useEffect(() => {
    // loadingがtrueでない場合、またはnftsが空の場合はタイマーを設定しない
    if (!loading || nfts.length === 0) return;

    // 3秒ごとにnextSlide関数を呼び出すタイマーを設定
    const timerId = setInterval(() => {
      nextSlide();
    }, 5000); // 3000ミリ秒 = 3秒

    // useEffectのクリーンアップ関数でタイマーをクリア
    return () => {
      clearInterval(timerId);
    };
  }, [loading, nfts, currentSlideIndex]); // loading, nfts, currentSlideIndex のいずれかが変更されたときに再度設定



  if (!loading)
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center font-body">
        <img src="/logo.png" alt="logo" className="h-[160px] animate-bounce" />
        <h2 className="text-7xl font-semibold ">Loading...</h2>
      </div>
    );





  const nextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % nfts.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + nfts.length) % nfts.length);
  };

  // NFTの詳細ページへのURLを取得
  const nftDetailURL = `https://artvisionary02.vercel.app/nft-details?price=${nfts[currentSlideIndex]?.price}&tokenId=${nfts[currentSlideIndex]?.tokenId}&seller=${nfts[currentSlideIndex]?.seller}&owner=${nfts[currentSlideIndex]?.owner}&image=${encodeURIComponent(nfts[currentSlideIndex]?.image)}&name=${encodeURIComponent(nfts[currentSlideIndex]?.name)}&description=${encodeURIComponent(nfts[currentSlideIndex]?.description)}&tokenURI=${encodeURIComponent(nfts[currentSlideIndex]?.tokenURI)}`;
  const nftDetailURL2 = `https://artvisionary02.vercel.app/dashboard`;


  return (
    <>
      <Head>
        <title>Playlist（square） || Treasure Art</title>
        <link rel="shortcut icon" href="logo.png" />
      </Head>
      {/* <div className="relative w-full max-w-[1440px] max-h-[930px] flex items-center justify-center text-left text-sm text-gray-600 bg-white"> */}
      <div className="relative w-screen h-screen flex items-center justify-center text-left text-sm text-gray-600 bg-white overflow-hidden">
        <div className="bg-black absolute top-0 left-0 w-full h-full"></div>

        <div className="relative bg-[#1a1a1a] flex items-center justify-center border-4 border-gray-300 box-border w-11/12 max-w-[792px] p-[66px]">
          <img
            src={mainURL + nfts[currentSlideIndex]?.image}
            alt={nfts[currentSlideIndex]?.name}
            className="object-contain w-full max-h-[75vh]"
          />
          <div className="flex justify-between px-4 py-2 absolute bottom-0 left-0 right-0 bg-[#1a1a1a] bg-opacity-40 text-white w-full">
            <div className="flex items-center">
              <img className="w-9 h-9 object-cover mr-1" alt="icon" src="/images/mask-group@2x.png" />
              <span className="underline truncate">shin tanaka</span>
            </div>
            {/* <div className="font-semibold truncate">Point</div> */}
            <div className="flex items-center">
              <img className="w-9 h-9 rounded-[9px]" alt="MATIC" src="/images/ethereum-1@2x.png" />
              <span className="ml-2 font-semibold leading-[36px]">0.01 MATIC</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 ">
          <QRCodeComponent value={nftDetailURL} />

        </div>
      </div>
      <style jsx>{`
      @media (max-width: 640px) {
        // Mobile styles here
      }
    `}</style>
    </>
  );


}