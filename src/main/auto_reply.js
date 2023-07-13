const { google } = require("googleapis");
const moment = require("moment");
const sendEmail = require("../helper_functions/send_email");
const assignLabels = require("./assign_labels");
const listLabels = require("./list_labels");
const checkReply = require("../helper_functions/check_reply");
const getCurrentDate = require("../helper_functions/get_current_date");

//function to assign labels and send the email with necessary paramters to the sender
async function sendEmailAndAssignLabel(auth, gmail, messageId, threadId) {
  let labelIds = await listLabels(auth); //Get the user defined Labels ids in an array
  assignLabels(gmail, messageId, labelIds); //Assigns labels to the message recieved and sent as part of the same thread
  sendEmail(gmail, threadId, messageId); //Sends email with necessary paramters like To,From,Date etc.
}

//Get the query to send the emails only after a specific date i.e. vacation date
function getQuery() {
  //Getting the current date
  const startDate = getCurrentDate();
  const endDate = "2023-07-23";
  const parseStartDate = moment(startDate);
  const parseEndDate = moment(endDate);

  const formatStartDate = parseStartDate.format("YYYY/MM/DD");
  const formatEndDate = parseEndDate.format("YYYY/MM/DD");
  return `after:${formatStartDate} before:${formatEndDate}`;
}

//Automated responding of emails
async function autoRespondEmail(auth) {
  const gmail = google.gmail({ version: "v1", auth });

  const query = getQuery();

  //Use the gmail API functions to list all the emails based on the given query
  gmail.users.messages.list(
    {
      userId: "me",
      q: query,
    },
    async (err, response) => {
      if (err) {
        console.log(err);
        return;
      }
      //Messages recieved in the form of an array
      const messages = response.data.messages;

      if (messages)
        for (const message of messages) {
          //Check whether or not the email recieved has already been replied to
          let EmailReplied = await checkReply(auth, message.threadId);

          //If it hasnt been replied to then send the automated reply
          if (!EmailReplied)
            sendEmailAndAssignLabel(auth, gmail, message.id, message.threadId);
          else {
            console.log("Already replied to email ");
            break;
          }
        }
      else console.log("No message recieved!! Enjoy your vacation.");
    }
  );
}

module.exports = autoRespondEmail;
