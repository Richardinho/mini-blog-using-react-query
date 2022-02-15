import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { usePostMutation } from "../hooks/use-post-mutation";
import { usePost } from "../hooks/use-post";
import { useDeletePostMutation } from "../hooks/use-delete-post-mutation";

export const PostDetail = ({ id, setPostId }) => {
	const { data, isFetching } = usePost(id);

	const [title, setTitle] = useState(data?.title || "");
	const [content, setContent] = useState(data?.content || "");

	const queryClient = useQueryClient();
	const mutation = usePostMutation();
	const deleteMutation = useDeletePostMutation(id);

	useEffect(() => {
		if (data) {
			setTitle(data.title);
			setContent(data.content);
		}
	}, [data]);

	function onTitleChange(event) {
		setTitle(event.target.value);
	}

	function onContentChange(event) {
		setContent(event.target.value);
	}

	function submitForm(event) {
		event.preventDefault();

		mutation.mutate({ id, title, content, dummy: "this is dumy" });
	}

	function deletePost() {
		deleteMutation.mutate(id);
		setPostId("");
	}

	return (
		<>
			<h3>
				{data?.title} {isFetching ? <small> Updating...</small> : null}
			</h3>

			<div>
				<small>
					<b>Post ID:</b>&nbsp;{data?.id}
				</small>
			</div>

			<p>{data?.content}</p>

			{data && (
				<form onSubmit={submitForm}>
					<div className="input-fields">
						<input type="hidden" name="id" value={id} />

						<label htmlFor="title">title</label>
						<input
							name="title"
							onChange={onTitleChange}
							id="title"
							value={title}
						/>

						<label htmlFor="content">content</label>
						<input
							name="content"
							onChange={onContentChange}
							id="content"
							value={content}
						/>
					</div>

					<button>submit</button>
				</form>
			)}

			<button onClick={deletePost}>delete post</button>
		</>
	);
};
