import projectService from "@/services/project";
import { Request, Response } from "express";

const projectControllerFactory = () => {
  return Object.freeze({
    getActive,
    getNew,
    findMany,
  });

  async function getActive(req: Request, res: Response) {
    try {
      const tagIds = req.body ? (req.body.tagIds as string[]) : null;

      const projects = await projectService.getActive(tagIds);

      res.status(200).json(projects);
    } catch {
      res.sendStatus(500);
    }
  }

  async function getNew(req: Request, res: Response) {
    try {
      const projects = await projectService.getNew();

      res.status(200).json(projects);
    } catch {
      res.sendStatus(500);
    }
  }

  async function findMany(req: Request, res: Response) {
    try {
      const result = await projectService.findMany(req.body.filters);

      res.status(200).json(result);
    } catch {
      res.sendStatus(500);
    }
  }
};

const projectController = projectControllerFactory();
export default projectController;
