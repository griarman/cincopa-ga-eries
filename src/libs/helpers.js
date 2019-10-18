class Helpers {
  static generateRandomNumber() {
    return Math.floor(Math.random() * new Date().getTime());
  }

  static getRandomString() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}

export default Helpers;