class Helpers {
  static generateRandomNumber() {
    return Math.floor(Math.random() * new Date().getTime());
  }
}

export default Helpers;