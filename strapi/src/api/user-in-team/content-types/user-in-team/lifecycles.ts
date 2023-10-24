const formatName = (name: string): string => {
  const nameArray = name.split(" ");

  nameArray[0] += " ";
  if (nameArray[1]) nameArray[1] = nameArray[1][0].toUpperCase() + ".";
  if (nameArray[2]) nameArray[2] = nameArray[2][0].toUpperCase() + ".";

  return nameArray.join("");
};

export default {
  async beforeUpdate(event) {
    const id = event.params.where.id;

    const existingData = await strapi.entityService.findOne(
      "api::user-in-team.user-in-team",
      id,
      {
        populate: ["user"],
        fields: ["role"],
      }
    );

    const teamData = event.params.data.team;
    const userData = event.params.data.user;

    const userAdded =
      !userData || !userData.connect || !userData.connect.length
        ? null
        : (
            await strapi.entityService.findOne(
              "api::student.student",
              userData.connect[0].id,
              {
                fields: ["name"],
              }
            )
          ).name;
    const userName =
      userAdded ||
      (userData && userData.disconnect.length
        ? " "
        : existingData.user && existingData.user.name
        ? existingData.user.name
        : " ");

    event.params.data.name = formatName(userName);

    if (event.params.data.role) {
      event.params.data.name += " - " + event.params.data.role;
    } else if (existingData.role)
      event.params.data.name += " - " + existingData.role;
  },

  async beforeCreate(event) {
    const userName =
      event.params.data.user &&
      event.params.data.user.connect &&
      event.params.data.user.connect.length
        ? (
            await strapi.entityService.findOne(
              "api::student.student",
              event.params.data.user.connect[0].id,
              {
                fields: ["name"],
              }
            )
          ).name
        : "";

    event.params.data.name = formatName(userName);

    if (event.params.data.role)
      event.params.data.name += " - " + event.params.data.role;
  },
};