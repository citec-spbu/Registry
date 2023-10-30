import { ProjectFilters } from "@/entities/project";
import { generateProjectFilters } from "./utils/generateProjectFilters";
import { checkFilterValidity } from "./utils/checkFilterValidity";
import { Project, ProjectDTO } from "@/entities/project/types/types";
import { Team } from "@/entities/team";
import {
  filterActiveRequests,
  selectRequest,
} from "@/db/strapi/queries/request";
import { selectTeam } from "@/db/strapi/queries/team";
import { selectMember } from "@/db/strapi/queries/member";
import { selectUser } from "@/db/strapi/queries/user";
import {
  selectDescriptionFiles,
  selectDeveloperRequirements,
  selectProjectInList,
  selectProjectReference,
  selectResultFiles,
} from "@/db/strapi/queries/project";
import { selectTag } from "@/db/strapi/queries/tag/selects";
import { strapi } from "@/db/strapi/client";
import { Tag } from "@/entities/tag";
import { ProjectListStrapi } from "@/db/strapi/types/project";
import {
  getProjectFromStrapiDTO,
  getProjectListFromStrapiDTO,
} from "@/db/strapi/adapters/project";
import { User } from "@/entities/user";
import { Member } from "@/entities/member";
import { Request } from "@/entities/request";
import requestRepository from "../request";
import { BadRequestError } from "@/helpers/errors";

const projectRepositoryFactory = () => {
  return Object.freeze({
    getNew,
    findOne,
    findMany,
    getReferences,
  });

  async function getNew(limit?: number): Promise<{
    projects: ProjectDTO[];
    tags: Tag[];
  } | null> {
    const now = new Date();

    const params = {
      sort: ["dateStart:desc"],
      filters: {
        dateEnd: {
          $gte: now,
        },
      },
      ...selectProjectInList({
        tags: selectTag(),
      }),
    };

    const response: ProjectListStrapi = await strapi.get("projects", {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    const { projects, tags } = getProjectListFromStrapiDTO(response);

    return {
      projects: projects!,
      tags: tags!,
    };
  }

  async function findOne(id: number): Promise<{
    project: ProjectDTO | null;
    tags: Tag[];
    teams: Team[];
    users: User[];
    members: Member[];
  } | null> {
    if (typeof id != "number")
      throw new BadRequestError("Provided ID is not a number");

    const params = {
      filters: {
        id: id,
      },
      populate: {
        tags: selectTag(),
        teams: selectTeam({
          members: selectMember({
            user: selectUser(),
          }),
        }),
        developerRequirements: selectDeveloperRequirements(),
        requests: {
          count: true,
        },
        descriptionFiles: selectDescriptionFiles(),
        resultFiles: selectResultFiles(),
      },
    };

    const response = await strapi.get("projects/" + id, {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    if (!response.data) return null;

    const countRequests = await requestRepository.countActive(response.data.id);

    response.data.attributes.requests.data.attributes.count = countRequests;

    return getProjectFromStrapiDTO({ data: response.data });
  }

  async function findMany(filters?: ProjectFilters): Promise<{
    projects: ProjectDTO[];
    tags: Tag[];
  }> {
    if (!checkFilterValidity(filters)) return { projects: [], tags: [] };

    const params = {
      sort: ["dateStart:desc"],
      filters: filters ? generateProjectFilters(filters) : undefined,
      ...selectProjectInList({
        tags: selectTag(),
      }),
    };

    const response: ProjectListStrapi = await strapi.get("projects", {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    const { projects, tags } = getProjectListFromStrapiDTO(response);

    return {
      projects: projects!,
      tags: tags!,
    };
  }

  async function getReferences(ids: number[]) {
    if (!ids.length) return [];

    const params = {
      filters: {
        id: {
          $in: ids,
        },
      },
      ...selectProjectInList(),
    };

    const response: ProjectListStrapi = await strapi.get("projects", {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    return getProjectListFromStrapiDTO(response).projects;
  }
};
const projectRepository = projectRepositoryFactory();
export default projectRepository;
