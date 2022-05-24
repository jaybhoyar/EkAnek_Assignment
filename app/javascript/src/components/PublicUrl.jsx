import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "apis/records";

const PublicUrl = () => {
	const { slug } = useParams();
  const [url, setUrl] = useState("");
  const [filename, setFilename] = useState("");

	const getOriginalLinkBySlug = async () => {
		try {
			await API.show(slug);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getOriginalLinkBySlug();
	}, [slug]);
	return (
		<div className="mt-32 flex flex-col items-center justify-center">
			<p className="py-12 text-3xl font-bold tracking-wide text-gray-400">
				Your File is Ready to Download
			</p>
		</div>
	);
};
export default PublicUrl;
