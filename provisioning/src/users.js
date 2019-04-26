const { readJsonFile } = require("./files");
const { createUser, createGroup, grantAllPermissionsToUser } = require("./api");

const provisionUsers = async (axios, folder, organization) => {
  try {
    const users = readJsonFile(folder + "users.json");
    for (const user of users) {
      console.log(`~> Adding user ${user.displayName}`);
      await createUser(axios, user, organization);
    }

    await grantAllPermissionsToUser(axios, "mstein");
    console.log("~> all Permissions granted to mstein");

    await grantAllPermissionsToUser(axios, "jdoe");
    console.log("~> all Permissions granted to jdoe");
  } catch (err) {
    if (err.code && err.code === "MAX_RETRIES") {
      console.log("Failed to provision users, max retries exceeded");
    } else {
      console.log(
        `The following error occured during user provisioning ${err.message}`
      );
    }
  }
};

const provisionGroups = async (axios, folder) => {
  try {
    const groups = readJsonFile(folder + "groups.json");
    for (const group of groups) {
      console.log(`~> Adding group ${group.displayName}`);
      await createGroup(axios, group);
    }
  } catch (err) {
    if (err.code && err.code === "MAX_RETRIES") {
      console.log("Failed to provision groups, max retries exceeded");
    } else {
      console.log(
        `The following error occured during user provisioning ${err.message}`
      );
    }
  }
};

module.exports = {
  provisionUsers,
  provisionGroups
};
