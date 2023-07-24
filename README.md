This is an assistant that helps with parsing and counting keywords.

## Getting Started

First, run prisma studio:

```bash
npx prisma studio
```

Open [http://localhost:5555](http://localhost:5555) with your browser to see the result.

In prisma studio, add and fill in atleast one row to the keywordCollection model. These act as groups for your keywords and currently can only be created through prisma studio.
Keywords can be adding in app.

Once done, save your changes and run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser and on the right you can add new keywords to each group you made in prisma studio. Once done, you are ready to use the app.

## Usage

When you first open the app it will consist of two sections, one on the left and one of the right.
Paste the text you wish to parse on the left text area. On the right, you will see all of your keyword groups where you may create, update, or delete as many keywords as you want.

After pasting text into the text area on the left, the keywords inside the text will be automatically highlighted based on the keywords you add.
On the right your keywords will also be highlighted and sorted by quantity found in the text area.

![image](https://github.com/NSkelin/Keyword-Parser/assets/31994545/53595512-8447-4529-aadb-692d124278ed)


