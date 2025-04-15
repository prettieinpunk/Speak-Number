const msgEl = document.getElementById('msg');

// Generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

const randomNum = getRandomNumber();
console.log(randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture user speak
function onSpeak(event) {
  const msg = event.results[0][0].transcript;  // You can log the event to view the structure of the data
  writeMessage(msg);
  checkNumber(msg);
}

// Listen to and handle result 
recognition.addEventListener('result', onSpeak);

//See in DOM what user has said
function writeMessage(msg) {
    const div = document.createElement('div')
    div.textContent = 'You said:';
    const span = document.createElement('span');
    span.classList.add('box');
    span.textContent = msg;
    msgEl.append(div,span);
 }

 //Check message against secret number 
 function checkNumber(msg) {
    console.log('Raw msg:', msg); //Chatgpt lead this debug 
    const num = Number(msg);

    //Check if content is a valid number 
    if (Number.isNaN(num)) {
        const div = document.createElement('div');
        div.textContent = 'That is not a valid number';
        msgEl.innerHTML = '';
        msgEl.append(div);
        return;
        }
 

    //Check if it's in range
    if (num < 1 || num > 100) {
        const div = document.createElement('div');
        div.textContent = 'Number must be between 1 and 100';
        msgEl.innerHTML = '';
        msgEl.append(div);
        return;
    }

    //Provide feedback
    if (num === randomNum) {
        const h2 = document.createElement('h2');
        h2.textContent = `Congrats! You have guessed the number! It was ${num} `;
        h2.classList.add('success-message');


        const button = document.createElement('button');
        button.classList.add('play-again');
        button.textContent = 'Play Again';
        button.addEventListener('click', () => window.location.reload());

        msgEl.innerHTML = '';

        msgEl.append(h2,button);      
        } else if (num > randomNum) {
        const div = document.createElement('div');
        div.textContent = "try a little it lower!"; 
        div.classList.add('lower-hint');
        msgEl.innerHTML = '';
        msgEl.append(div);
    } else {
        const div = document.createElement('div');
        div.textContent = "try a little it higher!";
        div.classList.add('higher-hint');
        msgEl.innerHTML = '';
        msgEl.append(div);
    }
 }

 //restarting 
 recognition.addEventListener('end', () => recognition.start());



