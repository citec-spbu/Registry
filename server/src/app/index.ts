import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "@/middleware/passport";

import path from "path";
import projectRouter from "@/routes/project/router";
import userRouter from "@/routes/user/router";
import tagRouter from "@/routes/tag/router";
import requestRouter from "@/routes/request/router";
import fileUpload from "express-fileupload";
import emailRouter from "@/routes/email/router";
import errorLogger from "@/middleware/errors/ErrorLogger";
import errorHandler from "@/middleware/errors/ErrorHandler";
import memberRouter from "@/routes/member/router";
import categoryRouter from "@/routes/category/router";

const generateApp = (port?: number) => {
  const app = express();
  if (port) app.listen(port, () => console.log("listening port 8000"));

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.TOKEN_SECRET));
  app.use(fileUpload());
  app.use(
    session({
      secret: process.env.TOKEN_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    })
  );
  app.set("trust proxy", 1);

  app.use(passport.initialize());

  app.use("/project", projectRouter);
  app.use("/user", userRouter);
  app.use("/tag", tagRouter);
  app.use("/request", requestRouter);
  app.use("/email", emailRouter);
  app.use("/member", memberRouter);
  app.use("/category", categoryRouter);

  app.use(errorLogger);
  app.use(errorHandler);

  app.use("/public", express.static(path.resolve(__dirname + "/../public")));

  app.get("/", (req: Request, res: Response) => {
    res
      .status(200)
      .sendFile(path.resolve(__dirname + "/../client/dist/index.html"));
  });

  app.use(
    "/assets",
    express.static(path.resolve(__dirname + "/../client/dist/assets"))
  );

  return app;
};

export default generateApp;
