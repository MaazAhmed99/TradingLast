import React from "react";
import { ErrorMessage } from "formik";

const KErrorMessage = ({ name }) => {
	return (
		<div>
			{ErrorMessage ? (
				<div style={{ color: "red", margin: "10px 0  0 20px" }}>
					<ErrorMessage name={name} />
				</div>
			) : null}
		</div>
	);
};

export default KErrorMessage;
