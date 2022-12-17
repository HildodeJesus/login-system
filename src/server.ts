import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import flash from "connect-flash";

const app = express();

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
app.use(cookieParser(process.env.SECRET_STRING_COOKIE));
app.use(session(sessionConfig));
app.use(flash());
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));

import pages from "./routes/pages";
app.use("/", pages);
// app.use("/api/1.0", api);

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

import connectDB from "./db/connect";
(async function () {
	try {
		await connectDB(process.env.MONGO_URI);
		console.log("Conectado no MongoDB");
		app.listen(3033, () => console.log("Server listening in the port 3033"));
	} catch (err) {
		console.log(err);
	}
})();
