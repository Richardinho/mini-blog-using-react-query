import { CreatePost } from "./create-post";

export const PostsList = ({
	setPostId,
	posts: { data, fetchNextPage, hasNextPage },
}) => {
	if (!data) return null;

	return (
		<>
			<ul>
				{data?.pages?.map((page) => {
					return page?.items?.map((item) => (
						<li onClick={() => setPostId(item.id)} key={item.id}>
							{item.title}
						</li>
					));
				})}
			</ul>

			{hasNextPage && (
				<button
					onClick={() => {
						fetchNextPage();
					}}
				>
					fetch next page
				</button>
			)}

			<CreatePost />
		</>
	);
};
