const formatTimestamp = (timestamp, options = {}) => {
    const { monthLength = 'short', dateSuffix = true } = options;
  
    const months = [
      monthLength === 'short'
        ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    ];
  
    const dateObj = new Date(timestamp);
    const month = months[monthLength === 'short' ? 0 : 1][dateObj.getMonth()];
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    let hour = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const periodOfDay = hour >= 12 ? 'pm' : 'am';
  
    if (hour === 0) {
      hour = 12;
    } else if (hour > 12) {
      hour -= 12;
    }
  
    const formattedDay = dateSuffix && day > 10 && day < 14 ? `${day}th` : day % 10 === 1 ? `${day}st` : day % 10 === 2 ? `${day}nd` : day % 10 === 3 ? `${day}rd` : `${day}th`;
  
    return `${month} ${formattedDay}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
  };
  
  module.exports = formatTimestamp;
  