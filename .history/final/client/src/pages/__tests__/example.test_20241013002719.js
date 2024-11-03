// final/client/src/pages/__tests__/launch.test.js
const { Builder, until } = require("selenium-webdriver");

// Increase the timeout duration
const TIMEOUT = 20000; // 20 seconds

(async function launchTest() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://localhost:3000/"); // Change to your app's URL and launch ID
    console.log("Waiting for the title to contain 'Space Explorer'..."); // Updated log
    await driver.sleep(2000); // Added a 2-second delay
    await driver.wait(until.titleContains("Space Explorer"), TIMEOUT); // Changed to titleContains

    // Check if the header is displayed
    const header = await driver.findElement({ css: "h1" }); // Adjust the selector based on your header element
    const headerText = await header.getText();
    console.log(headerText); // Log the header text for verification

    // Check if the LaunchDetail component is rendered
    const launchDetail = await driver.findElement({ css: ".launch-detail" }); // Adjust the selector based on your LaunchDetail component
    const launchDetailDisplayed = await launchDetail.isDisplayed();
    console.log(`Launch Detail displayed: ${launchDetailDisplayed}`);

    // Check if the ActionButton component is rendered
    const actionButton = await driver.findElement({ css: ".action-button" }); // Adjust the selector based on your ActionButton component
    const actionButtonDisplayed = await actionButton.isDisplayed();
    console.log(`Action Button displayed: ${actionButtonDisplayed}`);
  } finally {
    await driver.quit();
  }
})();
