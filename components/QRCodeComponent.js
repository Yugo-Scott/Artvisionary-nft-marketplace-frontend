// components/QRCodeComponent.js

import QRCode from 'qrcode.react';

function QRCodeComponent({ value, size = 92 }) {
	return (
		<div className="w-[100px] h-[100px] bg-white p-1 z-10 ">
			<QRCode value={value} fgColor="#000000" size={size} className="top-0 w-[92px] h-[92px]" />
		</div>
	);
}

export default QRCodeComponent;
