function send() {
    // Display typing message
    var typing_msg = document.createElement('div');
    typing_msg.setAttribute('class', 'msg1 typing');
    var typingId = generateUniqueId();
    typing_msg.setAttribute('id', typingId);
    var tb = document.getElementById('tb');
    tb.appendChild(typing_msg);
    var typing_msg_box = document.getElementById(typingId);
    var typing_msg_text = document.createElement('span');
    typing_msg_text.innerText = 'typing...';
    typing_msg_box.appendChild(typing_msg_text);
    
    var input_msg = document.getElementById('msg_text').value;
    var tb = document.getElementById('tb');
    if (input_msg != '') {
        var new_msg = document.createElement('div');
        new_msg.setAttribute('class', 'msg');
        var newId = generateUniqueId();
        new_msg.setAttribute('id', newId);
        tb.appendChild(new_msg);
        var msg_box = document.getElementById(newId);
        var msg_text = document.createElement('span');
        msg_text.innerText = input_msg;
        msg_box.appendChild(msg_text);
        const user_msg = input_msg;
        document.getElementById('msg_text').value = '';
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Remove typing message
                typing_msg_box.parentNode.removeChild(typing_msg_box);
                
                const responseData = JSON.parse(xhttp.responseText);
                const answerValue = responseData.answer;
                var ai_msg = document.createElement('div');
                ai_msg.setAttribute('class', 'msg1');
                var newId = generateUniqueId();
                ai_msg.setAttribute('id', newId);
                tb.appendChild(ai_msg);
                var ai_msg_box = document.getElementById(newId);
                var ai_msg_text = document.createElement('span');
                ai_msg_text.innerText = answerValue;
                ai_msg_box.appendChild(ai_msg_text);

                // Add spoken AI reply
                var ai_reply_audio = new SpeechSynthesisUtterance(answerValue);
                window.speechSynthesis.speak(ai_reply_audio);

                // Add copy button
                var copyButton = document.createElement('button');
                copyButton.innerText = 'Copy';
                copyButton.classList.add('copy-btn');
                ai_msg_text.focus();
                copyButton.addEventListener('click', function() {
                    navigator.clipboard.writeText(answerValue);
                });
                ai_msg_box.appendChild(copyButton);

                // Play sound
                var audio = new Audio('sound.mp3');
                audio.play();

                // Pause sound when AI reply is received
                ai_reply_audio.onend = function() {
                    audio.pause();
                };
            }
            tb.scrollTop = tb.scrollHeight;
        };
        xhttp.open("POST", "https://chatgpt.apinepdev.workers.dev/?question=" + user_msg, true);
        xhttp.send();
    }
}Enter file contents here
