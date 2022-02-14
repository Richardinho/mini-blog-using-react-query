import { useInfiniteQuery } from "react-query";

export function useInfinitePosts() {
	return useInfiniteQuery(
		"infinite-posts",
		async ({ pageParam = 0 }) => {
			const response = await fetch(
				`http://localhost:3000/api/posts?pageOffset=${pageParam}`
			);

			return await response.json();
		},
		{
			getNextPageParam: (lastPage) => {
				return lastPage.nextPageOffset ?? false;
			},
		}
	);
}
