
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";

export const useCheckWalletConnection = () => {
	const router = useRouter();

	useEffect(() => {
		const checkWalletConnection = async () => {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const accounts = await provider.listAccounts();
			if (accounts.length === 0) {
				router.push(`/connect?redirect=${router.asPath}`);
			}
		};

		checkWalletConnection();
	}, [router]);
};


