const puppeteer = require("puppeteer");

const perplexity = {
  isInitialized: false,
  page: null,
  categories: [
    "all",
    "academic",
    "writing",
    "wolfram",
    "youtube",
    "reddit",
    "wikipedia"
  ],
  currentCategory: "all",
  categoryChange: false,
  send: async (message) => {
    return new Promise(function(resolve, reject) {
      async function sendMessage(i) {
        if (!perplexity.categoryChange) {
          await perplexity.page.goto("https://www.perplexity.ai/");
        } else perplexity.categoryChange = false;
        await type("textarea", i.toString().trim());
        await click("button.bg-super.text-sm");
        let wait = setInterval(async () => {
          let content = await perplexity.page.content();
          if (content.includes("Answer")) {
            let response = await perplexity.page.evaluate(`Object.values(document.querySelector("div.break-words.min-w-0").children[0].children[0].children).map(x => x).filter(x => x.className == "" && x.textContent.length > 5).map(x => x.textContent).join(" ")`);
            resolve(response.trim());
            clearInterval(wait);
          }
        }, 1000);
      }
      if (!perplexity.isInitialized) {
        let wait = setInterval(async () => {
          if (perplexity.isInitialized) {
            sendMessage(message);
            clearInterval(wait);
          }
        })
      } else sendMessage(message);
    });
  },
  forget: async function() {
    perplexity.isInitialized = false;
    await perplexity.page.evaluate(`
    (() => {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    })();
    localStorage.clear();
    sessionStorage.clear();
    `);
    await perplexity.page.deleteCookie();
    await perplexity.page.goto("https://www.perplexity.ai/");
    perplexity.isInitialized = true;
  },
  category: async function(type) {
    perplexity.categoryChange = true;
    perplexity.isInitialized = false;
    type = type.toString().toLowerCase().trim();
    await perplexity.page.goto("https://www.perplexity.ai/");
    if (perplexity.categories.indexOf(type) > -1) {
      await perplexity.page.evaluate(`Object.values(document.querySelectorAll("button")).filter(x => x.textContent.includes("Focus"))[0].click(), setTimeout(() => Object.values(document.querySelectorAll(".mt-one ml-two light font-sans text-xs font-medium text-textOff".replace(/ /gi, "."))).map(x => x.parentElement).filter(x => x.textContent.toLowerCase().includes("${type}"))[0].click(), 500)`);
      setTimeout(() => perplexity.isInitialized = true, 500);
    } else throw new Error(`Perplexity.AI: No category found called "${type}"`);
  }
};

async function type(element, text) {
  await perplexity.page.type(element, text);
}
async function press(element, key) {
  await (await perplexity.page.$(element)).press(key);
}
async function click(element) {
  await perplexity.page.waitForSelector(element);
  await perplexity.page.click(element);
}

(async () => {
  const browser = await puppeteer.launch({
    headless: "new"
  });
  const page = await browser.newPage();
  perplexity.page = page;
  await page.goto("https://perplexity.ai/");

  perplexity.isInitialized = true;
})();

module.exports = perplexity;