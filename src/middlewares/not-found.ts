import { Request, Response } from "express";

export function notFound(req: Request, res: Response) {
	const error = {
		code: 404,
		msg: "Essa página não existe",
	};

	res.render("error", { error });
}
