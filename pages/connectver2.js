import { useRouter } from "next/router";
import { ethers } from "ethers";

const ConnectWallet = () => {
	const router = useRouter();

	const connectWallet = async () => {
		if (typeof window.ethereum !== "undefined") {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			await provider.send("eth_requestAccounts", []);
			const accounts = await provider.listAccounts();

			if (accounts.length > 0) {
				localStorage.setItem("walletAddress", accounts[0]);
				if (router.query.redirect) {
					router.push(router.query.redirect);
				} else {
					router.push("/dashboard");
				}
			}
		}
	};

	return (
		<div>
			<button onClick={connectWallet}>Connect Wallet</button>
		</div>
	);
};

export default ConnectWallet;
