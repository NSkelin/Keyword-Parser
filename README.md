Have you ever heard of, or been told to "tailor your resume to each job"? Well this app is a personal assistant that helps exactly with that!

Keyword-Parser <sub> (~~Patent~~ Name pending) </sub> searches job descriptions precisely for the keywords you tell it. It will then highlight those keywords for you and use them to decide which bullet points you should use.
This allows you to spend more time focusing on writing your best resume once, and less time curating it to match each job.

# Getting Started

The first thing we need to do is add some data. Currently you cant edit your data entirely in app, instead you can use Prisma Studio.

To do so, start by running prisma studio:

```bash
npx prisma studio
```

Open [http://localhost:5555](http://localhost:5555) with your browser and you will see something like so:
![image](https://github.com/NSkelin/Keyword-Parser/assets/31994545/e52b3c5f-3715-40f2-94a0-e64590b049e0)

From here you can add all the data you need to the database (stored locally on your pc). For more information on which models to update and what they are for, view [Adding data](#adding-data).

Once you are satisfied with your changes, save and run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser and you are now ready to get started.

# Usage

Keyword-Parser comes in two parts:

[**Keyword Parser**](#keyword-parser)

Responsible for finding, highlighting, and counting keywords.

[**Resume Assist**](#resume-assist)

Curates your resume based on your experience, keywords, and the text area.

## Keyword Parser

When you first open the app, you will notice two sections, the text area on the left and your keywords on the right.

### Text area
On the left is the text area where you enter the text you wish to be parsed for keywords. Any keywords found will be highlighted automatically.

### keywords
On the right is where you can see your keywords, as well as update them. The keywords here are what the text area uses in its search.
Once you have entered some text into the text area, the keywords will get sorted by quantity found.

![image](https://github.com/NSkelin/Keyword-Parser/assets/31994545/8a80b6e7-31ad-40e1-b4c0-2e01af1d3259)

### Adding keywords
Before you can add any keywords, you need to create a collection to hold them ([How to add a collection](#adding-data)). Think of a collection as a way to group similar keywords.

To add new keywords, click the "Add keyword" button. This will add that keyword to the collection under the button you clicked.
To edit or delete a keyword, find it in the collection and click the "Edit" button.

Both "Add keyword" and "Edit" buttons will open up this dialog

![image](https://github.com/NSkelin/Keyword-Parser/assets/31994545/e2eee3c6-2442-4ef4-8d86-603f55d78512)


| Input | Description |
| --- | --- |
| Display Name | How you want the keyword to be displayed. Its not used for parsing, so type what ever you want. |
| Proficient | Used in the Resume Assist feature, If you are confident in putting this keyword on your resume, select it. |
| Aliases | The words or acronyms used when searching the text area. Any aliases found will count together for this single keyword. Type a comma (,) to add an alias. |

## Resume Assist
The Resume Assist feature is an interactive resume mock that is automatically generated based off the current keywords found inside the text area, and your bullet points.

### Skills
The skills section automatically chooses relevant skills for you to use in your resume. These skills are chosen by searching the text area and your bullet points for your keywords.
Matches are then grouped into two colors before being displayed. Green means the skill was found in the text area and you selected the skill as proficient.
Red means you have this skill currently listed in an active bullet point.
When clicking the "Copy to clipboard" button, the colors will not be carried over.

![image](https://github.com/NSkelin/Keyword-Parser/assets/31994545/e0c4dbd5-f064-4cc2-996c-8e8998474529)


### Positions
A position is a label used to group related bullets points under.

![image](https://github.com/NSkelin/Keyword-Parser/assets/31994545/1d83f2aa-970a-4694-a4e2-66f1d0d33c3c)

### BulletList
The BulletList is a list of bullets you added for each position. This list automatically chooses which bullets to display based on your proficient keywords and the keywords found inside the text area.
It includes a handy "Copy to clipboard" button for easily copy-pasting the currated list into your resume. If you think the BulletList made a mistake, you can override any bullet by clicking the
checkbox to enable / disable it. To reset all overrides click the "Reset overrides" button near the top of the Resume Assist section.

![image](https://github.com/NSkelin/Keyword-Parser/assets/31994545/e91e8fa9-c622-4ce0-9b9e-c1356a8e0631)


## Adding data
Currently, adding data cannot be done wholey in app. Instead you must use Prisma Studio to access the databases tables directly.

Below is a handy table to give you a quick idea of which models you need for a feature, and what they are for:

**Keyword parser**

| Model | How to update | Description |
| --- | --- | --- |
| KeywordCollection | In Prisma Studio | A collection to group your keywords by. |
| Keyword | In app [(adding keywords)](#adding-keywords) | Your keyword. |
| KeywordAlias | In app [(adding keywords)](#adding-keywords) | All the different ways and acronyms you might use to spell a keyword. |

**Resume Assist**

| Model | How to update | Description |
| --- | --- | --- |
| ResumeSection | In Prisma Studio | General grouping for your different resume sections such as "Work Experience", "Projects", or "Education". |
| Position | In Prisma Studio | Sub groups for resume sections that describe an individual experience, project, or education. |
| Bullet | In Prisma Studio | The individual bullets that go under each position. |
