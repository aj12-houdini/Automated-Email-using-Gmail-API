
//Get the important paramters from the recived email such as subject, sender and recipient 
function getHeader(email, query) {
    const header = email.payload.headers.find(
      (element) => element.name === query
    );
    return header ? header.value : "";
  }
module.exports = getHeader  