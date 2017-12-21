import puppeteer from 'puppeteer';
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  failureThreshold: '0.01',
  failureThresholdType: 'percent'
});
expect.extend({ toMatchImageSnapshot });

describe('SelectButton', () => {
  const moduleName = 'Shared';
  const componentName = 'SelectButton';

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

  it('should render the active select button', async () => {
    await page.click(linkSelector([moduleName, componentName, 'active']));
    const iframe = await page.$('#storybook-preview-iframe');
    const screenshot = await iframe.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  it('should render the disabled select button', async () => {
    await page.click(linkSelector([moduleName, componentName, 'disabled']));
    const iframe = await page.$('#storybook-preview-iframe');
    const screenshot = await iframe.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  it('should render the expanded select button', async () => {
    await page.click(linkSelector([moduleName, componentName, 'expanded']));
    const iframe = await page.$('#storybook-preview-iframe');
    const screenshot = await iframe.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});
