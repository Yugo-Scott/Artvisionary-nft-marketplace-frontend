import Head from "next/head";
import Image from "next/image";
import axios from "axios";

export default function DisplayArtist({ artistData }) {
  return (
    <div className="flex flex-col w-full min-h-screen items-center justify-center bg-black">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Treasure Art - Artist Profile</title>
      </Head>

      <div className="flex flex-col bg-white p-6 rounded-lg w-4/5 md:w-2/3 lg:w-1/2 mb-6 shadow-lg">
        <div className="flex items-center mb-6">
          <div
            className="w-24 h-24 object-cover rounded-full overflow-hidden mr-4"
            style={{ position: "relative" }}
          >
            <Image
              src={`/images/users/${artistData.profile_image}`}
              layout="fill"
              objectFit="cover"
              alt="Artist Image"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">{artistData.name}</h1>
            {/* 他のデータ、例えばユーザーの情報等もここに表示できます */}
          </div>
        </div>

        <div className="w-full mt-4 border-t border-gray-300 pt-6 mb-6">
          <h2 className="font-medium mb-2">プロフィール:</h2>
          <p className="text-gray-700">{artistData.bio}</p>
        </div>

        <div className="w-full mt-4 border-t border-gray-300 pt-6">
          <h2 className="font-medium mb-2">PR (アーチスト活動歴):</h2>
          <p className="text-gray-700">{artistData.content}</p>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { _id } = context.query;

  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_API_URL + `users/${_id}/profile`
    );
    const artistData = response.data.data.data;

    console.log(artistData.profile_image);
    return {
      props: {
        artistData,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true, // この行はエラーが発生した場合に404ページを表示するために追加します
    };
  }
}
