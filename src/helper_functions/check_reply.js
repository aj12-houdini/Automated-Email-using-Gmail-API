const { google } = require("googleapis");
const getCurrentDate = require("./get_current_date");

//Check whether or not he user has already responded to the recieved email
async function checkReply(auth, threadId) {
  const gmail = google.gmail({ version: "v1", auth });

  //Get the date after which you want to see all the emails the authenticated user has replied to
  let startDate = new Date(`${getCurrentDate()}T00:00:00Z`);

  //Convert the date into seconds
  const startDateSeconds = Math.floor(startDate.getTime() / 1000);

  //Listing all replied emails after startDate
  const res = await gmail.users.messages.list({
    userId: "me",
    q: `in:sent after:${startDateSeconds}`,
  });

  const repliedMessages = res.data.messages;

  if (repliedMessages) {
    for (const message of repliedMessages)
      if (message.threadId === threadId)
        //If the threadId of the replied messaage is equal to the threadId of the message sent by the sender then the user has already replied to given message
        return true;
  } else return false;
}

module.exports = checkReply;
