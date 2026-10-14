# Grammar Garden · Year 5 English

A static, responsive lesson for the Starter Unit and Units 1–8 of the Year 5 English Plus 1 sequence. It teaches the 20 grammar ideas covered by the original revision bank using new explanations and examples. Pupils answer the unchanged 20 grammar and 5 vocabulary questions in an embedded Google Form.

## Publish on GitHub Pages

This repository is buildless. Serve it from the repository root with GitHub Pages. `index.html` is the entry point; no package installation or server is needed.

## Google Form

`site-config.js` contains the master Form's published student URL. The page embeds that Form in an iframe and also provides an open-in-new-tab link. A teacher can create a Form from `teacher-questions.html` (or copy the owner's private template if granted access), then paste the published student URL of their Form into the teacher setup box. The page creates a `?form=` class link that displays that teacher's Form.

The website sends no pupil answers to GitHub and has no database or analytics. Google Forms alone collects submissions. Pupil responses should remain accessible only to the Form owner and any editors the owner chooses. Keep any linked response Sheet private. Do not commit a response export, pupil information or an answer key to this public repository.

## Content and artwork

The question wording and answer scheme were recovered from the user's referenced Year 5 revision conversation. The 25 assessment questions live in Google Forms and in a questions-only teacher sheet. The answer scheme stays outside this public repository. The two raster illustrations in `assets/` were generated specifically for this site with the built-in image generation tool.

