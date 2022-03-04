const date = '01/02/22';
const type = 'лиса';
const desc = 'лисичка в лесу';
const rating = '7';

const {Builder, By, Key, until} = require('selenium-webdriver');

async function test() {
  let driver = await new Builder().forBrowser('firefox').build();
  await driver.manage().setTimeouts({implicit: 10000});
  try{

    await driver.get('http://localhost:3000/InsideOut');
    await driver.findElement(By.xpath("//a[@href='/login']")).click();

    // аутентификация
    await driver.wait(until.elementIsEnabled(driver.findElement(By.name("login"))))
      .then(()=>{
        driver.findElement(By.name("login")).sendKeys('happiness');
      });
    
    await driver.wait(until.elementIsEnabled(driver.findElement(By.name("pass"))))
      .then(()=>{
        driver.findElement(By.name("pass")).sendKeys('gogogo');
      });
    if(
      await driver.findElement(By.name("login")).getAttribute("value") == "happiness" &&
      await driver.findElement(By.name("pass")).getAttribute("value") == "gogogo"
    ) await driver.findElement(By.name("loginButton")).click();

    // сохранение воспоминания
    await driver.findElement(By.xpath("//a[@href='/memories']")).click();
    await driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//a[@href='/memories/save']"))))
    .then(async()=>{
      await driver.findElement(By.xpath("//a[@href='/memories/save']")).click();
      await driver.wait(until.elementIsEnabled(driver.findElement(By.name("date"))))
      .then(()=>{
        driver.findElement(By.name("date")).sendKeys(date);
        driver.findElement(By.name("type")).sendKeys(type);
        driver.findElement(By.name("desc")).sendKeys(desc);
        driver.findElement(By.name("rating")).sendKeys(rating);
        const addFile = driver.findElement(By.id("input__file")); 
        addFile.sendKeys("C:\\My\\- Pictures\\fox.jpg");
        driver.findElement(By.name("saveButton")).click(); 
      });
    });

    // транспортировка
    await driver.findElement(By.xpath("//a[@href='/transport']")).click();
    await driver.wait(until.elementIsEnabled(driver.findElement(By.name("dateMemory"))))
    .then(async()=>{
      await driver.findElement(By.name("dateMemory")).sendKeys(date);
      await driver.findElement(By.name("typeMemory")).sendKeys(type);
      await driver.findElement(By.name("searchButton")).click();
    });

    if(
      await driver.wait(until.elementIsEnabled(driver.findElement(By.xpath(`//*[contains(text(), "${date}")]`)))) &&
      await driver.wait(until.elementIsEnabled(driver.findElement(By.xpath(`//*[contains(text(), "${desc}")]`)))) &&
      await driver.wait(until.elementIsEnabled(driver.findElement(By.xpath(`//*[contains(text(), "${rating}")]`)))) 
    ) driver.findElement(By.xpath(`//*[contains(text(), "${desc}")]`)).click();

    await driver.findElement(By.name("MemorySelect")).click();
    await driver.findElement(By.xpath("(//option[@value='LongMemory'])")).click();
    await driver.findElement(By.name("transportButton")).click();

    // поиск
    await driver.findElement(By.xpath("//a[@href='/memories']")).click();
    await driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//a[@href='/memories/search']"))))
    .then(async()=>{
      await driver.findElement(By.xpath("//a[@href='/memories/search']")).click();
      await driver.wait(until.elementIsEnabled(driver.findElement(By.name("dateMemory"))))
      .then(async()=>{
        await driver.findElement(By.name("dateMemory")).sendKeys(date);
        await driver.findElement(By.name("typeMemory")).sendKeys(type);
        await driver.findElement(By.name("searchButton")).click();
      })
    });

    if(
      await driver.wait(until.elementIsEnabled(driver.findElement(By.xpath(`//*[contains(text(), "${date}")]`)))) &&
      await driver.wait(until.elementIsEnabled(driver.findElement(By.xpath(`//*[contains(text(), "${desc}")]`)))) &&
      await driver.wait(until.elementIsEnabled(driver.findElement(By.xpath(`//*[contains(text(), "${rating}")]`)))) 
    ) {
      driver.findElement(By.xpath(`//*[contains(text(), "${desc}")]`)).click();
      driver.findElement(By.name("infoButton")).click();
    }
  }
  finally{
    setTimeout(()=>{driver.quit();}, 3000);
  }
}

test();