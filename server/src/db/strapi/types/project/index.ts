import { TagListStrapi } from "../tag";
import { TeamStrapiPopulated } from "../team";
import { UserListStrapi } from "../user";

export interface ProjectStrapiPopulated {
  data: {
    id: number;
    attributes: {
      name: string;
      description: string;
      developerRequirements: ProjectStrapiDeveloperRequirement[];
      dateStart: Date;
      dateEnd: Date;
      enrollmentStart: Date;
      enrollmentEnd: Date;
      supervisor: string;
      curator: string;
      administrators: UserListStrapi;
      requests: ProjectRequestCountStrapi;
      client: string;
      tags: TagListStrapi;
      team: TeamStrapiPopulated;
      isPublic: boolean;
    };
  };
}

interface ProjectWithTagsStrapiInner {
  id: number;
  attributes: {
    name: string;
    description: string;
    developerRequirements: string[];
    dateStart: Date;
    dateEnd: Date;
    enrollmentStart: Date;
    enrollmentEnd: Date;
    //createdAt: Date;
    supervisor: string;
    curator: string;
    requestCount: number;
    client: string;
    tags: TagListStrapi;
    team: number;
  };
}

export interface ProjectWithTagsListStrapi {
  data: ProjectWithTagsStrapiInner[];
}

export interface ProjectWithTagsStrapi {
  data: ProjectWithTagsStrapiInner;
}

export interface ProjectRequestCountStrapi {
  data: {
    attributes: {
      count: number;
    };
  };
}

export interface ProjectStrapiDeveloperRequirement {
  id: number;
  developerRequirement: string;
}
