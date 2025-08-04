document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const sourceText = document.getElementById('source-text');
    const targetText = document.getElementById('target-text');
    const sourceLanguage = document.getElementById('source-language');
    const targetLanguage = document.getElementById('target-language');
    const translateBtn = document.getElementById('translate-btn');
    const swapBtn = document.getElementById('swap-languages');
    const copyBtn = document.getElementById('copy-translation');
    const speakBtn = document.getElementById('speak-translation');
    const sourceCharCount = document.getElementById('source-char-count');
    const translationStatus = document.getElementById('translation-status');
    
    // Character count update
    sourceText.addEventListener('input', function() {
        const count = sourceText.value.length;
        sourceCharCount.textContent = count;
        
        if (count > 5000) {
            sourceCharCount.style.color = 'red';
            translateBtn.disabled = true;
        } else {
            sourceCharCount.style.color = '#666';
            translateBtn.disabled = false;
        }
    });
    
    // Swap languages
    swapBtn.addEventListener('click', function() {
        const tempLang = sourceLanguage.value;
        sourceLanguage.value = targetLanguage.value;
        targetLanguage.value = tempLang;
        
        // Also swap text if there's a translation
        if (targetText.value) {
            const tempText = sourceText.value;
            sourceText.value = targetText.value;
            targetText.value = tempText;
        }
    });
    
    // Copy translation
    copyBtn.addEventListener('click', function() {
        if (targetText.value) {
            navigator.clipboard.writeText(targetText.value)
                .then(() => {
                    showStatus('Translation copied to clipboard!');
                })
                .catch(err => {
                    showStatus('Failed to copy text', true);
                    console.error('Failed to copy text: ', err);
                });
        }
    });
    
    // Text-to-speech
    speakBtn.addEventListener('click', function() {
        if (targetText.value) {
            const utterance = new SpeechSynthesisUtterance(targetText.value);
            utterance.lang = targetLanguage.value;
            speechSynthesis.speak(utterance);
            showStatus('Playing translation...');
        }
    });
    
    // Translate function
    translateBtn.addEventListener('click', function() {
        const text = sourceText.value.trim();
        if (!text) {
            showStatus('Please enter text to translate', true);
            return;
        }
        
        const sourceLang = sourceLanguage.value;
        const targetLang = targetLanguage.value;
        
        if (sourceLang === targetLang) {
            showStatus('Source and target languages are the same', true);
            return;
        }
        
        showStatus('Translating...');
        translateBtn.disabled = true;
        
        // Call the translation API
        performTranslation(text, sourceLang, targetLang);
    });
    
    // Function to perform translation using Google Translate API
    async function performTranslation(text, sourceLang, targetLang) {
        try {
            // Replace 'YOUR_GOOGLE_TRANSLATE_API_KEY' with your actual API key
            const apiKey = 'YOUR_GOOGLE_TRANSLATE_API_KEY';
            
            if (apiKey === 'YOUR_GOOGLE_TRANSLATE_API_KEY') {
                throw new Error('Please add your Google Translate API key to the script.js file');
            }
            
            // Google Translate API endpoint
            const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    q: text,
                    source: sourceLang === 'auto' ? '' : sourceLang,
                    target: targetLang,
                    format: 'text'
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.data && data.data.translations && data.data.translations[0]) {
                targetText.value = data.data.translations[0].translatedText;
                showStatus('Translation complete');
            } else {
                throw new Error('No translation received from API');
            }
            
        } catch (error) {
            console.error('Translation error:', error);
            
            if (error.message.includes('API key')) {
                showStatus('Please add your Google Translate API key to the script.js file', true);
            } else {
                showStatus('Translation failed: ' + error.message, true);
            }
            
            // Fallback to simulated translation for demo purposes
            setTimeout(() => {
                const simulatedTranslation = generateSimulatedTranslation(text, sourceLang, targetLang);
                targetText.value = simulatedTranslation;
                showStatus('Demo translation complete');
            }, 1000);
        } finally {
            translateBtn.disabled = false;
        }
    }
    
    // Function to generate simulated translation for demo purposes
    function generateSimulatedTranslation(text, sourceLang, targetLang) {
        const languageNames = {
            'en': 'English',
            'es': 'Spanish',
            'fr': 'French',
            'de': 'German',
            'it': 'Italian',
            'pt': 'Portuguese',
            'ru': 'Russian',
            'zh': 'Chinese',
            'ja': 'Japanese',
            'ar': 'Arabic',
            'hi': 'Hindi'
        };
        
        const sourceName = sourceLang === 'auto' ? 'detected language' : languageNames[sourceLang] || sourceLang;
        const targetName = languageNames[targetLang] || targetLang;
        
        // Create a simple simulated translation
        let translatedText = `[Simulated translation from ${sourceName} to ${targetName}]\n\n`;
        
        // Add some basic transformations for demo
        if (targetLang === 'es') {
            translatedText += text.replace(/hello/gi, 'hola').replace(/world/gi, 'mundo');
        } else if (targetLang === 'fr') {
            translatedText += text.replace(/hello/gi, 'bonjour').replace(/world/gi, 'monde');
        } else if (targetLang === 'de') {
            translatedText += text.replace(/hello/gi, 'hallo').replace(/world/gi, 'welt');
        } else {
            // Generic transformation
            translatedText += text.split('').reverse().join('');
        }
        
        return translatedText;
    }
    
    // Helper function to show status messages
    function showStatus(message, isError = false) {
        translationStatus.textContent = message;
        translationStatus.style.color = isError ? 'red' : '#666';
        
        if (!isError) {
            setTimeout(() => {
                translationStatus.textContent = '';
            }, 3000);
        }
    }
});