/**
 *  Example app
 **/
import $ from "jquery"
import I18n from '../../javascripts/lib/i18n'
import { resizeContainer, render } from '../../javascripts/lib/helpers'
import getDefaultTemplate from '../../templates/default'

var parameters = {
  action: 'query',
  list: 'search',
  srsearch: 'gabriel garcia marquez',
  srlimit: 3,
  format: 'json'
}
const MAX_HEIGHT = '180px'
const API_ENDPOINTS = {
  url: 'https://en.wikipedia.org/w/api.php',
  data: parameters,
  headers: { 'Api-User-Agent': 'MyChatApp/1.0 (jdoe@example.net)' },
  dataType: 'json'
};

class App {
  constructor(client, appData) {
    this._client = client
    this._appData = appData

    this.states = {}

    // this.initializePromise is only used in testing
    // indicate app initilization(including all async operations) is complete
    this.initializePromise = this.init()
  }

  /**
   * Initialize module, render main template
   */
  async init() {
    const currentUser = (await this._client.get('visitor')).visitor
    this.states.currentUserName = currentUser.displayName

    //I18n.loadTranslations(currentUser.location)
    console.log('locale', currentUser.location)

    /*$("#get-btn").click(function (event) {
      console.log(event)
      event.preventDefault();
      this.parameters.srsearch = $("#subject-field").val()
    });*/

    console.log(parameters)

    const organizations = await this._client
      .request(API_ENDPOINTS)
      .then(
        function (response) {
          if (response.error) {
            //showError(response.error);
          }
          var articles = response.query.search;
          //var msg = buildMessage(articles);
          return articles
          //this._client.invoke('chat.postToChatTextArea', msg);
        }
      )
      .catch(this._handleError.bind(this))

    const msg = this.buildMessage(organizations)
    await this._client.invoke('chat.postToChatTextArea', msg)

    //render('.loader', getDefaultTemplate(this.states))
    //return resizeContainer(this._client, MAX_HEIGHT)
    console.log(organizations)
    if (organizations) {
      this.states.organizations = organizations.organizations
      console.log(this.states.organizations)

      // render application markup
      render('.loader', getDefaultTemplate(this.states))

      return resizeContainer(this._client, MAX_HEIGHT)
    }
  }

  buildMessage(articles) {
    var message = '';
    var url = 'https://en.wikipedia.org/wiki/';
    for (let i = 0; i < articles.length; i++) {
      message += '"' + articles[i].title + '" - ' + url + encodeURI(articles[i].title) + '\n';
    }
    return message;
  }

  /**
   * Handle error
   * @param {Object} error error object
   */
  _handleError(error) {
    console.log('An error is handled here: ', error.message)
  }
}

export default App
