import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AddToCart } from "../../redux/actions/CartActions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Rating } from "react-simple-star-rating";

const Products = (props) => {
	const dispatch = useDispatch();
	const allStates = useSelector((state) => state.CartReducer.cartData);
	const { item } = props;
	// console.log("products", item);
	const [quantity, setQuantity] = useState(0);
	// console.log(item,'lllllllllllllllllllllllllllllll');
	const AddToCartHandler = (item) => {
		let checkItemAlreadyExist = allStates.filter((val) => val?.id == item?.id);
		if (checkItemAlreadyExist.length > 0) {
			toast.info("Item Already Exist in Cart");
			return;
		} else {
			let colorData = JSON.parse(item?.colors);
			let data = {
				id: item?.id,
				price: item?.unit_price,
				quantity: 1,
				color: colorData[0],
				productitem: item,
			};
			dispatch(AddToCart(data));
		}
	};

	return (
		<>
			<ToastContainer />
			<div className="card h-98 product h-100" key={item?.id}>
				<Link to={`/Product-detail/${item?.id}`} state={{ data: item }}>
					<div className="card-body">
						{item?.discount && item?.discount !== 0 ? (
							<span className="notify-badge">{item?.discount}%off</span>
						) : null}
						<div className="card-img-actions ">
							{" "}
							<img
								src={`${item?.thumbnail_url}`}
								className="card-img img-fluid"
								width="96"
								height="350"
								alt=""
							/>{" "}
						</div>
					</div>
				</Link>

				{/* <hr className="p-0 m-0" /> */}
				<div className="inner card-body">
					<div className="d-flex justify-content-between bd-highlight">
						<div className="bd-highlight">
							{/* <p className="text-muted">{item?.name}</p> */}
						</div>
						<div className="bd-highlight"></div>
						<div className="bd-highlight">
							<div className="rating-inner-cont mt-3 mb-3">
								{item?.rating?.map((items, index) => {
									return (
										<Rating
											size={22}
											readonly={true}
											ratingValue={
												Math.round(items?.average) === 1
													? "20"
													: Math.round(items?.average) === 2
														? "40"
														: Math.round(items?.average) === 3
															? "60"
															: Math.round(items?.average) == 4
																? "80"
																: Math.round(items?.average) === 5
																	? "100"
																	: null
											}
										/>
									);
								})}
							</div>
						</div>
					</div>
					<div className="">
						<h6 className="font-weight-semibold">
							<a className="text-black  product-title" data-abc="true">
								{item?.name}
							</a>
						</h6>
					</div>

					<div className="d-flex justify-content-around bd-highlight">
						<div className="p-2 bd-highlight">

							{(item.after_discount_price > 0) ? <h3 className="mb-0 font-weight-semibold price"><span>£{item.after_discount_price}</span>	<strike>£{item.unit_price}</strike></h3> : <h3 className="mb-0 font-weight-semibold price">£{item?.unit_price}</h3>}

							{/* <h3 className="mb-0 font-weight-semibold price">

								£{item?.unit_price}{" "}
								<span>
									<strike>
										{(item?.unit_price / 100) * item?.discount +
											item?.unit_price}
									</strike>
								</span>{" "}
							</h3> */}
						</div>
						<div className="p-2 bd-highlight"></div>
						<div className="p-2 bd-highlight">
							{" "}
							<button
								type="button"
								className="btn bg-cart"
								onClick={() => AddToCartHandler(item)}
							>
								<i className="fa fa-cart-plus mr-2"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Products;
