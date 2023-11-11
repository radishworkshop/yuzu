# Yuzu
The open-source translation management platform and localization system.

![landing page image](https://www.yuzujs.com/images/dist/landing-page.png)
<p>
  <a aria-label="Radish Workshop" href="https://yuzujs.com">
    <img src="https://img.shields.io/badge/Radish_Workshop-000000?style=for-the-badge">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/yuzu">
    <img alt="" src="https://img.shields.io/npm/v/yuzu.svg?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="License" href="https://github.com/radishworkshop/yuzu/blob/main/LICENSE.md">
    <img alt="" src="https://img.shields.io/npm/l/yuzu.svg?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="Join the community on Discord" href="https://yuzujs.com/discord">
    <img alt="" src="https://img.shields.io/badge/Join%20the%20community-blueviolet.svg?style=for-the-badge">
  </a>
</p>

## About Yuzu 🍋

Yuzu is an open-source platform for translation management and localization of codebases.
We are building it publicly for everyone to see and use, which helps us get
more feedback and input. Most users will only use the command line interface,
but you may also self-host the entire application if you prefer.

The hosted version is at [yuzujs.com](https://www.yuzujs.com) and the command-line
interface is at [npmjs.com/yuzu](https://npmjs.com/yuzu).

Yuzu takes an opinionated approach to localization, which saves time and simplifies the
process if you are able to follow the guidelines. The primary default assumption that is not common is that for readability and ease of initial adoption, your message id should simply be your default language string.

## Contact us 💌

If you want to learn more about this project or have any questions,
send us an email at [contact@yuzujs.com](mailto:contact@yuzujs.com).

## Built with 🛠️

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Clerk](https://clerk.com/)
- [Codesheets](https://codesheets.com/)
- [Xata](https://xata.io/)
- [DeepL](https://deepl.com/)
- [Google Translate](https://translate.google.com/)
- [next-international](https://next-international.vercel.app/)
- [OpenStatus](https://openstatus.dev/)

## Command Line Interface 👩‍💻
The following commands are the core operations of the [yuzu npm package](https://npmjs.com/yuzu). You'll also need to implement an underlying i18n library, such as next-international.

For NextJS, this includes wrapping your strings as messages, adding middleware, and building
a UI for language switcher. Examples of each are available in the [Yuzu docs](https://yuzujs.com/docs).

### Initialization
It's now [recommended](https://docs.npmjs.com/downloading-and-installing-packages-globally) to run `bunx` or `npx` instead of `npm -g`.
```bash
bunx yuzu init # or npx
```
The initializer will ask you a number of questions and create a `yuzu.config.ts` file.
TypeScript is recommended but not required.

This will also guide you through the process of creating a project on [yuzujs.com](https://yuzujs.com).

#### NextJS App Router
For projects using NextJS app router, Yuzu uses [next-international](https://next-international.vercel.app/) out of the box, an up-to-date library for i18n.

There are a few other common commands to manage strings and keep them in sync.

### Build
Locally sync your yuzu directory to t() wrapped strings.
```bash
bunx yuzu build # or npx
```
### Push
Push your messages and locales to your Yuzu project.
```bash
bunx yuzu push # or npx
```

### Translate
Use machine translation to fill in any missing translations in your Yuzu project.
Yuzu also provides you with a [Codesheet](https://codesheets.com) that you can make changes too, ask GPT-4 for
help with, or share with a multilingual friend or vendor for edits.
```bash
bunx yuzu translate # or npx
```

### Pull
Pull down the latest translations from your Yuzu project.
```bash
bunx yuzu pull # or npx
```

## Self-hosting 🖥️

### Requirements

- [Node.js](https://nodejs.org/en/) >= 18.0.0
- [Bun](https://bun.sh/) >= 1.0.8

### Setup

1. Clone the repository

   ```sh
   git clone https://github.com/radishworkshop/yuzu.git
   ```

2. Install dependencies

   ```sh
   bun i
   ```

3. Get your API keys

   For everything to work out of the box, you will need API keys for
   [Clerk](https://clerk.com) (Auth),
   [Codesheets](https://codesheets.com) (TMS + GPT-4),
   [Xata](https://xata.io) (DB, see `apps/web/db/xata.ts` for schema),
   [DeepL](https://www.deepl.com/pro-api) (ML translation),
   and [Google Translate](https://cloud.google.com/translate) (ML translation)

4. Set up your environment 

   In `apps/web` you will find .env.example. Change the name to .env.local and add your own values. You'll also want to update `apps/web/.xatarc` with your database URL.

5. Add your fonts
Yuzu uses a licensed font, [Codec Pro](https://www.zetafonts.com/codec-pro), which is not included in this git repository. You can license the font yourself, or add your own font files, or swap to a Google Font using `next/font/google` instead of `next/font/local`.

6. Start the development server

   ```sh
    bun dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see
   your server running.

### Videos

Videos to better understand Yuzu and YuzuJS

- [TODO(CLI demo)](https://youtube.com/watch?v=ID).
- [TODO(self-hosting demo)](https://youtube.com/watch?v=ID).

## Contributing 🤝

If you want to help us build the simplest platform for NextJS localization,
check out the [contributing guidelines](https://github.com/radishworkshop/yuzu/blob/main/CONTRIBUTING.md)