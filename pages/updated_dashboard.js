import Head from "next/head";
import React, { useEffect, useState, useCallback } from "react";
import { Footer, Header } from "../components";
import axios from "axios";
import { useRouter } from "next/router";
import { truncateEthAddress } from "../utils/truncAddress";
const mainURL = `https://arweave.net/`;

const Dashboard3 = () => {
  const router = useRouter();

  const [userData, setUserData] = useState(null);
  const [likeCount, setLikeCount] = useState({});
  const handleLikeClick = (index) => {
    setLikeCount((prevCount) => ({
      ...prevCount,
      [index]: (prevCount[index] || 0) + 1,
    }));
  };

  const handleLike = async (nft, index) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.patch(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + `nfts/updateLike`,
        {
          tokenURI: nft.tokenURI,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        handleLikeClick(index);
      }
      console.log(response);
      console.log(index);
      console.log(response.data.message);
    } catch (error) {
    if (error.response && error.response.data) {
      console.error("Error liking the NFT:", error.response.data.message);
    } else {
      console.error("Error liking the NFT:", error.message);
    }
    }
  };

  useEffect(() => {
    const maxRetryCount = 3;
    const retryInterval = 2000;
    const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));
    // APIからデータを取得する非同期関数
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_API_URL + `users/likes`,
                    {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response.data.data.data.likes);
        const items = await Promise.all(
          response.data.data.data.likes.map(async (i) => {
            const meta = await axios.get(mainURL + i.tokenURI);
            console.log(i.tokenURI);

            let item = {
              price: i.price,
              tokenId: i.tokenId,
              seller: i.seller,
              owner: i.owner,
              likes: i.likes,
              image: meta.data.image,
              name: i.name,
              description: i.description,
              tokenURI: i.tokenURI,
            };
            return item;
          })
        );
        setUserData([...items].reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
        if (maxRetryCount > 0) {
          await sleep(retryInterval);
          return await fetchData(maxRetryCount - 1);
        }
      }
    };

    fetchData();
  }, []); // 空の依存配列を使用して、コンポーネントのマウント時にのみデータを取得

  return (
    <div className="relative bg-black">
      <Head>
        <title>Dashboard || Treasure Art</title>
        <link rel="shortcut icon" href="logo.png" />
      </Head>
      <Header />
      <div className="bg-[#1242ef] absolute left-[-250px] top-[-210px] h-[352px] w-[652px] blur-[350px] rounded-full "></div>
      {!userData ? (
        <div className="w-full h-50 flex flex-col items-center justify-center font-body">
          <h2 className="text-7xl font-semibold">No NFTs in Marketplace</h2>
        </div>
      ) : (
        <div className="relative overflow-hidden">
          <h1 className="text-center text-[#fff]">Gem stones</h1>
          <section className="bg-black max-w-[1200px] my-20 mx-auto grid grid-cols-3 md:grid-cols-2 gap-4 font-body overflow-hidden top-7 md:gap-5 medium md:px-5 sm:grid-cols-1 sm:h-full relative justify-center items-center">
            {userData.map((nft, index) => (
              <div key={index} className="w-full h-[536px] sm:h-full ssm:h-max">
                <div
                  className="w-full h-full ssm:h-max bg-[#272D37]/60 rounded-2xl flex flex-col p-6 sm:h-max cursor-pointer"
                  onClick={() => {
                    router.push({ pathname: "/nft-details", query: nft });
                  }}
                >
                  <div className="relative transition duration-150 ease-in-out delay-150">
                    <img
                      src={mainURL + nft?.image}
                      alt={nft.name}
                      className="w-full h-[352px] ssm:h-max rounded-2xl"
                    />
                    <div className="absolute top-0 left-0 bg-white/40 backdrop-blur-xl w-full h-full z-[20] rounded-2xl opacity-0 hover:opacity-100">
                      <div className="flex items-center justify-center h-full">
                        <button
                          className="bg-[#1E50FF] outline-none border-none py-3 px-5 rounded-xl font-body cursor-pointer transition duration-250 ease-in-out hover:scale-125 hover:drop-shadow-xl hover:shadow-sky-600 w-auto"
                          onClick={() => {
                            router.push({
                              pathname: "/nft-details",
                              query: nft,
                            });
                          }}
                        >
                          NFT詳細
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h1 className="max-h-[36px] text-[#fff]">{nft.name}</h1>
                    <div className="h-[56px] flex justify-between">
                      <div className="flex flex-row gap-2">
                        <div>
                          <p className="my-1 text-base text-[#8F9CA9]">
                            Creator
                          </p>
                          <h4 className="my-0 ssm:text-sm text-transparent font-bold bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">
                            {truncateEthAddress(nft.seller)}
                          </h4>
                        </div>
                      </div>
                      <div>
                        <button onClick={() => handleLike(nft, index)}>
                          ❤️ いいね
                        </button>
                        <h4 className="my-0 text-[#fff]">{nft.likes.length}</h4>
                      </div>
                      <div>
                        <p className="my-1 text-[#8F9CA9]">価格</p>
                        <h4 className="my-0 text-[#fff]">
                          Price: {nft.price} Matic
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
          <Footer />
        </div>
      )}
    </div>
  );
};



export default Dashboard3;
