import { By } from "selenium-webdriver"

export default class SearchPage {
  searchInput = By.id('search_form_input_homepage')
  searchButton = By.id('search_button_homepage')
}