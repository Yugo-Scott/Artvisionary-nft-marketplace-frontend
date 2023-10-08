
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { useRouter } from "next/router";

export const useWallet = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [addr, setAddr] = useState("");

  const router = useRouter();

  const authenticate = useCallback(async () => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_BACKEND_API_URL + `auth/nonce`,
      { address: account }
    );

    // check the response
    // console.log(response);
    // console.log(response.data.message);
    // console.log(response.data.temptoken);

    const { temptoken, message } = response.data;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // const address = await signer.getAddress();
    const signature = await signer.signMessage(response.data.message);

    console.log(signature);
    console.log(account);
    console.log(message);
    console.log(temptoken);

    const authResponse = await axios.post(
      process.env.NEXT_PUBLIC_BACKEND_API_URL + `auth/verify`,
      {
        address: account,
        signature: signature,
        message: message,
        temptoken: temptoken,
      }
    );

    const { token } = authResponse.data;
    localStorage.setItem("accessToken", token);
    setAccessToken(token);
    try {
      localStorage.setItem("accessToken", token);
      console.log("Stored token:", localStorage.getItem("accessToken"));
    } catch (error) {
      console.error("Error storing token:", error);
    }

    return token;
  }, [account]); 

  const connect = async () => {
    if (!ethereum) {
      alert("Please Install MetaMask");
      return;
    }

    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);
      console.log(accounts[0]);
      // if (accounts.length > 0) {

      //   router.push("/dashboard");
      // }
    }
  };

  useEffect(() => {
    if (account) {
      authenticate();
    }
  }, [account, authenticate]);

  useEffect(() => {
    const storedAddr = localStorage.getItem("walletAddress");
    if (storedAddr) {
      setIsWalletConnected(true);
      setAddr(storedAddr);
    }
  }, []);

  return {
    isWalletConnected,
    account,
    accessToken,
    addr,
    connect,
    authenticate
  };
};
