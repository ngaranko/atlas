import puppeteer from 'puppeteer';
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  failureThreshold: '0.01',
  failureThresholdType: 'percent'
});
expect.extend({ toMatchImageSnapshot });

describe('Notification', () => {
  const moduleName = 'Shared';
  const componentName = 'Notification';

  let browser = null;
  let page = null;

  const linkSelector = (names) => (
    names.map((name) => `[data-name="${name}"]`).join(' ~ * ')
  );

  beforeAll(async () => {
    browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://0.0.0.0:9001');
    await page.click(linkSelector([moduleName]));
    await page.click(linkSelector([moduleName, componentName]));
  });

  afterEach(async () => {
    await page.close();
  });

  it('should render the default notification', async () => {
    await page.click(linkSelector([moduleName, componentName, 'with text']));
    const iframe = await page.$('#storybook-preview-iframe');
    const screenshot = await iframe.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  it('should render a notification containing a link', async () => {
    await page.click(linkSelector([moduleName, componentName, 'with link']));
    const iframe = await page.$('#storybook-preview-iframe');
    const screenshot = await iframe.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});
