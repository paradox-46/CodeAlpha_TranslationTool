# CodeAlpha_TranslationTool
# Language Translation Tool

A simple web-based language translation tool that allows users to translate text between multiple languages, copy translations, and listen to translated text using text-to-speech.

## Features

- Translate text between popular languages (English, Spanish, French, German, Italian, Portuguese, Russian, Chinese, Japanese, Arabic, Hindi)
- Auto-detect source language option
- Swap source and target languages
- Character count with a 5000 character limit
- Copy translated text to clipboard
- Listen to translated text using browser text-to-speech
- Responsive design for desktop and mobile

## Usage

1. Open `index.html` in your web browser.
2. Select the source and target languages.
3. Enter text in the source box.
4. Click **Translate** to get the translation.
5. Use the **Copy** button to copy the translation or **Speak** to listen to it.

## Translation API

This tool is designed to use the [Google Translate API](https://cloud.google.com/translate/docs/reference/rest/v2/translate) for real translations.  
**Note:** You must add your Google Translate API key in [`script.js`](script.js):

```js
const apiKey = 'YOUR_GOOGLE_TRANSLATE_API_KEY'; // Replace with your API key
```

If no API key is provided, the tool will show a simulated translation for demo purposes.

## Project Structure

- [`index.html`](index.html): Main HTML file
- [`styles.css`](styles.css): Stylesheet for UI
- [`script.js`](script.js): JavaScript logic

## License

This project is provided for educational/demo
