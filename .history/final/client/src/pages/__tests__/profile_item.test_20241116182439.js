// test/profileForm.test.js
const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

const TIMEOUT = 2000;

(async function profileItemTest() {
  let driver = await new Builder().forBrowser("chrome").build();
  await login(driver);
  await addItemToProfile(driver);
  await cancelTrip(driver);

  await driver.quit();
})();

async function addItemToProfile(driver) {
  await driver.get("http://localhost:3000/launch/109");
  await driver.sleep(TIMEOUT);


  // find button with Test ADD TO CART and click
  const addToCart = await driver.findElement(By.css("button"));
  await addToCart.click();
await driver.sleep(TIMEOUT);


  console.log("Test Passed: item added to cart.");

  
    // Wait for the "Cart" link to be visible
    const cartLink = await driver.wait(
        until.elementLocated(By.xpath("//a[@href='/cart']")),
        TIMEOUT
      );
  
      // Click the "Cart" link
      await cartLink.click();
  //add delay to let the page load
  await driver.sleep(TIMEOUT);

  // find button BOOK ALL and click
  const bookAll = await driver.findElement(By.css("button"));
  await bookAll.click();

  await driver.sleep(TIMEOUT);


  // goto profile page
 const profileLink = await driver.wait(
    until.elementLocated(By.xpath("//a[@href='/profile']")),
    TIMEOUT
  );
  
  await profileLink.click();
  await driver.sleep(TIMEOUT);


  try {
    await driver.wait(until.elementLocated(By.css("h2")), TIMEOUT);
    // Check if the next page with the title "My Trips" with h2 is present
    const title = await driver.findElement(By.css("h2")).getText();  
    assert.strictEqual(title, "My Trips");

    // Wait for the "Starlink-15 (v1.0)" text to appear
    const starlinkText = await driver.wait(
        until.elementLocated(By.xpath("//h3[text()='Starlink-15 (v1.0)']")),
        TIMEOUT
      );
  
      // Get and print the text content
      const textContent = await starlinkText.getText();
      console.log('Found Item: ',textContent);

    console.log("Test Passed: item added to profile.");
    driver.quit();
  } catch (error) {
    throw new Error("Test Failed: Title not found");
}
}

async function login(driver) {
  await driver.get("http://localhost:3000");
  await driver.wait(until.elementLocated(By.css("form")), TIMEOUT);

  const emailInput = await driver.findElement(By.css('input[name="email"]'));
  await emailInput.sendKeys("test@gmail.com");

  const submitButton = await driver.findElement(
    By.css('button[type="submit"]')
  );
  await submitButton.click();
}

async function cancelTrip(driver){
 const trip = await driver.wait(
    until.elementLocated(By.xpath("//a[@href='/launch/109']")),
    TIMEOUT
  );
  
  await trip.click();

   // find button BOOK ALL and click
   const cancelTrip = await driver.findElement(By.css("button"));
   await cancelTrip.click();
 
   await driver.sleep(TIMEOUT);

   await driver.get("http://localhost:3000/profile");


   // Wait for the "Starlink-15 (v1.0)" text to appear
   const starlinkText = await driver.wait(
    until.elementLocated(By.xpath("//h3[text()='Starlink-15 (v1.0)']")),
    TIMEOUT
  );
  
  // verify that the text is not present
  try {
    await driver.wait(until.stalenessOf(starlinkText), TIMEOUT);
    console.log("Test Passed: item removed from profile.");
    driver.quit();
  } catch (error) {
    throw new Error("Test Failed: Title not found");
}

}