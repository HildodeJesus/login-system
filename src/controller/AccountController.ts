import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/UserModel";

export class AccountController {
	async loginPage(req: Request, res: Response) {
		res.render("login", { error: req.flash("loginErr") });
	}

	async registerPage(req: Request, res: Response) {
		res.render("cadastro", { error: req.flash("registerErr") });
	}

	async login(req: Request, res: Response) {
		const { email, password } = req.body;

		try {
			if (email == undefined || email == "")
				throw "A senha ou email está incorreto";

			const user = await UserModel.findOne({ email: email });
			if (user == null) throw "Não encontramos o seu registro!";

			const areEqualsPass = await bcrypt.compare(password, user.password);
			if (!areEqualsPass) throw "A senha ou email está incorreto!";

			req.session.user = {
				id: user._id.toString(),
				email: user.email,
				name: user.name,
			};

			res.redirect("/");
		} catch (err) {
			req.flash("loginErr", err);
			res.redirect("/login");
		}
	}

	async register(req: Request, res: Response) {
		const { name, email, password } = req.body;

		try {
			if (name == undefined || name == "") throw "Nome é requerido";

			if (email == undefined || email == "") throw "E-mail é requerido";

			if (password == undefined || password == "") throw "Crie uma senha";

			if (password.length < 8)
				throw "A sua senha deve possui 8 digitos pelo menos";

			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);

			const user = new UserModel({ name, email, password: hash });
			console.log(user);

			await user.save();

			res.redirect("/login");
		} catch (err) {
			req.flash("registerErr", err);
			res.redirect("/register");
		}
	}
}
