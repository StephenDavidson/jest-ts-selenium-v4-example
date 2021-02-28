import {  WebDriver } from "selenium-webdriver";

import { createDriver } from './driver'
import SearchPage from './pages/search.page'

describe('search', () => {
  let driver: WebDriver;
  let searchPage: SearchPage;

  beforeEach(async () => {
    searchPage = new SearchPage();
    driver = await createDriver();
    await driver.get(process.env.URL)
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('for "cats"', async () => {
    const searchValue = 'cats'
    await driver.findElement(searchPage.searchInput).sendKeys(searchValue)
    await driver.findElement(searchPage.searchButton).click()
    expect(await driver.getTitle()).toContain(searchValue);
  });
})
