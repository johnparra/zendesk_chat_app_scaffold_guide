import { templatingLoop as loop, escapeSpecialChars as escape } from '../javascripts/lib/helpers.js'
import I18n from '../javascripts/lib/i18n.js'

function organizationMarkup(organization) {
  return `<li>${escape(organization.name)}</li>`
}

export default function (args) {
  return `<div class="content"></div>
  <h2 class="u-milli">LEARN MORE</h2>
    <form id="search-form">
    <p>
      <label for="name" class="c-txt__label u-zeta">Subject</label><br/>
      <input type="text" name="subject-field" id="subject-field" class="c-txt__input" />
    </p>
    <p>
      <button id="get-btn" class="c-btn">Get article links</button>
    </p>
    </form>
    <footer>
      <a href="https://github.com/johnparra/chat_app_scaffold_zendesk/issues/new" target="_blank">Report bugs</a>
    </footer>`
}
