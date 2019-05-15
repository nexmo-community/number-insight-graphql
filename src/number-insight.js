const { RESTDataSource } = require('apollo-datasource-rest');
const config = require('config');

class NumberInsightAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.nexmo.com/ni/';
  }

  willSendRequest(request) {
    request.params.set(
      'api_key',
      process.env.NEXMO_API_KEY || config.get('nexmo_api_key')
    );
    request.params.set(
      'api_secret',
      process.env.NEXMO_API_SECRET || config.get('nexmo_api_secret')
    );
  }

  async getInsight(number, type = 'basic', cnam = false, ip) {
    if (type === 'standard') {
      return this.get(`${type}/json?number=${number}&cnam=${cnam}`);
    } else if (type === 'advanced') {
      return this.get(`${type}/json?number=${number}&cnam=${cnam}&ip=${ip}`);
    } else {
      return this.get(`${type}/json?number=${number}`);
    }
  }
}

module.exports = NumberInsightAPI;
