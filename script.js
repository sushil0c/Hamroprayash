document.addEventListener('DOMContentLoaded', function() {
    const voiceSelect = document.getElementById('voice');
    const speakButton = document.getElementById('speak');
    const textArea = document.getElementById('text');
    let voices = [];

    function populateVoiceList() {
        voices = window.speechSynthesis.getVoices();
        voiceSelect.innerHTML = '';
        voices.forEach((voice, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${voice.name} (${voice.lang})`;
            voiceSelect.appendChild(option);
        });
    }

    populateVoiceList();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    speakButton.addEventListener('click', function() {
        const text = textArea.value;
        const utterance = new SpeechSynthesisUtterance(text);
        const selectedVoice = voices[voiceSelect.value];
        utterance.voice = selectedVoice;
        window.speechSynthesis.speak(utterance);
    });
});
