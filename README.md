# Perplexity.AI Unofficial Node API
> An unofficial API for Node.js based off of the [Perplexity.AI](https://perplexity.ai) website and mobile app

### [9/28/2023] Notice
Cloudflare has made recent changes affecting bot-blockers like Puppeteer. This project is currently bugged and may not work. If anyone has suggestions or fixes, please let me know in the Issues section.

I will try to fix this package every chance I get, but for now, try using another AI service or use a python-compatable version of this package if available. Thank you for understanding and sorry for the inconvenience.

## Intro
This project is based off of an idea to make unofficial wrappers for AI sites that don't have an official API yet, and this idea is from the [`node_characterai`]() package.

__This project is not affiliated with Perplexity.AI in any way! It is a community project.__ The purpose of this project is to bring and build projects powered by Perplexity.AI.

If you like this project, please check their [website](https://perplexity.ai).

## Features
- Fully written in Javascript and CommonJS
- Asynchronous requests
- Easy to use
- Active development
- Send messages to Perplexity.AI
- Make the AI forget your message
- Customize your answers with categories
- Ask it basically anything

## Installation
```bash
$ npm install node_perplexityai
```

And if you want to save it to your env:
```bash
$ npm install node_perplexityai --save
```

## Usage

Here is a basic script that asks the AI a question:
```javascript
const perplexity = require("node_perplexityai");

(async () => {
  // Ask the AI a question
  const answer = await perplexity.send("Can dogs eat chocolate?");
  console.log(answer);
})();
```

All of the functions are listed here:
```javascript
const perplexity = require("node_perplexityai");

(async () => {
  // Ask the AI a question
  const answer1 = await perplexity.send("Who was the first person to step foot on The Moon?");

  console.log(answer1); // This logs the answer to your first question

  // List the available categories for asking questions (all, youtube, etc.)
  console.log(perplexity.categories);

  // Change the category of your next message
  await perplexity.category("wikipedia");

  // Ask the AI another question with the category "wikipedia"
  const answer2 = await perplexity.send("How tall is the One World Trade Center?");

  // Forgets your previous messages and resets the API
  await perplexity.forget();
})();
```

## FAQ
| Question | Answer |
| --- | --- |
| Do I need an account? | Nope! You can ask unlimited questions to the AI for free. Account login features may be added in the future for better access to Perplexity. |
| Error: No category found called "..." | You haven't selected the right category or have a typo. List the categories via `perplexity.categories`. |
| Is this an official API? | No, this is a __community-based__ project for building amazing projects using Perplexity.AI. |
| Are there any limits to using this? | No, you can use this package for anything without any limits or signing up. Just make sure you don't violate the [Perplexity.AI ToS](https://www.perplexity.ai/tos). |
| What does this package depend on? | The only dependency required is Puppeteer. It uses puppeteer to fetch the answer from the question sent to Perplexity.AI. It is installed automatically when installing this package. |
| Other issue? | Report it in the [Issues](https://github.com/Parking-Master/node_perplexityai/issues) tab |

### About Puppeteer
Any errors puppeteer related in this package can be reported in the Issues section, but please make note that if it is a full-on puppeteer related issue, I will close it.

__TL;DR__ if the issue is puppeteer related, please post it in the Issues section but I may close it if it's not related to `node_perplexityai`

### Support and Contribution
This project is updated frequently, always check for the latest version for new features or bug fixes.

If you have an issue or idea, let me know in the Issues tab. If you use this API, you also bound to the terms of usage of the Perplexity.AI website.

# License
MIT
###### &copy; 2021-2023 Parking Master
