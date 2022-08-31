import React, { useEffect , useState} from "react";
import { useParams,useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { SingleBlog } from "../../../network/Network";
import "./Blog.css"

import {
    singleBlog
} from "../../../redux/actions/AuthActions";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Loader from "../../components/Loader/Loader";

const BlogDetails = () => {
	const dispatch = useDispatch();
    const navigate = useNavigate();
	const { id } = useParams();
	const Singleblog = useSelector((state) => state.AuthReducer.Singleblog);
    console.log("dsdsds22223223",Singleblog);
	const [load,setLoad] = useState(true);


    useEffect(() => {
		SingleBlog(id)
			.then((res) => {
				console.log("top", res);
				dispatch(singleBlog(res?.data?.data));
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setLoad(false);
		}, 2000);
	}, []);

	return (
		<>
			{!load ? (
				<>
				<Header />
			<section className="blog-detail">
				<div className="container">
					<div className="row">
						<div className="col-lg-8">
							<div className="blog_box">
								<div className="blog_img">
									<figure>
										<img src={Singleblog.image} alt="" />
									</figure>
								</div>
								<div className="blog-content">
									<div className="blog-header">
										<p>
											<i class="fa fa-calendar" aria-hidden="true"></i>{" "}
											{Singleblog.created_at?.split(" ")[0]}
										</p>
										<p>
											<i class="fa fa-clock-o" aria-hidden="true"></i> 01:23:16
											PM
										</p>
									</div>
									<p
										className="fw-400"
										dangerouslySetInnerHTML={{ __html: Singleblog.content }}
									/>
									<div className="button-group">
										<button
											className="sabButton"
											onClick={() => navigate("/blog")}
										>
											<i className="fa fa-angle-left" aria-hidden="true"></i>{" "}
											Back to Blog
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4">
							<div className="recent-blog">
								<div className="heading">
									<h3>Recent Posts</h3>
								</div>
								<div className="recent-box">
									{/* <div className="recent-img">
										<figure>
											<img className="img-fluid" src={blogImg1} />
										</figure>
									</div> */}
									<div className="recent-content">
										<h4>
											Blogging Courses, Training, Classes & Tutorials Online
										</h4>
										<p>
											<i class="fa fa-calendar" aria-hidden="true"></i>
											{Singleblog.created_at?.split(" ")[0]}
										</p>
									</div>
								</div>
								<div className="recent-box">
									{/* <div className="recent-img">
										<figure>
											<img className="img-fluid" src={blogImg1} />
										</figure>
									</div> */}
									<div className="recent-content">
										<h4>
											Blogging Courses, Training, Classes & Tutorials Online
										</h4>
										<p>
											<i class="fa fa-calendar" aria-hidden="true"></i>
											{Singleblog.created_at?.split(" ")[0]}
										</p>
									</div>
								</div>
								<div className="recent-box">
									{/* <div className="recent-img">
										<figure>
											<img className="img-fluid" src={blogImg1} />
										</figure>
									</div> */}
									<div className="recent-content">
										<h4>
											Blogging Courses, Training, Classes & Tutorials Online
										</h4>
										<p>
											<i class="fa fa-calendar" aria-hidden="true"></i>
											{Singleblog.created_at?.split(" ")[0]}
										</p>
									</div>
								</div>
								<div className="recent-box">
									{/* <div className="recent-img">
										<figure>
											<img className="img-fluid" src={blogImg1} />
										</figure>
									</div> */}
									<div className="recent-content">
										<h4>
											Blogging Courses, Training, Classes & Tutorials Online
										</h4>
										<p>
											<i class="fa fa-calendar" aria-hidden="true"></i>
											{Singleblog.created_at?.split(" ")[0]}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
			</>
			) : <Loader />}
		</>
	);
};

export default BlogDetails;

