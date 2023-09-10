const formatTimestamp = (timestamp, options = {}) => {
    const { monthLength = 'short', dateSuffix = true } = options;
  //the function takes two parameters, timestamp and options object. 
  //option allows for customization of the formatting of the timestamp with ending of st, nd, rd, or th
    const months = [
      monthLength === 'short'
        ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    ];
  //the array called months is defined with containt the names of the month and the choice of the month is dependent of the length set. 
    const dateObj = new Date(timestamp);
    //newdateobj is a constructor that creates an instance of the date object based on the passed in parameter which is our timestamp variable.
    const month = months[monthLength === 'short' ? 0 : 1][dateObj.getMonth()];
    //get the day of the month
    const day = dateObj.getDate();
    //get the year from the dateObj
    const year = dateObj.getFullYear();
    //get the hour from the dateObj
    let hour = dateObj.getHours();

    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    //detemines whether its am or pm based on the hour
    const periodOfDay = hour >= 12 ? 'pm' : 'am';
    //the code adjusts the hour to be in a 12-hr format so if the houris 0, it is set to midnight
    // if the hour is greater than 12, it subtracts 12 to convert it to the afternoon format
    if (hour === 0) {
      hour = 12;
    } else if (hour > 12) {
      hour -= 12;
    }
  //the code generate a formatted day string, considering date suffixes
    const formattedDay = dateSuffix && day > 10 && day < 14 ? `${day}th` : day % 10 === 1 ? `${day}st` : day % 10 === 2 ? `${day}nd` : day % 10 === 3 ? `${day}rd` : `${day}th`;
  //returning a string in the format of month dau uear at hour, minute am/pm.
    return `${month} ${formattedDay}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
  };
  
  module.exports = formatTimestamp;
  