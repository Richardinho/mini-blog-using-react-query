import type { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";
import { db } from "../../../db";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	try {
		if (req.method === "GET") {
			let {
				query: { pageOffset },
			} = req;

			pageOffset = Number(pageOffset);

			const pageSize = 3;

			const posts = db.getPosts();

			if (pageOffset || pageOffset === 0) {
				const start = pageSize * pageOffset;
				const end = start + pageSize;
				const page = posts.slice(start, end);

				return res.status(200).json({
					items: page,
					nextPageOffset: posts.length > end ? pageOffset + 1 : undefined,
				});
			}

			res.status(200).json(posts);
		}

		if (req.method === "POST") {
			const post = JSON.parse(req.body);
			post.id = nanoid();

			db.createPost(post);

			res.status(200).json(post);
		}

		if (req.method === "PUT") {
			const { id, title, content } = JSON.parse(req.body);

			console.log(id, title, content);

			const post = {
				id,
				title,
				content,
			};

			db.updatePost(id, title, content);

			res.status(200).json(post);
		}
	} catch (err) {
		console.error(err);
		res.status(500);
		res.json({ message: "An error happened" });
	}
}
