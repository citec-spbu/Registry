import { Strapi } from "@strapi/strapi";
import { FormStrapi, formAdapter } from "../entities/Form";
import { TeamToSave } from "../entities/Team";
import { User, formatName, userAdapter } from "../entities/User";
import { Draft } from "../entities/Draft";

export default ({ strapi }: { strapi: Strapi }) => ({
  getWelcomeMessage() {
    return "Welcome to Strapi 🚀";
  },

  async getForms() {
    const forms = await strapi.entityService?.findMany("api::form.form");

    if (!forms) return [];

    return formAdapter(forms as any);
  },

  async getStudents(formId: number) {
    const students = await strapi.entityService?.findMany(
      "api::student.student",
      {
        filters: {
          forms: {
            form: {
              id: formId,
            },
          },
        },
        populate: {
          forms: {
            populate: {
              file: true,
              form: true,
            },
          },
        },
      }
    );

    return userAdapter(students as any, formId);
  },

  async createDraft() {
    const createDraftResponse = await strapi.entityService?.create(
      "plugin::team-builder.draft",
      {
        data: {},
      }
    );

    if (!createDraftResponse || !createDraftResponse.id)
      throw new Error("Couldn't create a draft");

    const updateDraftResponse = await strapi.db
      ?.query("plugin::team-builder.draft")
      .update({
        where: {
          id: createDraftResponse.id,
        },
        data: {
          name: "Черновик " + createDraftResponse.id,
        },
      });

    return updateDraftResponse;
  },

  async getDrafts() {
    const findDraftsResponse = await strapi.entityService?.findMany(
      "plugin::team-builder.draft"
    );

    return findDraftsResponse;
  },

  async getDraftById(id: number | string) {
    const findDraftResponse = await strapi.entityService?.findOne(
      "plugin::team-builder.draft",
      +id,
      {
        fields: ["id", "name"],
        populate: {
          form: {
            fields: ["id"],
          },
          activeStudents: {
            fields: ["id"],
          },
          teams: {
            populate: {
              users: {
                fields: ["id"],
              },
            },
          },
        },
      }
    );

    if (!findDraftResponse) throw new Error("Couldn't find the draft");

    return findDraftResponse;
  },

  async saveDraft(data: Draft) {
    const { id: _, teams, ...dataToSave } = data;

    const updateDraftResponse = await strapi.db
      ?.query("plugin::team-builder.draft")
      .update({
        where: {
          id: data.id,
        },
        data: dataToSave,
      });

    const findDraftTeamsResponse = await strapi.db
      ?.query("plugin::team-builder.team-draft")
      .findMany({
        where: {
          draft: {
            id: data.id,
          },
        },
      });

    if (findDraftTeamsResponse) {
      for (const teamDraft of findDraftTeamsResponse) {
        strapi.db?.query("plugin::team-builder.team-draft").delete({
          where: {
            id: teamDraft.id,
          },
        });
      }
    }

    const teamsData = teams.map((team) => ({ draft: data.id, users: team }));

    async function generateTeam(team: { draft: number; users: number[] }) {
      return strapi.db?.query("plugin::team-builder.team-draft").create({
        data: team,
      });
    }

    const result = await Promise.all(
      teamsData.map((team) => generateTeam(team))
    );

    return updateDraftResponse;
  },

  async generateTeams(teams: TeamToSave[]) {
    const createTeamsResponse = await strapi.db
      ?.query("api::team.team")
      .createMany({
        data: teams.reduce<{ publishedAt: Date | number; name: string }[]>(
          (data, team) => [
            ...data,
            {
              name: team.students
                .map((user) => formatName(user.name))
                .join(", "),
              publishedAt: Date.now(),
            },
          ],
          []
        ),
      });

    if (!createTeamsResponse) throw new Error("Failed to generate teams");

    const { ids: teamIds } = createTeamsResponse;

    const generateMember = async (user: User, teamId: string | number) => {
      return strapi.entityService?.create("api::user-in-team.user-in-team", {
        data: {
          user: user.id,
          team: teamId,
          role: "",
          name: user.name,
          publishedAt: Date.now(),
        },
      });
    };

    const result = await Promise.all(
      teams.reduce<Promise<any>[]>(
        (promises, team, index) => [
          ...promises,
          ...team.students.map((student) =>
            generateMember(student, teamIds[index])
          ),
        ],
        []
      )
    );

    return result;
  },
});
