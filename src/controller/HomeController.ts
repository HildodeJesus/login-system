import { Request, Response } from "express";

export class HomeController {
	index(req: Request, res: Response) {
		const user = req.session.user;

		return res.render("home", { user });
	}
}
