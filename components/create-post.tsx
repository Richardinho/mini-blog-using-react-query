import { useState } from 'react';
import { queryCache, useMutation, useQueryClient } from 'react-query'
import styles from './create-post.module.css';

export const  CreatePost = () => {

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const queryClient = useQueryClient();

	const mutation = useMutation(async (newPost) => {

		const response = await fetch('http://localhost:3000/api/posts', {
			method: 'POST',
			body: JSON.stringify(newPost),
		});

		const json = await response.json();

		return json;
	}, {
		onSuccess(...foo) {
			return queryClient.invalidateQueries(['posts']);
		}
	})

	function submitForm(event) {
		event.preventDefault();

		setTitle('');
		setContent('');

		mutation.mutate({
			title,
			content,
		});
	}

	return (
			<div className={styles.container}>

				<h2>create post</h2>

				<form onSubmit={submitForm}>
					<div className="input-fields">
						<label>title</label>
						<input value={title} onChange={(e) => setTitle(e.target.value)}/>

						<label>content</label>
						<textarea value={content} onChange={(e) => setContent(e.target.value)}/>
					</div>

					<button>submit</button>

				</form>

			</div>

			);
};
