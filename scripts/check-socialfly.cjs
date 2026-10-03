const {chromium} = require('C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs/promises');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try {
  await fs.mkdir('reference/socialfly-review',{recursive:true});
  const page=await browser.newPage();
  for(const [device,width,height] of [['desktop',1440,1000],['mobile',390,844]]) {
   await page.setViewportSize({width,height});
   for(const route of ['/','/work','/work/socialflyai']) {
    const response=await page.goto('http://localhost:3021'+route,{waitUntil:'networkidle'});
    await page.waitForTimeout(1800);
    if(response.status()!==200) throw Error('Route failed '+route);
    if(route!=='/work/socialflyai') {
     const titles=await page.locator('.reference-work-link h2').allTextContents();
     if(titles[0]!=='LeadGen Copilot'||titles[1]!=='SocialFlyAI') throw Error('Incorrect project order');
     await page.locator('.reference-work-link').nth(1).scrollIntoViewIfNeeded();
    } else {
     if(await page.locator('.case-live a').getAttribute('href')!=='https://socialflyai.com/') throw Error('Wrong live link');
    }
    const broken=await page.evaluate(()=>[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src));
    if(broken.length) throw Error('Broken images: '+broken.join(','));
    if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)) throw Error('Horizontal overflow');
    await page.screenshot({path:'reference/socialfly-review/'+device+'-'+(route==='/'?'home':route==='/work'?'works':'case')+'.png'});
    console.log(device,route,'passed');
   }
  }
 } finally { await browser.close(); }
})();
