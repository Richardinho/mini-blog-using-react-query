import { useState } from 'react';
import styles from './search.module.css';
import { usePost } from '../hooks/use-post';

export const Search = () => {

	const [postId, setPostId] = useState('');

	const { data: post } = usePost(postId);



	return (
		<div className={styles.container}>
			<div className={styles.label}>search</div>

			<input
				className={styles.input}
				onChange={(event) => setPostId(event.target.value)}/>

				{post && !Array.isArray(post) && (
					<div>{post.title}</div>
				)}
		</div>
	);
};
