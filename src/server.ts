import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import flash from "connect-flash";

import pages from "./routes";
import connectDB from "./db/connect";
import { notFound } from "./middlewares/not-found";

const app = express();
const port = process.env.PORT || 5000;

const sessionConfig = {
	secret: process.env.SECRET_STRING_COOKIE,
	resave: false,
	saveUninitialized: false,
	store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 3,
		httpOnly: true,
	},
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionConfig));
app.use(cookieParser(process.env.SECRET_STRING_COOKIE));
app.use(flash());
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/", pages);
app.use(notFound);

type User = {
	id: string;
	name: string;
	email: string;
};

declare module "express-session" {
	interface SessionData {
		user: User | undefined;
	}
}

(async function () {
	try {
		await connectDB(process.env.MONGO_URI);
		console.log("Conectado no MongoDB");
		app.listen(port, () => console.log(`Server listening in the port ${port}`));
	} catch (err) {
		console.log(err);
	}
})();
