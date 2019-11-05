class HashController {
  static ParseHash(hash) {
    if (hash && typeof hash === 'string') {
      hash = hash.slice(1).split('&').reduce((el, next) => {
        let [key, value] = next.split('=');

        el[decodeURIComponent(key) === 'tag' ? 'tags' : decodeURIComponent(key)] = decodeURIComponent(value);
        return el;
      }, {});
    }
    else {
      hash = {}
    }
    return hash;
  }

  static CollectHash(hash) {
    if (hash instanceof Object && !(hash instanceof Array)) {
      return Object.entries(hash).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');
    }
  }


}

export default HashController;