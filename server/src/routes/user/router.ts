import express from "express";
import passport from "@/middleware/passport";
import userController from "@/controllers/user";

const userRouter = express();

userRouter.get(
  "/yandeexcallback",
  passport.authenticate("custom-yandex", { failureRedirect: "/login" }),
  userController.authorize
);

userRouter.get("/try", passport.authenticate("custom-yandex"));

userRouter.get("/token", userController.token);

userRouter.get(
  "/projectstatus/:projectId",
  passport.authenticate("jwt-authenticate"),
  userController.getProjectStatusData
);

userRouter.get(
  "/info",
  passport.authenticate("jwt-authenticate"),
  userController.getPublicUserInfo
);

userRouter.get(
  "/data",
  passport.authenticate("jwt-authenticate"),
  userController.getData
);

userRouter.get(
  "/logout",
  passport.authenticate("jwt-authenticate"),
  userController.logout
);

export default userRouter;
