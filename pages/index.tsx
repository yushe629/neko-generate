import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "./index.module.css"

type Image = {
	url: string;
}

type Props = {
	initialImageUrl: string;
}

const fetchImage = async (): Promise<Image> => {
	const res = await fetch("https://api.thecatapi.com/v1/images/search");
	const images = await res.json();
	return images[0]
}


const IndexPage: NextPage<Props> = ({initialImageUrl}) => {

	const [imageUrl, setImageUrl] = useState(initialImageUrl)
	const [loading, setLoading] = useState(false)

	const handleclick = async () => {
		setLoading(true);
		const newImage = await fetchImage();
		setImageUrl(newImage.url)
		setLoading(false);
	}

	// useEffect(() => {
	// 	fetchImage().then((newImage) => {
	// 		setImageUrl(newImage.url);
	// 		setLoading(false);
	// 	})
	// }, [])

	return (
	<div className={styles.page}>
	<button onClick={handleclick} className={styles.button}>他のにゃんこも見る</button>
	<div className={styles.frame}>{loading || <img className={styles.img} src={imageUrl} />}</div>
	</div>)
}

// Server Side Rendering
export const getServerSideProps: GetServerSideProps<Props> = async () => {
	const image = await fetchImage();
	return {
		props: {
			initialImageUrl: image.url
		}
	}
}

export default IndexPage;