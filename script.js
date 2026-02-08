// script.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const textInput = document.getElementById('textInput');
    const wordCountEl = document.getElementById('wordCount');
    const charCountDisplay = document.getElementById('charCountDisplay');
    const charWithSpacesEl = document.getElementById('charWithSpaces');
    const charWithoutSpacesEl = document.getElementById('charWithoutSpaces');
    const sentenceCountEl = document.getElementById('sentenceCount');
    const paragraphCountEl = document.getElementById('paragraphCount');
    const readingTimeEl = document.getElementById('readingTime');
    const speakingTimeEl = document.getElementById('speakingTime');
    const longSentencesEl = document.getElementById('longSentences');
    const readabilityScoreEl = document.getElementById('readabilityScore');
    
    // Progress Bars
    const charProgress = document.getElementById('charProgress');
    const charNoSpacesProgress = document.getElementById('charNoSpacesProgress');
    const speakingProgress = document.getElementById('speakingProgress');
    const longSentencesProgress = document.getElementById('longSentencesProgress');
    const readabilityProgress = document.getElementById('readabilityProgress');
    const goalProgress = document.getElementById('goalProgress');
    const goalText = document.getElementById('goalText');
    
    // Timing Elements
    const time15El = document.getElementById('time15');
    const time30El = document.getElementById('time30');
    const time60El = document.getElementById('time60');
    
    // Buttons
    const themeToggle = document.getElementById('themeToggle');
    const clearBtn = document.getElementById('clearBtn');
    const pasteBtn = document.getElementById('pasteBtn');
    const copyBtn = document.getElementById('copyBtn');
    const exportBtn = document.getElementById('exportBtn');
    const saveBtn = document.getElementById('saveBtn');
    const formatBtn = document.getElementById('formatBtn');
    const countWordsBtn = document.getElementById('countWordsBtn');
    const checkGrammarBtn = document.getElementById('checkGrammarBtn');
    const summarizeBtn = document.getElementById('summarizeBtn');
    const exportTxtBtn = document.getElementById('exportTxtBtn');
    const setGoalBtn = document.getElementById('setGoalBtn');
    const wordGoalInput = document.getElementById('wordGoal');
    
    // Platform buttons
    const platformButtons = document.querySelectorAll('.platform-btn');
    const platformInfo = document.getElementById('platformInfo');
    
    // Toast
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    // Default sample text
    const sampleText = `Welcome to WordMaster Pro! This is a powerful word counter tool.

With this tool, you can:
• Count words, characters, and sentences
• Calculate reading and speaking time
• Analyze text readability
• Get platform-specific guidelines
• Set and track writing goals

Try typing or pasting your own text to see real-time analysis. The tool will update all statistics instantly as you type.

Word counting is essential for writers, students, and professionals who need to meet specific length requirements. This tool helps you stay within limits and improve your writing.`;

    // Initialize with sample text
    textInput.value = sampleText;
    
    // Initialize all calculations
    updateAllStats();
    
    // Event Listeners
    textInput.addEventListener('input', updateAllStats);
    textInput.addEventListener('keyup', updateAllStats);
    textInput.addEventListener('paste', function() {
        setTimeout(updateAllStats, 10);
    });
    
    // Theme Toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Button Event Listeners
    clearBtn.addEventListener('click', clearText);
    pasteBtn.addEventListener('click', pasteText);
    copyBtn.addEventListener('click', copyText);
    exportBtn.addEventListener('click', exportText);
    saveBtn.addEventListener('click', saveText);
    formatBtn.addEventListener('click', formatText);
    countWordsBtn.addEventListener('click', function() {
        updateAllStats();
        showToast('Word count updated!');
    });
    checkGrammarBtn.addEventListener('click', checkGrammar);
    summarizeBtn.addEventListener('click', summarizeText);
    exportTxtBtn.addEventListener('click', exportAsTxt);
    setGoalBtn.addEventListener('click', setWordGoal);
    
    // Platform buttons
    platformButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            platformButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updatePlatformInfo(this.dataset.platform);
        });
    });
    
    // Initialize platform info
    updatePlatformInfo('all');
    
    // Functions
    
    function updateAllStats() {
        const text = textInput.value;
        
        // Basic counts
        const words = countWords(text);
        const charsWithSpaces = text.length;
        const charsWithoutSpaces = text.replace(/\s/g, '').length;
        const sentences = countSentences(text);
        const paragraphs = countParagraphs(text);
        const readingTime = calculateReadingTime(words);
        const speakingTime = calculateSpeakingTime(words);
        const longSentences = countLongSentences(text);
        const readability = calculateReadability(text);
        
        // Update DOM
        wordCountEl.textContent = words.toLocaleString();
        charCountDisplay.textContent = charsWithSpaces.toLocaleString();
        charWithSpacesEl.textContent = charsWithSpaces.toLocaleString();
        charWithoutSpacesEl.textContent = charsWithoutSpaces.toLocaleString();
        sentenceCountEl.textContent = sentences.toLocaleString();
        paragraphCountEl.textContent = paragraphs.toLocaleString();
        readingTimeEl.textContent = readingTime;
        speakingTimeEl.textContent = speakingTime;
        longSentencesEl.textContent = longSentences;
        readabilityScoreEl.textContent = Math.round(readability);
        
        // Update progress bars
        updateProgressBars(words, charsWithSpaces, sentences, longSentences, readability);
        
        // Update timing calculator
        updateTimingCalculator(words);
        
        // Update goal progress
        updateGoalProgress(words);
    }
    
    function countWords(text) {
        if (!text.trim()) return 0;
        // Remove extra whitespace and split by spaces
        return text.trim().split(/\s+/).length;
    }
    
    function countSentences(text) {
        if (!text.trim()) return 0;
        // Split by sentence endings (. ! ?)
        const sentences = text.split(/[.!?]+/);
        // Filter out empty strings
        return sentences.filter(s => s.trim().length > 0).length;
    }
    
    function countParagraphs(text) {
        if (!text.trim()) return 0;
        // Split by new lines and filter out empty lines
        return text.split(/\n+/).filter(p => p.trim().length > 0).length;
    }
    
    function calculateReadingTime(words) {
        // Average reading speed: 200 words per minute
        const minutes = Math.ceil(words / 200);
        return minutes > 0 ? `${minutes}m` : '0m';
    }
    
    function calculateSpeakingTime(words) {
        // Average speaking speed: 130 words per minute
        const minutes = Math.ceil(words / 130);
        return minutes > 0 ? `${minutes}m` : '0m';
    }
    
    function countLongSentences(text) {
        const sentences = text.split(/[.!?]+/);
        let longCount = 0;
        
        sentences.forEach(sentence => {
            const wordCount = sentence.trim().split(/\s+/).length;
            if (wordCount > 20) { // Sentences with more than 20 words are considered long
                longCount++;
            }
        });
        
        return longCount;
    }
    
    function calculateReadability(text) {
        if (!text.trim()) return 100;
        
        const words = countWords(text);
        const sentences = countSentences(text);
        const characters = text.replace(/\s/g, '').length;
        
        if (sentences === 0 || words === 0) return 100;
        
        // Simple readability formula (simplified Flesch Reading Ease)
        const avgSentenceLength = words / sentences;
        const avgWordLength = characters / words;
        
        let score = 100;
        
        // Adjust score based on sentence length
        if (avgSentenceLength > 25) score -= 30;
        else if (avgSentenceLength > 20) score -= 20;
        else if (avgSentenceLength > 15) score -= 10;
        
        // Adjust score based on word length
        if (avgWordLength > 6) score -= 20;
        else if (avgWordLength > 5) score -= 10;
        
        // Ensure score is between 0 and 100
        return Math.max(0, Math.min(100, score));
    }
    
    function updateProgressBars(words, chars, sentences, longSentences, readability) {
        // Character progress (scaled)
        const maxChars = 5000;
        const charPercent = Math.min((chars / maxChars) * 100, 100);
        charProgress.style.width = `${charPercent}%`;
        
        // Characters without spaces progress
        const charsNoSpaces = chars - (words - 1);
        const charNoSpacesPercent = Math.min((charsNoSpaces / maxChars) * 100, 100);
        charNoSpacesProgress.style.width = `${charNoSpacesPercent}%`;
        
        // Speaking time progress (assuming 5 minute speech = 650 words)
        const speakingPercent = Math.min((words / 650) * 100, 100);
        speakingProgress.style.width = `${speakingPercent}%`;
        
        // Long sentences progress
        const longSentencePercent = sentences > 0 ? (longSentences / sentences) * 100 : 0;
        longSentencesProgress.style.width = `${Math.min(longSentencePercent, 100)}%`;
        
        // Readability progress
        readabilityProgress.style.width = `${readability}%`;
        
        // Set color based on readability
        if (readability >= 70) {
            readabilityProgress.style.background = 'linear-gradient(90deg, #10b981, #34d399)';
        } else if (readability >= 50) {
            readabilityProgress.style.background = 'linear-gradient(90deg, #f59e0b, #fbbf24)';
        } else {
            readabilityProgress.style.background = 'linear-gradient(90deg, #ef4444, #f87171)';
        }
    }
    
    function updateTimingCalculator(words) {
        // Words needed for different video lengths
        const words15 = Math.ceil(15 * 2.5); // 2.5 words per second
        const words30 = Math.ceil(30 * 2.5);
        const words60 = Math.ceil(60 * 2.5);
        
        time15El.textContent = `${Math.min(words, words15)}/${words15} words`;
        time30El.textContent = `${Math.min(words, words30)}/${words30} words`;
        time60El.textContent = `${Math.min(words, words60)}/${words60} words`;
        
        // Color coding
        const updateTimeElement = (element, current, target) => {
            element.style.color = current >= target ? '#10b981' : '#ef4444';
        };
        
        updateTimeElement(time15El, words, words15);
        updateTimeElement(time30El, words, words30);
        updateTimeElement(time60El, words, words60);
    }
    
    function updateGoalProgress(words) {
        const goal = parseInt(wordGoalInput.value) || 1000;
        const progressPercent = Math.min((words / goal) * 100, 100);
        
        goalProgress.style.width = `${progressPercent}%`;
        goalText.textContent = `${words}/${goal} words`;
        
        // Color coding
        if (progressPercent >= 100) {
            goalProgress.style.background = 'linear-gradient(90deg, #10b981, #34d399)';
            goalText.style.color = '#10b981';
        } else if (progressPercent >= 75) {
            goalProgress.style.background = 'linear-gradient(90deg, #f59e0b, #fbbf24)';
            goalText.style.color = '#f59e0b';
        } else {
            goalProgress.style.background = 'linear-gradient(90deg, #4361ee, #7209b7)';
            goalText.style.color = '#4361ee';
        }
    }
    
    function setWordGoal() {
        const goal = parseInt(wordGoalInput.value);
        if (goal && goal > 0) {
            updateGoalProgress(countWords(textInput.value));
            showToast(`Word goal set to ${goal} words`);
        } else {
            showToast('Please enter a valid number', 'error');
        }
    }
    
    function updatePlatformInfo(platform) {
        let infoHTML = '';
        
        switch(platform) {
            case 'youtube':
                infoHTML = `
                    <h4>YouTube Guidelines</h4>
                    <ul>
                        <li>Title: 60 characters max</li>
                        <li>Description: 5,000 characters</li>
                        <li>Tags: 500 characters total</li>
                        <li>Video Script: 800-1,500 words</li>
                    </ul>
                `;
                break;
            case 'twitter':
                infoHTML = `
                    <h4>Twitter Guidelines</h4>
                    <ul>
                        <li>Tweet: 280 characters max</li>
                        <li>Thread: 2,500 characters per tweet</li>
                        <li>Hashtags: 2-3 recommended</li>
                        <li>Optimal tweet: 71-100 characters</li>
                    </ul>
                `;
                break;
            case 'instagram':
                infoHTML = `
                    <h4>Instagram Guidelines</h4>
                    <ul>
                        <li>Caption: 2,200 characters max</li>
                        <li>Bio: 150 characters</li>
                        <li>Hashtags: 30 max per post</li>
                        <li>Optimal caption: 138-150 characters</li>
                    </ul>
                `;
                break;
            default:
                infoHTML = `
                    <h4>Word Count Guidelines</h4>
                    <ul>
                        <li>Twitter: 280 characters max</li>
                        <li>Instagram Caption: 2,200 characters</li>
                        <li>YouTube Description: 5,000 characters</li>
                        <li>Blog Post: 1,500-2,500 words</li>
                        <li>Email Subject: 50 characters optimal</li>
                        <li>Meta Description: 155 characters</li>
                    </ul>
                `;
        }
        
        platformInfo.innerHTML = infoHTML;
    }
    
    function toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        showToast(`Switched to ${isDark ? 'dark' : 'light'} mode`);
    }
    
    function clearText() {
        textInput.value = '';
        updateAllStats();
        showToast('Text cleared');
    }
    
    function pasteText() {
        navigator.clipboard.readText()
            .then(text => {
                textInput.value = text;
                updateAllStats();
                showToast('Text pasted from clipboard');
            })
            .catch(err => {
                showToast('Failed to paste text', 'error');
                console.error('Paste error:', err);
            });
    }
    
    function copyText() {
        if (!textInput.value.trim()) {
            showToast('No text to copy', 'error');
            return;
        }
        
        navigator.clipboard.writeText(textInput.value)
            .then(() => {
                showToast('Text copied to clipboard');
            })
            .catch(err => {
                showToast('Failed to copy text', 'error');
                console.error('Copy error:', err);
            });
    }
    
    function exportText() {
        const text = textInput.value;
        if (!text.trim()) {
            showToast('No text to export', 'error');
            return;
        }
        
        const stats = getStatsText();
        const content = `${stats}\n\n${text}`;
        
        downloadFile(content, 'wordmaster-text.txt');
        showToast('Text exported as TXT file');
    }
    
    function exportAsTxt() {
        exportText();
    }
    
    function saveText() {
        const text = textInput.value;
        if (!text.trim()) {
            showToast('No text to save', 'error');
            return;
        }
        
        const stats = getStatsText();
        const data = {
            text: text,
            stats: stats,
            timestamp: new Date().toISOString(),
            wordCount: countWords(text)
        };
        
        localStorage.setItem('wordmaster_saved_text', JSON.stringify(data));
        showToast('Text saved locally');
    }
    
    function formatText() {
        let text = textInput.value;
        
        // Remove extra spaces
        text = text.replace(/\s+/g, ' ');
        
        // Capitalize first letter of each sentence
        text = text.replace(/(^\s*|[.!?]\s+)([a-z])/g, (match, p1, p2) => p1 + p2.toUpperCase());
        
        // Ensure single space after punctuation
        text = text.replace(/([.!?])\s*/g, '$1 ');
        
        // Trim whitespace
        text = text.trim();
        
        textInput.value = text;
        updateAllStats();
        showToast('Text formatted');
    }
    
    function checkGrammar() {
        const text = textInput.value;
        if (!text.trim()) {
            showToast('No text to check', 'error');
            return;
        }
        
        // Simple grammar check simulation
        const errors = [];
        
        // Check for double spaces
        if (text.includes('  ')) {
            errors.push('Remove double spaces');
        }
        
        // Check for multiple exclamation marks
        if (text.includes('!!!')) {
            errors.push('Avoid multiple exclamation marks');
        }
        
        // Check for passive voice patterns
        const passivePatterns = [' is ', ' are ', ' was ', ' were ', ' be ', ' been ', ' being '];
        passivePatterns.forEach(pattern => {
            if (text.toLowerCase().includes(pattern)) {
                errors.push('Consider using active voice');
            }
        });
        
        if (errors.length > 0) {
            showToast(`Grammar issues found: ${errors.join(', ')}`, 'warning');
        } else {
            showToast('No major grammar issues found');
        }
    }
    
    function summarizeText() {
        const text = textInput.value;
        if (!text.trim()) {
            showToast('No text to summarize', 'error');
            return;
        }
        
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        if (sentences.length <= 3) {
            showToast('Text is already short', 'info');
            return;
        }
        
        // Simple summarization: take first and last sentences
        const summary = sentences[0] + '. ' + sentences[sentences.length - 1] + '.';
        textInput.value = summary;
        updateAllStats();
        showToast('Text summarized');
    }
    
    function getStatsText() {
        const text = textInput.value;
        return `WORDMASTER PRO ANALYSIS
Generated: ${new Date().toLocaleString()}
Words: ${countWords(text)}
Characters (with spaces): ${text.length}
Characters (without spaces): ${text.replace(/\s/g, '').length}
Sentences: ${countSentences(text)}
Paragraphs: ${countParagraphs(text)}
Reading Time: ${calculateReadingTime(countWords(text))}
Speaking Time: ${calculateSpeakingTime(countWords(text))}
Long Sentences: ${countLongSentences(text)}
Readability Score: ${Math.round(calculateReadability(text))}/100
====================`;
    }
    
    function downloadFile(content, filename) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    function showToast(message, type = 'success') {
        toastMessage.textContent = message;
        
        // Set icon based on type
        const icon = toast.querySelector('i');
        switch(type) {
            case 'error':
                icon.className = 'fas fa-exclamation-circle';
                toast.style.borderLeftColor = '#ef4444';
                icon.style.color = '#ef4444';
                break;
            case 'warning':
                icon.className = 'fas fa-exclamation-triangle';
                toast.style.borderLeftColor = '#f59e0b';
                icon.style.color = '#f59e0b';
                break;
            default:
                icon.className = 'fas fa-check-circle';
                toast.style.borderLeftColor = '#10b981';
                icon.style.color = '#10b981';
        }
        
        toast.classList.add('show');
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    // Load saved text
    const savedData = localStorage.getItem('wordmaster_saved_text');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            // Optional: Add a button to load saved text
        } catch (e) {
            console.error('Error loading saved text:', e);
        }
    }
});