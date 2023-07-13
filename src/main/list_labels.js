let labelIds = [];
const { google } = require("googleapis");


//List all user-defined labels in the authenticated user's gmail 
async function listLabels(auth) {
  const gmail = google.gmail({ version: "v1", auth });

  const res = await gmail.users.labels.list({
    userId: "me",
  });

  const labels = res.data.labels;


  if (!labels || labels.length === 0) {
    console.log("No labels found.");
    return;

  }
  //Get the label type: if the label type is of user then push the label id into a temporary data structure such as a list 
  labels.forEach((label) => {
    if (label.type === "user") labelIds.push(label.id);
  });

  return labelIds;
}

module.exports = listLabels