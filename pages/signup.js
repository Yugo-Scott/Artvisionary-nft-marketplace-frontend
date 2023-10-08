import Head from 'next/head';
import Image from 'next/image';

export default function Signup() {
	return (
		<>
			<Head>
				<title>Treasure Artry</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>

			<div className="relative w-full min-h-screen overflow-hidden text-center text-[#696969] font-inter">
				<div className="absolute inset-0 z-[-1]">
					<Image alt="" src="/images/gradation-1@2x.png" layout="fill" objectFit="cover" />
				</div>

				<div className="max-w-screen-xl mx-auto px-4 py-10 z-10 space-y-8 sm:px-8 md:px-12">
					<div className="text-3xl leading-[150%] font-medium tracking-tighter mb-10 lg:mb-5">
						<p>Sign up</p>
					</div>
					<form className="space-y-5 w-full md:max-w-xl mx-auto">

						<label className="text-lg block">お名前（フルネーム）</label>
						<div className="relative rounded-[5px] bg-[whitesmoke] border border-black h-[55px]">
							<input
								type="text"
								className="bg-transparent w-full h-full px-3 py-2 border-none outline-none"
								placeholder="お名前を入力してください"
							/>
						</div>

						<label className="text-lg block">フリガナ（フルネーム）</label>
						<div className="relative rounded-[5px] bg-[whitesmoke] border border-black h-[55px]">
							<input
								type="text"
								className="bg-transparent w-full h-full px-3 py-2 border-none outline-none"
								placeholder="フリガナを入力してください"
							/>
						</div>

						<label className="text-lg block">ログインメールアドレス（半角）</label>
						<div className="relative rounded-[5px] bg-[whitesmoke] border border-black h-[55px]">
							<input
								type="text"
								className="bg-transparent w-full h-full px-3 py-2 border-none outline-none"
								placeholder="メールアドレスを入力してください"
							/>
						</div>
						<label className="text-lg block">パスワード（半角英数記号８文字以上）</label>
						<div className="relative rounded-[5px] bg-[whitesmoke] border border-black h-[55px]">
							<input
								type="text"
								className="bg-transparent w-full h-full px-3 py-2 border-none outline-none"
								placeholder="パスワードを入力してください"
							/>
						</div>
						<label className="text-lg block">パスワード（確認用）</label>
						<div className="relative rounded-[5px] bg-[whitesmoke] border border-black h-[55px]">
							<input
								type="text"
								className="bg-transparent w-full h-full px-3 py-2 border-none outline-none"
								placeholder="パスワードを入力してください"
							/>
						</div>
					</form>
				</div>
				<button type="submit" className="mt-8 w-full sm:w-1/2 md:w-1/4 mx-auto rounded-[5px] bg-[cadetblue] h-[55px] flex items-center justify-center">
					<p className="text-xl text-white">submit</p>
				</button>
			</div>

		</>
	);
}
