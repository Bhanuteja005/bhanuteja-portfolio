const { chromium } = require('C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs/promises');
(async () => {
  const dir = 'public/images/freelance/socialflyai';
  await fs.mkdir(dir, { recursive: true });
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('https://socialflyai.com', { waitUntil: 'networkidle', timeout: 60000 });
    await page.screenshot({ path: dir + '/desktop.jpg', type: 'jpeg', quality: 90 });
    console.log((await page.locator('body').innerText()).slice(0, 11000));
    await page.screenshot({ path: dir + '/desktop-scroll.jpg', type: 'jpeg', quality: 85, fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload({ waitUntil: 'networkidle' });
    for (const [name, y] of [['mobile', 0], ['mobile-2', 844], ['mobile-3', 1688]]) {
      await page.evaluate(y => window.scrollTo(0, y), y);
      await page.waitForTimeout(600);
      await page.screenshot({ path: dir + '/' + name + '.jpg', type: 'jpeg', quality: 90 });
    }
  } finally { await browser.close(); }
})();
