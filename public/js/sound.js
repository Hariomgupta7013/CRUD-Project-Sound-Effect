let soundEnabled = true; // Sound ON hai
let selectedGender = "female"; // Default Female voice
let selectedLanguage = "hi-IN"; // Default Hindi language
let selectedVoice = null; // Selected voice
let voices = []; // Browser ki available voices

const toggleButton = document.getElementById("soundToggle"); // Sound ON/OFF button
const settingsButton = document.getElementById("voiceSettingsButton"); // Settings button
const voicePanel = document.getElementById("voicePanel"); // Settings panel
const doneButton = document.getElementById("doneVoicePanel"); // Done button
const genderSelect = document.getElementById("genderSelect"); // Gender dropdown
const languageSelect = document.getElementById("languageSelect"); // Language dropdown
const voiceSelect = document.getElementById("voiceSelect"); // Voice dropdown
const speedRange = document.getElementById("speedRange"); // Speed slider
const speedValue = document.getElementById("speedValue"); // Speed value
const volumeRange = document.getElementById("volumeRange"); // Volume slider
const volumeValue = document.getElementById("volumeValue"); // Volume value


// Settings button par click
settingsButton.addEventListener(
    "click",
    function () {
        voicePanel.classList.toggle("show");  // Panel show/hide karna
    }
);


// Close button par click
doneButton.addEventListener(
    "click",
    function () {
        voicePanel.classList.remove("show"); // Panel hide karna
    }
);

// Browser Voices Load Karna
function loadVoices() {
    voices = speechSynthesis.getVoices(); // Browser ki available voices lena
    updateVoiceList(); // Voice dropdown update karna
}

// Kuch browsers voices ko late load karte hain
speechSynthesis.onvoiceschanged = loadVoices;

loadVoices(); // Page load hone par voices load karna


// Voice List Update
function updateVoiceList() {
    voiceSelect.innerHTML = ""; // Dropdown ko empty karna
    let languageVoices = voices.filter(function (voice) {  // Selected language ke voices filter karna
        return voice.lang
            .toLowerCase()
            .startsWith(
                selectedLanguage
                    .split("-")[0]
                    .toLowerCase()
            );
    });
    if (languageVoices.length === 0) { // Agar exact language voice nahi mili
        // Similar language search karna
        languageVoices =
            voices.filter(function (voice) {
                return voice.lang
                    .toLowerCase()
                    .includes(
                        selectedLanguage
                            .split("-")[0]
                            .toLowerCase()
                    );
            });
    }

    // Male / Female Voice Filter

    let genderVoices = languageVoices.filter(function (voice) {
        // Female voice
        if (selectedGender === "female") {
            return /female|woman|zira|samantha|karen|victoria|hazel|susan/i.test(voice.name);
        }
        // Male voice
        if (selectedGender === "male") {
            return /male|man|david|mark|alex|daniel|george|james/i.test(voice.name);
        }
        return true;
    });

    if (genderVoices.length === 0) { // Agar gender ke according voice nahi mili
        genderVoices = languageVoices; // Language ki saari voices use karenge
    }


    if (genderVoices.length === 0) { // Agar koi voice available nahi
        const option = document.createElement("option");
        option.textContent = "No voice available";
        voiceSelect.appendChild(option);
        selectedVoice = null;
        return;
    }

    genderVoices.forEach( // Dropdown mein voices add karna
        function (voice, index) {
            const option = document.createElement("option"); // Naya option
            option.value = index; // Option ki value
            // Voice ka naam
            option.textContent = voice.name;
            voiceSelect.appendChild(option); // Dropdown mein add
        }
    );
    // First voice default
    selectedVoice = genderVoices[0];
    voiceSelect.value = "0";
}
// Sound ON / OFF
toggleButton.addEventListener("click", function () {
    soundEnabled = !soundEnabled; // Sound ki value reverse
    if (!soundEnabled) { // Sound off
        speechSynthesis.cancel(); // Current speech stop
        toggleButton.innerHTML = "Sound OFF"; // Button text
        toggleButton.classList.remove("on");// ON class remove
        toggleButton.classList.add("off");
    }

    // Sound ON
    else {
        toggleButton.innerHTML = "Sound ON";
        toggleButton.classList.remove("off");
        toggleButton.classList.add("on");
    }
}
);

genderSelect.addEventListener( // Gender Change
    "change",
    function () {
        selectedGender = this.value;  // Selected gender save
        speechSynthesis.cancel(); // Current speech stop
        updateVoiceList(); // Voice list update
    }
);

// Language Change

languageSelect.addEventListener("change", function () {
    selectedLanguage = this.value;  // Selected language save
    speechSynthesis.cancel();  // Current speech stop
    updateVoiceList(); // Voice list update
}
);

// Specific Voice Change

voiceSelect.addEventListener("change", function () {
    let languageVoices = voices.filter(function (voice) {  // Selected language ki voices
        return voice.lang.toLowerCase()
            .startsWith(
                selectedLanguage
                    .split("-")[0]
                    .toLowerCase()
            );
    });

    // Gender voices
    let genderVoices = languageVoices.filter(function (voice) {
        if (selectedGender === "female") {
            return /female|woman|Jyoti|samantha|karen|victoria|hazel|susan/i.test(voice.name);
        }
        return /male|man|Hariom|mark|alex|daniel|george|james/i.test(voice.name);
    });

    // Agar gender voice nahi mili
    if (genderVoices.length === 0) {
        genderVoices = languageVoices;
    }
    // User ki selected voice
    selectedVoice = genderVoices[this.value];
}
);

// Speech Speed

speedRange.addEventListener("input", function () {
    speedValue.textContent = this.value + "x"; // Speed screen par show
}
);

// Volume

volumeRange.addEventListener("input", function () {
    const percentage = Math.round(this.value * 100); // Volume ko percentage mein convert
    volumeValue.textContent = percentage + "%"; // Screen par percentage
}
);

// Main Speak Function

function speakText(text) {
    // Sound OFF hai to kuch nahi
    if (!soundEnabled) {
        return;
    }

    // Previous speech stop
    speechSynthesis.cancel();
    // Empty text ko ignore
    if (!text || !text.trim()) {
        return;
    }

    // Speech object create
    const speech = new SpeechSynthesisUtterance(text.trim());

    // Language set
    speech.lang = selectedLanguage;

    // Selected voice
    if (selectedVoice) {
        speech.voice = selectedVoice;
    }

    // Speed set
    speech.rate = parseFloat(speedRange.value);

    // Pitch normal
    speech.pitch = 1;

    // Volume set
    speech.volume = parseFloat(volumeRange.value);

    // Speech start
    speechSynthesis.speak(speech);
}


// Hover Reading
const textElements = document.querySelectorAll(".read-text");
textElements.forEach(function (element) {
    element.addEventListener("mouseenter", function () {
        // Sound OFF hai to speech mat chalao
        if (!soundEnabled) {
            console.log("Sound is OFF");
            return;
        }
        const text = element.innerText.trim();
        if (!text) {
            return;
        }

        // Previous speech stop
        speechSynthesis.cancel();
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = selectedLanguage;
        speech.rate = parseFloat(speedRange.value);
        speech.pitch = 1;
        speech.volume = parseFloat(volumeRange.value);

        // Selected voice
        if (selectedVoice) {
            speech.voice = selectedVoice;
        }

        speech.onstart = function () {
            console.log("start");
        };

        speech.onend = function () {
            console.log("speech end");
        };

        speech.onerror = function (event) {
            console.log("speech error:", event.error);
        };
        speechSynthesis.speak(speech);
    });

});