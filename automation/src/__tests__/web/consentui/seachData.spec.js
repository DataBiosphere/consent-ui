const timeout = 20000;
const typingspeed = 50;
const {log} = console;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('DUOS Homepage', () => {

  let page;
  let duosUrl = "https://duos.dsde-alpha.broadinstitute.org/";
  let userEmail = "test.firec@gmail.com";
  let userPasswd = "BroadDec1";
  let chrome;


  beforeAll(async () => {
    chrome = global.__BROWSER__;
    page = await chrome.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    page.on('load', () => log("beforeAll: Load new page: " + page.url()));
  }, timeout);

  afterAll(async () => {
    log('afterAll: Close chrome page');
    await page.close();
    await page.waitFor(1000);
  }, timeout);

  afterEach(async () => {
    await page.waitFor(1000)
  });


  xtest('should load welcome page without error', async () => {
    await page.goto(duosUrl, {
      waitUntil: 'networkidle0'
    });

    const screenshot = 'duos-welcome-page.png';
    await page.screenshot({path: screenshot});
    log('See screenshot: ' + screenshot);

    let title = await page.title();
    await expect(title).toEqual('Broad Data Use Oversight System');
  }, timeout);


  test('should login without error', async () => {
    await page.goto(duosUrl, {
      waitUntil: 'networkidle0'
    });

    // click Navbar `Sign In` link
    let signIn = await page.$('a.navbar-duos-button[href*=login]');
    await signIn.click();

    // click `Sign In with Google` button
    let btn = await page.waitForSelector("span.abcRioButtonContents span:first-child", {visible: true});

    // const newPagePromise = getNewPageWhenLoaded();

    const nav = new Promise(res => chrome.on('targetcreated', res))

    await btn.click();
    log('clicked Sign In with Google');

    // const popup = await newPagePromise;

    await nav

    const pageList = await chrome.pages()
    const popup = await pageList[pageList.length - 1]


    await popup.waitForSelector('#identifierId', {visible: true});
    await popup.evaluate((text) => {
      (document.getElementById('identifierId')).value = text;
    }, userEmail);
    log('typed user email');

    await popup.waitForSelector('#identifierNext');
    await popup.click('#identifierNext');
    log("clicked #identifierNext");

    await popup.waitForSelector('#password input[type="password"]', {visible: true});
    log('typing password');
    await popup.evaluate((text) => {
      (document.querySelector('#password input[type="password"]')).value = text;
    }, userPasswd);

    /*target.on("response", response => {
      const request = response.request();
      const url = request.url();
      const status = response.status();
      console.log("response url:", url, "status:", status);
    }); */

    await Promise.all([
      popup.$eval('#passwordNext', el => el.click()),

      page.waitForNavigation({ waitUntil: 'networkidle0' }),
      log("clicked #passwordNext"),
    ]);


    log('should be on DUOS home page');

    const pages = await chrome.pages();
    log(pages.map(page => page.url()));
    log(`pages length: ${pages.length}`);
    page = pages[pages.length - 1];

    let httpUrl = await page.url();
    log(`new page url: ${httpUrl}`);


    await page.waitForSelector("#dacUser", {visible: true, timeout: 15000});
    await page.waitFor(() => !document.querySelector('#loading-bar'));

    httpUrl = await page.url();
    log(`current page url: ${httpUrl}`);

    await expect(httpUrl).toContain('dataset_catalog');

    const displayName = await page.$("#dacUser");
    const label = await page.evaluate(el => el.innerText, displayName);
    log('user name label', `${label}`);
    await expect(label).toMatch('Abby Testerson ');

    await page.screenshot({path: 'DUOSDatasetCatalog.png'});

    // search dataset
    let searchInput = await page.$('input[type=search][ng-model=searchDataset]');
    searchInput.type('OD-320', {delay: typingspeed});
    await page.waitFor(1000);

    await page.screenshot({path: 'DUOSDatasetSearch.png'});

    // search results check
    let rows = await page.$$('.table-scroll table tr.ng-scope');
    await expect(rows.length).toBe(1);

  }, timeout);

  function getNewPageWhenLoaded() {
    return new Promise((x) => chrome.on('targetcreated', async (target) => {
      log(`targetcreated. target type ${target.type()} url ${target.url()}`);
      if (target.type() === 'page') {
        const newPage = await target.page();
        const newPagePromise = new Promise(() => newPage.once('load', () => x(newPage)));
        const isPageLoaded = await newPage.evaluate(() => document.readyState);
        return isPageLoaded.match('complete|interactive') ? x(newPage) : newPagePromise;
      }

    }));
  }

  function getNewPageWhenChanged() {
    return new Promise((x) => chrome.on('framenavigated', async (target) => {
      log(`targetchanged. target type ${target.type()} url ${target.url()}`);
      if (target.type() === 'page') {
        const newPage = await target.page();
        const newPagePromise = new Promise(() => newPage.on('load', () => x(newPage)));
        const isPageLoaded = await newPage.evaluate(() => document.readyState);
        return isPageLoaded.match('complete|interactive') ? x(newPage) : newPagePromise;
      }

    }));
  }

});

