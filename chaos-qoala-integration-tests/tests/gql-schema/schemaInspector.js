const fetch = require('node-fetch');

class QueryInspector {
  constructor(uri) {
    this.uri = uri;
    this.queryList = [];
  }

  // returns the count of querys found in the schema
  async hydrateQueryList() {
    const queryToGetAllQueryNames = '{__schema{queryType{fields{name}}}}';
    const query = { query: queryToGetAllQueryNames, variables: null };

    const response = await fetch(this.uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    });
    const responseJson = await response.json();

    // eslint-disable-next-line no-underscore-dangle
    responseJson.data.__schema.queryType.fields.forEach((element) => {
      this.queryList.push(element.name);
    });

    return this.queryList.length;
  }

  // returns the list of available queries once the hydrate function has been called
  getQueryList() {
    return this.queryList;
  }
}

module.exports = QueryInspector;
