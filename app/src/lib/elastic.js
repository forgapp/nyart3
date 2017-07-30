class Elastic {
  constructor() {
    this.baseUrl = '';
  }

  setIndex(index) {
    this.index = index;
    return this;
  }

  setType(type) {
    this.type = type;
    return this;
  }

  query(queryString) {
    this.queryString = queryString;
    return this;
  }

  size(sizeLimit) {
    this.sizeLimit = sizeLimit;
    return this;
  }

  search() {
    const { index, type, sizeLimit, queryString } = this;
    const saneIndex = index ? index + '/' : '';
    const saneType = type ? type + '/' : '';
    const sizeClause = sizeLimit ? `&size=${sizeLimit}` : ''

    return fetch(`https://fc385d12916b5aba21876096cc99cd3b.ap-northeast-1.aws.found.io:9243/${saneIndex}${saneType}_search?q=${queryString}${sizeClause}`, {
      headers: {
        'Authorization': 'Basic bnlhcnRVc2VyOlczbGNvbWUh'
      }
    }).then(res => res.json());
  }
}

export default Elastic;
