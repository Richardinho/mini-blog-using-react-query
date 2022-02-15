import { useState, useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { PostsList } from "../components/posts-list";
import { CreatePost } from "../components/create-post";
import { useInfinitePosts } from "../hooks/use-infinite-posts";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { PostDetail } from "../components/post-detail";
import { Stats } from "../components/stats";
import { Search } from "../components/search";

function isSet(id) {
	return id !== "";
}

const Blog: NextPage = () => {
	const posts = useInfinitePosts();

	const [postId, setPostId] = useState("");

	return (
		<>
			<Head>
				<title>Mini blog</title>
				<meta
					name="description"
					content="blog demo using react query and nextjs"
				/>
			</Head>

			<h2 className="header">Mini Blog</h2>

			<div className="wrapper">
				<div className="sidebar">
					<a href="#" onClick={() => setPostId("")}>
						All Posts
					</a>

					<Stats />

					<Search />
				</div>
				<div className="main">
					{isSet(postId) ? (
						<PostDetail id={postId} setPostId={setPostId} />
					) : (
						<PostsList setPostId={setPostId} posts={posts} />
					)}
				</div>
			</div>
		</>
	);
};

export default Blog;
