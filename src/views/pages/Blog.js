import React, { useEffect, useState } from "react";
// import Header from "../../Reusable-Components/Header/Header";
// import HeaderBanner from "../../Reusable-Components/Header/HeaderBanner";
import "./Blog/Blog.css";
// import {
// 	blog1,
// 	blog2,
// 	blog3,
// 	blog4,
// 	blog5,
// 	blog6,
// } from "../../ImageConstants/Index";
// import OurSubscribe from "../../Reusable-Components/OurSubscribe/OurSubscribe";
// import Footer from "../../Reusable-Components/Footer/Footer";
// import { learningBlog, BlogDetail } from "../../store/action/UserAction";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
// import ReactHelmet from "../../Reusable-Components/React-Helmet/ReactHelmet";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "../../assets/img/prog1.png";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { GetNews } from "../../network/Network";
import { Blogs } from "../../redux/actions/AuthActions";

const Blog = () => {
	const vlogs = useSelector((state) => state.AuthReducer.blogs);
	const [loading, setLoading] = useState(true);
	const [pageCount, setPageCount] = useState();
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);
	const dispatch = useDispatch();

	const handlePageClick = async (data) => {
	  console.log(data.selected);
	  setCurrentPage(data?.selected + 1);
	};
  
	console.log(vlogs);
	// const [loading, setLoading] = useState(true);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

		// Get Blog Api
		useEffect(() => {
			GetNews(currentPage)
				.then((res) => {
					console.log("Blog", res?.data?.data?.blogs?.total);
					dispatch(Blogs(res?.data?.data?.blogs));
					const total = res?.data?.data?.blogs?.total;
        const limit = res?.data?.data?.blogs?.per_page;
        setPageCount(Math.ceil(total / limit));
				})
				.catch((err) => {
					console.log(err);
				});
		}, [currentPage]);


	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, [vlogs]);

	return (
		<>
			<Header />
			<div className="LearnSkills">
				<section className="elearing_blog">
					<div className="container px-0">
						<div className="row">
							{!loading ? ( vlogs?.data?.map((term, index) => (
								<>
									<div className="col-lg-4  my-4" key={term?.id} style={{ cursor: "pointer" }} onClick={() => navigate(`/blog/${term?.id}`)}>
										<div className="card-eblogs">
											<img src={term?.image}className="w-100 rounded card-eblogs-imgsss" />
											<div className="crd-inner">
												<p className="blogs_artcl">{term.title}</p>
												<p
													className="website-text"
													dangerouslySetInnerHTML={{
														__html: term?.content.slice(0, 200),
													}}
												/>
												<p
													className="read_more"
												>
													Read More
												</p>
											</div>
										</div>
									</div>
								</>
							))) :(
								<>
									{new Array(3).fill(0).map((_, index) => (
										<Card
											key={index}
											sx={{ maxWidth: 300, m: 4, minHeight: 100 }}
											style={{
												alignItems: "center",
												justifyContent: "center",
												textAlign: "center",
												display: "flex",
												flexDirection: "row",
											}}
										>
											<Stack spacing={1} style={{ padding: "20px" }}>
												<Skeleton variant="text" width={260} height={60} />
												<Skeleton
													variant="rectangular"
													width={260}
													height={118}
												/>
												<Skeleton variant="text" width={100} height={60} />
											</Stack>
										</Card>
									))}
								</>
							)}
							<div className="pagination_cont mt-5">
              <ReactPaginate
                previousLabel="< previous"
                nextLabel="next >"
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
              />
            </div>
						</div>
					</div>
				</section>
			</div>
			<Footer />
		</>
	);
};

export default Blog;
