//Returing a well formatted string to reply to the sender
function createReplyEmail(sender, recipient, subject, message, threadId) {
  const replySubject = `Re: ${subject}`; //Subject must be same as the senders
  const replyBody = `On ${new Date().toLocaleString()}, ${recipient} wrote:\n\n${message}`; //Body message
  const inReplyTo = `<${threadId}@mail.gmail.com>`; //threadId must be same
  const references = `<${threadId}@mail.gmail.com>`;
  const replyEmail =
    `Content-Type: text/plain; charset="UTF-8"\n` + //The media type of the resource 
    `In-Reply-To: ${inReplyTo}\n` +
    `References: ${references}\n` +
    `To: ${sender}\n` +
    `Subject: ${replySubject}\n` +
    `\n${replyBody}`;

  return replyEmail;
}

module.exports = createReplyEmail;
