import { ImageLink } from "../components";

export default function Home() {
	return (
		<div className="flex justify-center items-center min-h-screen p-5">
			<ImageLink
				src="/images/direction-image-1@2x.png"
				alt="Description"
				leftHref="/profileartist"
				rightHref="/profileshop"
			/>
		</div>
	);
}
