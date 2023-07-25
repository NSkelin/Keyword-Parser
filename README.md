Have you ever been told to "tailor your resume to each job"? Well this app is a personal assistant that helps exactly with that!

Keyword-Parser <sub> (~~Patent~~ Name pending) </sub> searches job descriptions precisely for the keywords you tell it. It will then highlight those keywords for you and use them to decide which bullet points you should use.
This allows you to spend more time focusing on writing your best resume once, and less time reordering it to match each job.

Keyword-Parser comes in two parts, the **Keyword Parser**, and the **Resume Assist**.

## Getting Started

The first thing we need to do is add some data. Currently you cant edit your data entirely in app, instead you can use Prisma Studio.

To do so, start by running prisma studio:

```bash
npx prisma studio
```

Open [http://localhost:5555](http://localhost:5555) with your browser and you will see something like so:
![image](https://github.com/NSkelin/Keyword-Parser/assets/31994545/e52b3c5f-3715-40f2-94a0-e64590b049e0)

From here you can add all the data you need to the database (stored locally on your pc). For more info on what needs to be added in prisma studio, view [Adding data](#adding-data).

Once you are satisfied with your changes, save and run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser and you are now ready to get started.

## Usage

When you first open the app it will consist of two sections, one on the left and one of the right.
Paste the text you wish to parse on the left text area. On the right, you will see all of your keyword groups where you may create, update, or delete as many keywords as you want.

After pasting text into the text area on the left, the keywords inside the text will be automatically highlighted based on the keywords you add.

On the right your keywords will also be highlighted and sorted by quantity found in the text area.

![image](https://github.com/NSkelin/Keyword-Parser/assets/31994545/8a80b6e7-31ad-40e1-b4c0-2e01af1d3259)

### Adding keywords

### Adding data
Currently, adding data cannot be done wholey in app. Instead you must use Prisma Studio to access the databases tables.

Below is a handy table to give you a quick idea of which models you need for a feature, and how to update them:

**Keyword parser**

Finds, highlights, and counts keywords.
| Model | How to update | Description |
| --- | --- | --- |
| KeywordCollection | In Prisma Studio | A collection to group your keywords by. |
| Keyword | In app | Your keyword. |
| KeywordAlias | In app | All the different ways and acronyms you might use to spell a keyword. |

**Resume Assist**

A formatted to look similar to a resume.
| Model | How to update | Description |
| --- | --- | --- |
| ResumeSection | In Prisma Studio |  |
| Position | In Prisma Studio |  |
| Bullet | In Prisma Studio |  |
