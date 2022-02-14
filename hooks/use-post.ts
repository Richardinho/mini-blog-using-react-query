import { useQuery } from "react-query";

export const usePost = (postId) => {
	return useQuery(["posts", postId], () => {
		return fetch(`http://localhost:3000/api/posts/${postId}`).then((response) =>
			response.json()
		);
	});
};
