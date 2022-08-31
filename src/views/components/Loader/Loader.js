import React from "react";
import "./Loader.css";
import LoaderGif from "../../../assets/img/loading.gif";

function Loader() {
	return (
		<>
			<div className="spinner_loading">
				<figure>
					<img className="loader" src={LoaderGif} alt="loading..." />
				</figure>
			</div>
		</>
	);
}

export default Loader;
