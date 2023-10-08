import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

export default function ConnectWallet() {
  const router = useRouter();
  const [account, setAccount] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const connect = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      if (accounts.length > 0) {
        await authenticate();
        if (router.query.redirect) {
          router.push(router.query.redirect);
        } else {
          router.push("/dashboard");
        }
      }
    }
  };

  const authenticate = async () => {
    const response = await axios.post(`/nonce?address=${account}`);
    const web3 = new Web3(window.ethereum);
    const signature = await web3.eth.personal.sign(
      response.data.message,
      account
    );

    const authResponse = await axios.post(
      `/auth`,
      { address: account, signature },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const { token } = authResponse.data;
    localStorage.setItem("accessToken", token);
    setAccessToken(token);
    return token;
  };

  return (
    <div>
      <button onClick={connect}>Login with Web3</button>
    </div>
  );
}