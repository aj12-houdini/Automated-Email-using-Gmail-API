const getHeader = require("./get_header");
const createReplyEmail = require("./reply_email");

//Function to send the email to sender 
function sendEmail(gmail, threadId, messageId) {
  gmail.users.messages.get(
    {
      userId: "me",
      id: messageId,
    },
    (err, res) => {
      if (err) {
        console.error( err);
        return;
      }

      
      const email = res.data;
      //Using helper function to get the important parameters of the email 
      const sender = getHeader(email, "From");
      const recipient = getHeader(email, "To");
      const subject = getHeader(email, "Subject");
      const replyMessage = `Thank you for your email with the subject: ${subject}.\nI am on vacation. We will discuss when I get back. \nThank you, ${recipient}`;

      //Base 64 enoding to the send the email 
      const replyEmail = base64Encode(
        createReplyEmail(sender, recipient, subject, replyMessage)
      );

      gmail.users.messages.send(
        {
          userId: "me",
          requestBody: {
            raw: replyEmail, //Base encoded email 
            threadId: threadId,
          },
        },
        (err, res) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(`Reply sent to ${sender}`);
        }
      );
    }
  );
}

function base64Encode(string) {
  const buff = Buffer.from(string, "utf-8");
  return buff.toString("base64").replace(/\+/g, "-").replace(/\//g, "_");
}

module.exports = sendEmail;
