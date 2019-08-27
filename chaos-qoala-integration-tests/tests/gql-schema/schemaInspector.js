const fetch = require('node-fetch');

class QueryInspector {
  constructor(uri) {
    this.uri = uri;
    this.queryMap = {};
  }

  // returns the count of querys found in the schema
  async hydrateQueryMap() {
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
      // add query as key in an object - the boolean represents
      // if the data returned from the query will potentially be
      // affected due to user preferences in the chaos config
      // for the moment we don't have access to those preferences
      // so just initialize to false
      this.queryMap[element.name] = false;
    });

    return Object.keys(this.queryMap).length;
  }

  // returns the list of available queries once the hydrate function has been called
  getQueryMap() {
    return this.queryMap;
  }
}

module.exports = QueryInspector;
