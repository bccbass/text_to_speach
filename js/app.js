//Init SpeechSynth API
const synth = window.speechSynthesis;

//DOM Elements
const body = document.querySelector('body');
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');

// Init voices array

let voices = [];

const getVoices = () => {
    voices =  synth.getVoices();
    voices.forEach(voice => {
        //create option element
        const option = document.createElement('option')
        //populate option with text info:
        option.innerText = `${voice.name} (${voice.lang})`;

        // set needed option attributes:
        option.setAttribute('data-lang', voice.lang)
        option.setAttribute('data-name', voice.name)

        voiceSelect.append(option)
    }) 

}

getVoices()
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}



//SPEAK FUNCTIONALITY//

const speak = () => {

    //Check if speaking
    if (synth.speaking) {
        console.error('Already speaking...')
        return
    }
    if (textInput.value !== '') {

            //Add background animation
    body.style.background = '#141414 url(../img/wave.gif)'
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100% 95%';
    body.style.background.transition = '2s';
        //get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        //Speak end
        speakText.onend = e => {
            body.style.background = '#171717'

            console.log('done speaking...')
        }

        //speak error
        speakText.onerror = e => console.error('Something went wrong!')

        //Selected voice
        const selectedVoice = voiceSelect.selectedOptions[0]
        .getAttribute('data-name'); 

        //loop through voices
        voices.forEach(voice => {
            if (voice.name === selectedVoice){
                speakText.voice = voice;
            }
        })

        // Set rate and pitch
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        //speak
        synth.speak(speakText)
    } 
};

// Event Listeners

//text on submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});


// Rate Value Change
rate.addEventListener('change', e => rateValue.textContent = rate.value);

// Pitch Value Change
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

//Voice Select Change
voiceSelect.addEventListener('change', e => speak())