const timeout = 60000;
const speed = 50;

describe('Google Homepage', () => {

  let page;

  beforeAll(async () => {
    page = await global.__BROWSER__.newPage();
  }, timeout);

  afterAll(async () => {
    await page.close();
  }, timeout);

  afterEach(async () => {
    await page.waitFor(1000)
  });


  xtest('has title "Google"', async () => {

    await page.goto('https://google.com', {
      waitUntil: 'networkidle0'
    });
    const title = await page.title();
    expect(title).toBe('Google');

    let cssQ = 'input[name=q]';
    await page.waitForSelector(cssQ, {visible: true});
    let cssS = 'input[type="submit"]';
    await page.waitForSelector(cssS);

    await page.focus(cssQ);
    await page.type(cssQ, 'consent-ui', {delay: speed});

    await page.click(cssS);
    await page.waitForNavigation();

    const links = await page.$$eval('a[href][ping]', anchors => anchors.map(anchor => {
      return anchor.textContent.trim()
    }));
    console.log(links.length, 'links');
    console.log(links);

    const screenshot = 'google-search-consent-ui.png';
    await page.screenshot({path: screenshot});
    console.log('See screenshot: ' + screenshot);

  }, timeout);

  xtest('should load without error', async () => {
    await page.goto('https://google.com', {
      waitUntil: 'networkidle0'
    });
    let text = await page.evaluate(() => document.body.textContent);
    expect(text).toContain('google');
  }, timeout);

});
