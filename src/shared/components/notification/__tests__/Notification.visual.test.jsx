import puppeteer from 'puppeteer';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

describe('Notification', () => {
  let browser = null;
  let page = null;

  const componentSelector = (type) => (
    `[data-name=Shared] ~ * [data-name=Notification] ~ * [data-name="${type}"]`
  );

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://0.0.0.0:9001');
  });

  afterEach(async () => {
    await page.close();
  });

  it('should render the default notification', async () => {
    await page.click(componentSelector('with text'));
    const iframe = await page.$('#storybook-preview-iframe');
    const screenshot = await iframe.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  it('should render a notification containing a link', async () => {
    await page.click(componentSelector('with link'));
    const iframe = await page.$('#storybook-preview-iframe');
    const screenshot = await iframe.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});
