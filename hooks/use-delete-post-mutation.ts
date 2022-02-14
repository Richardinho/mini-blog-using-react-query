import { useQueryClient, useMutation } from "react-query";

export const useDeletePostMutation = (id) => {
	const queryClient = useQueryClient();

	return useMutation(
		async () => {
			const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
				method: "DELETE",
			});

			const json = await response.json();

			return json;
		},
		{
			async onSuccess() {
				await queryClient.invalidateQueries("infinite-posts");
				return queryClient.invalidateQueries(["posts"]);
			},
		}
	);
};
