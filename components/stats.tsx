import { usePosts } from '../hooks/use-posts';

export const Stats = () => {

	const { data: posts, status: postsStatus, error: postsError } = usePosts();

	return (
		<div>
			Total Posts:{' '}
			{postsStatus === 'loading'
				? '...'
				: postsStatus === 'error'
				? postsError.message
				: posts.length}
		</div>
	);
};
