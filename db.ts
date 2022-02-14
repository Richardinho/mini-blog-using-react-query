import { data } from './posts';


export const db = {

	getPost: (id) => {
		return data.posts.find(post => {
			return (post.id === id);
		});
	},

	getPosts: () => {
		return data.posts;
	},

	createPost: (post) => {
		data.posts.push(post);
	},

	deletePost: (id) => {
		data.posts = data.posts.filter((post) => {
			return post.id !== id;
		});
	},

	updatePost: (id, title, content) => {

		data.posts = data.posts.map((post) => {
			if (post.id === id) {

				return {
					...post,
					title, 
					content,
				};
			}

			return post;
		});
	},
};

