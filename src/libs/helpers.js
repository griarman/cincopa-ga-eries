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

  static extractHostname(url) {
    let hostname = url.indexOf("//") > -1 ?  url.split('/')[2] : url.split('/')[0];

    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];

    return hostname;
  }

  static htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  static getDocHeight() {
    const D = document;
    return Math.max(
      D.body.scrollHeight, D.documentElement.scrollHeight,
      D.body.offsetHeight, D.documentElement.offsetHeight,
      D.body.clientHeight, D.documentElement.clientHeight
    );
  }

  static deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj))
  }
}

export default Helpers;