import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "apis/records";

const PublicUrl = () => {
	const { slug } = useParams();

	const getOriginalLinkBySlug = async () => {
		try {
			const { data } = await API.show(slug);
			if (data.url) {
				var a = document.createElement("a");
				a.href = data.url;
				a.download = data.filename;
				a.rel = "noreferrer noopener";
				a.click();
				window.URL.revokeObjectURL(data.url);
				setTimeout(() => window.close(), 5000);
			}
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
				The file is being downloaded...
			</p>
		</div>
	);
};
export default PublicUrl;
