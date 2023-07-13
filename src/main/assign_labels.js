
//Assign the labels which has already been created in the authenticated user's gmail
function assignLabels(gmail, messageId, labelIds) {
  gmail.users.messages.modify(
    {
      userId: "me", //Authenticated user
      id: messageId, //The message to which the label has to be assigned
      requestBody: {
        addLabelIds: labelIds, //What label should be assigned, labelIds here is an array consisting of user defined labelids 
      },
    },
    (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Labels assigned to message ID: ${messageId}`);
    }
  );
}

module.exports = assignLabels;
