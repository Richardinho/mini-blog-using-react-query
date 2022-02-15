import { db } from "../../../db";

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	try {
		if (req.method === "GET") {
			const id = req.query.id;

			const post = db.getPost(id);

			if (post) {
				res.status(200).json(post);
			} else {
				res.status(200).json({
					message: "something went wrong",
				});
			}
		}

		if (req.method === "DELETE") {
			const id = req.query.id;

			db.deletePost(id);

			res.status(200).json({
				message: `item ${id} was deleted`,
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500);
		res.json({
			message: "An error happened",
		});
	}
}

export default handler;
