class Helpers {
  static generateRandomNumber() {
    return Math.floor(Math.random() * new Date().getTime());
  }

  static getRandomString() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  static readablizeBytes (bytes) {
    let s = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
        e = Math.floor(Math.log(bytes) / Math.log(1024)),
        intPoint = bytes / Math.pow(1024, e);
    return intPoint <= 9 ?
      intPoint.toFixed((intPoint % 1).toFixed(1) === '0.0' ? 0 : 1) + '<small>' + s[e] + '</small>'
      :
      Math.ceil(intPoint) + '<small>' + s[e] + '</small>';
  }
}

export default Helpers;