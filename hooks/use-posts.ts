import { useQuery } from "react-query";

export function usePosts() {
	return useQuery("posts", async () => {
		const response = await fetch(`http://localhost:3000/api/posts`);

		return await response.json();
	});
}
