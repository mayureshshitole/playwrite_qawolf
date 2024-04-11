// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const { test } = require("playwright/test");
const fs = require("fs");
async function saveHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // declaring all the important variables along with creating file
  const targetURL = "https://news.ycombinator.com";
  const articlesListFile = fs.createWriteStream("top_ten_articles.csv");
  articlesListFile.write("Rank,Articles_Title,URL\n");

  // go to Hacker News
  await page.goto(targetURL);

  // script for select all top 10 articles and add it to the csv file
  const articlesList = await page.$$(".titleline");
  // Looping through the top ten articles
  for (let i = 0; i < Math.min(10, articlesList.length); i++) {
    const link = await articlesList[i].$("a");

    // checking if I find the element or not and then adding it to the csv file
    if (link) {
      // get the title text only
      const titles = await link.innerText();
      // get the url of that article through
      const href = await link.getAttribute("href");

      // adding it to the csv file
      articlesListFile.write(`${i + 1},"${titles}","${href}"\n`);
    }
  }

  // Closing the file stream
  articlesListFile.end();

  // Closing the browser
  await browser.close();
}

(async () => {
  await saveHackerNewsArticles();
})();

/*

First, I will tell our program to open a web browser and create a special place where it can work using the Playwright library. 
Then, I ask the browser to go to the Hacker News website. 
Once there, I find the list of articles in a table and I noticed all the table data has same class name "titleline" for the titles, then I select that attribute and start looking for the a tag in it. 
For each article, I find the title and the web address that takes us to the full article. There is an a tag with title and url of that article. if you will see on actual webpage there is an reference website as well in the title I excluded it because we need title of an article only.
I saved down this information in a CSV file , with columns for the article's rank, title, and it's web address.
At the end finish writing our table and close the file stream and close the web browser using Playwright.
This was my simple flow of the program and what I understood while performing this task.
*/
