import { path } from 'chromedriver'
import { Builder, WebDriver } from "selenium-webdriver";
import { Options, ServiceBuilder } from 'selenium-webdriver/chrome';

import SearchPage from './pages/search.page'

describe('search', () => {
  let driver: WebDriver;
  let searchPage: SearchPage;

  beforeEach(async () => {
    searchPage = new SearchPage();
    const options: Options = new Options();
    process.env.HEADLESS === 'true' ? options.addArguments('--no-sandbox', '--headless', '--disable-gpu', '--disable-translate', '--disable-extensions'): null;
    const serviceBuilder = new ServiceBuilder(process.env.CI === 'true' ? '/usr/bin/chromedriver': path);
    driver = await new Builder()
      .forBrowser(process.env.BROWSER)
      .setChromeService(serviceBuilder)
      .setChromeOptions(options)
      .build();
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
