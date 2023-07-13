function getCurrentDate(){
    const date = ("0" + new Date().getDate()).slice(-2);
    const year = new Date().getFullYear();
    const month = ("0" + (new Date().getMonth() + 1)).slice(-2);
    return `${year}-${month}-${date}`;
}

module.exports = getCurrentDate