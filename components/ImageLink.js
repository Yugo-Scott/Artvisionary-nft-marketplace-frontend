// components/ImageLink.js
// import Image from 'next/image';

// function ImageLink({ src, alt, leftHref, rightHref }) {
// 	return (
// 		<div className="relative inline-block">
// 			<Image src={src} alt={alt} layout="responsive" />
// 			<a href={leftHref} title="左半分のリンク" className="absolute inset-y-0 left-0 w-1/2"></a>
// 			<a href={rightHref} title="右半分のリンク" className="absolute inset-y-0 right-0 w-1/2"></a>
// 		</div>
// 	);
// }

// export default ImageLink;

import Link from 'next/link';

export default function ImageLink({ src, alt, leftHref, rightHref }) {
	return (
		<div className="relative max-w-screen-xl max-h-[930px] mx-auto">
			<Link href={leftHref}>
				{/* 左半分をクリックするとリンクに移動 */}
				<a className="absolute inset-y-0 left-0 w-1/2 bg-transparent z-10"></a>
			</Link>

			<Link href={rightHref}>
				{/* 右半分をクリックするとリンクに移動 */}
				<a className="absolute inset-y-0 right-0 w-1/2 bg-transparent z-10"></a>
			</Link>

			<img src={src} alt={alt} className="w-full h-auto max-w-[1440px] max-h-[930px] block" />
		</div>
	);
}

