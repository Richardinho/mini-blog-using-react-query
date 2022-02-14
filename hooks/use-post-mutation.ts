import { useQueryClient, useMutation } from 'react-query';


export const usePostMutation = () => {

	const queryClient = useQueryClient();

	return useMutation(async ({ id, content, title }) => {

		const response = await fetch(`http://localhost:3000/api/posts`, {
			method: 'PUT',
			body: JSON.stringify({
				id,
				title,
				content,
			}),
		});

		const json = await response.json();

		return json;

	}, {

		async onSuccess(data, {id}) {
			return queryClient.invalidateQueries(['posts']);
		}

	});
};

