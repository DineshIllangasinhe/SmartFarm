# Smart Farm research website

Course website for **R26-IT-093**, Faculty of Computing, SLIIT.

Group: Avishka Dinesh, Lahiru Shamika, Pramuditha Bandara, and Deshan Kodithuwakku.

This repository is the website only. It is HTML, CSS, and a small script. You do not need Flutter, Python packages, or the machine-learning models to open it.

## Run it

### 1. Get the project

If you do not have the folder yet:

```bash
git clone https://github.com/DineshIllangasinhe/SmartFarm.git
cd SmartFarm
```

If you already have the folder, open a terminal in that folder and run:

```bash
git pull
```

### 2. Start the site

You need Python installed. On Windows, Mac, or Linux, from the project folder run:

```bash
python -m http.server 8080
```

If that command is not found, try:

```bash
py -m http.server 8080
```

Leave that terminal open. Open a browser and go to:

[http://127.0.0.1:8080/](http://127.0.0.1:8080/)

Start at `index.html`. The menu links are Home, Domain, Milestones, Documents, Presentations, About us, and Contact us.

### 3. Stop the site

Click the terminal where the server is running and press `Ctrl + C`.

## If Python is not installed

You can still open the site by double-clicking `index.html`. Use the black navigation bar to move between pages. Search works more reliably when the site is started with the Python command above.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home |
| `domain.html` | Literature, research gap, problem, objectives, method, technologies |
| `milestones.html` | Proposal, progress presentations, final assessment, viva |
| `documents.html` | Reports, with the project documentation shown on the page |
| `files/project-documentation.html` | Full project documentation |
| `presentations.html` | Slide slots and the link to the project presentation |
| `files/project-presentation.html` | Project presentation (open it in the browser; arrow keys move the slides) |
| `about.html` | Group members |
| `contact.html` | Contact form |
| `search.html` | Search |

Shared styles are in `css/styles.css`. Shared script is in `js/site.js`.

## Documents and the presentation

The project documentation and the project presentation are already part of the site. Open Documents or Presentations in the menu, or go straight to `files/project-documentation.html` and `files/project-presentation.html`.

This site has no upload form. A report or slide deck is added by putting the file in the `files` folder and adding a link on `documents.html` or `presentations.html`. A PDF opens in the browser. Save a PowerPoint deck as PDF first, because a `.pptx` file will only download. Keep each file under the course limit of 20 MB.

## What not to do

Do not install the cattle-disease models or the Flutter app to view this website. Those live in the research codebase, not in this repository.
