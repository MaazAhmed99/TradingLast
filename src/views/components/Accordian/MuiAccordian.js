import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	summary: {
		backgroundColor: "transparent !important",
		// boxShadow: "unset !important",
	},
	mainContainer: {
		backgroundColor: "transparent !important",
		boxShadow: "unset !important",
		borderBottom: "1px solid #70707030",
	},
}));

export default function ControlledAccordions(props) {
	const { item, index, handleSelectCategory, checked, handleSelectCate, CateId } = props;
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const classes = useStyles();
	console.log(item,'44444444444444444444444444444444');
	return (
		<div>
			<Accordion
				expanded={expanded === item?.name}
				onChange={handleChange(item?.name)}
				className={classes.mainContainer}
				key={index}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1bh-content"
					id="panel1bh-header"
					// className="custom-accord"
					className={classes.summary}
				>
					<Typography sx={{ width: "0%", flexShrink: 0, textAlign: "center" }}>
						{/* <input
							className="form-check-input"
							type="checkbox"
							defaultValue=""
							id="defaultCheck1"
							value={CateId}
							checked={CateId == item.id}
							onChange={(e) => handleSelectCate(item?.id, e.target.checked)}
						/> */}
					</Typography>
					<Typography sx={{ color: "text.secondary" }}>{item?.name}</Typography>
				</AccordionSummary>
				{item?.childes?.map((childItem, index) => {
					console.log(item,'11111111111111111111111111');
					console.log(childItem.id,'33333333333333333333333333');
					return (
						<AccordionDetails
							sx={{
								borderBottom: "0px solid #70707030",
								borderTop: "1px solid #70707030",
							}}
						>
							<Typography
								sx={{
									width: "100%",
									// flexShrink: 0,
									textAlign: "initial",
									marginLeft: "20%",
								}}
							>
								<input
									className="form-check-input"
									type="checkbox"
									defaultValue=""
									id="defaultCheck2"
									
									// value={checked}
									value={childItem.id}
									checked={childItem.id === CateId}
									onChange={(e) => handleSelectCate(childItem?.id, e.target.checked)}
									// onChange={(e) => handleSelectCategory(childItem?.id)}
								/>
								<Typography
									sx={{ color: "text.secondary", marginLeft: "20px" }}
								>
									{childItem?.name}
								</Typography>
								{/* {childItem?.name} */}
							</Typography>
						</AccordionDetails>
					);
				})}
			</Accordion>
		</div>
	);
}
