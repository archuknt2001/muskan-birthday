const openButton = document.getElementById("openButton");

const welcomeScreen = document.querySelector(".welcome-screen");

const balloonScreen = document.getElementById("balloonScreen");

const balloons = document.querySelectorAll(".balloon");

const balloonCount = document.getElementById("balloonCount");

const balloonSuccess = document.getElementById("balloonSuccess");

const continueButton = document.getElementById("continueButton");


// Cake elements

const cakeScreen = document.getElementById("cakeScreen");

const blowButton = document.getElementById("blowButton");

const flame = document.getElementById("flame");

const blowHint = document.querySelector(".blow-hint");

const cakeSuccess = document.getElementById("cakeSuccess");

const cakeContinueButton = document.getElementById("cakeContinueButton");


let remainingBalloons = balloons.length;


/* =========================
   1. OPEN SURPRISE
========================= */

openButton.addEventListener("click", function () {

    welcomeScreen.style.display = "none";

    balloonScreen.style.display = "flex";

});


/* =========================
   2. POP BALLOONS
========================= */

balloons.forEach(function (balloon) {

    balloon.addEventListener("click", function () {

        balloon.style.transform = "scale(0)";

        balloon.style.opacity = "0";

        balloon.style.pointerEvents = "none";


        remainingBalloons--;

        balloonCount.textContent = remainingBalloons;


        // All balloons popped

        if (remainingBalloons === 0) {

            setTimeout(function () {

                document.querySelector(".game-content h2").style.display = "none";

                document.querySelector(".game-label").style.display = "none";

                document.querySelector(".game-instruction").style.display = "none";

                document.querySelector(".balloon-area").style.display = "none";

                document.querySelector(".balloon-counter").style.display = "none";


                balloonSuccess.style.display = "block";

            }, 500);

        }

    });

});


/* =========================
   3. GO TO CAKE SCREEN
========================= */

continueButton.addEventListener("click", function () {

    // Hide balloon screen

    balloonScreen.style.display = "none";


    // Show cake screen

    cakeScreen.style.display = "flex";

});

/* =========================
   4. REAL BLOW THE CANDLE
========================= */

blowButton.addEventListener("click", async function () {

    try {

        // Ask for microphone permission

        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true
        });


        // Create audio context

        const audioContext =
            new (window.AudioContext || window.webkitAudioContext)();


        const analyser = audioContext.createAnalyser();

        analyser.fftSize = 512;


        const microphone =
            audioContext.createMediaStreamSource(stream);


        microphone.connect(analyser);


        const dataArray =
            new Uint8Array(analyser.fftSize);


        // Change button text

        blowButton.textContent = "💨 Blow Now!";


        blowHint.textContent =
            "Blow into your microphone now! 💨";


        let blowingStarted = false;


        function detectBlow() {

            analyser.getByteTimeDomainData(dataArray);


            let sum = 0;


            for (let i = 0; i < dataArray.length; i++) {

                const value =
                    (dataArray[i] - 128) / 128;

                sum += value * value;

            }


            const volume =
                Math.sqrt(sum / dataArray.length);


            /*
             * If the sound is loud enough,
             * we consider it a blow.
             */

            if (volume > 0.12) {

                blowingStarted = true;

            }


            if (blowingStarted && volume < 0.08) {

                turnOffCandle();

                return;

            }


            requestAnimationFrame(detectBlow);

        }


        detectBlow();


        /*
         * Stop microphone and show
         * birthday success screen.
         */

        function turnOffCandle() {

            flame.style.display = "none";


            blowButton.style.display = "none";

            blowHint.style.display = "none";


            stream.getTracks().forEach(function (track) {

                track.stop();

            });


            audioContext.close();


            setTimeout(function () {

                document.querySelector(".cake-label").style.display = "none";

                document.querySelector(".cake-content h2").style.display = "none";

                document.querySelector(".cake-instruction").style.display = "none";

                document.querySelector(".cake-container").style.display = "none";


                cakeSuccess.style.display = "block";

            }, 700);

        }


    } catch (error) {

        console.log(error);


        /*
         * If microphone permission is denied,
         * provide a simple fallback.
         */

        blowButton.textContent =
            "🔥 Tap To Blow Candle";


        blowHint.textContent =
            "Microphone unavailable — tap the button instead. ❤️";


        blowButton.onclick = function () {

            flame.style.display = "none";

            blowButton.style.display = "none";

            blowHint.style.display = "none";


            setTimeout(function () {

                document.querySelector(".cake-label").style.display = "none";

                document.querySelector(".cake-content h2").style.display = "none";

                document.querySelector(".cake-instruction").style.display = "none";

                document.querySelector(".cake-container").style.display = "none";


                cakeSuccess.style.display = "block";

            }, 700);

        };

    }

});

/* =========================
   5. GO TO LETTER
========================= */

const letterScreen = document.getElementById("letterScreen");

const letterText = document.getElementById("letterText");

const memoryButton = document.getElementById("memoryButton");


cakeContinueButton.addEventListener("click", function () {

    // Hide cake screen

    cakeScreen.style.display = "none";


    // Show letter screen

    letterScreen.style.display = "flex";


    // Start typing the letter

    typeLetter();

});


/* =========================
   TYPEWRITER EFFECT
========================= */

function typeLetter() {

    const message = `Dear Muskan, ❤️

It’s funny how a friendship can start so simply and slowly become so special. ❤️

When we first met at Amity, we were just classmates. We never knew those ordinary classroom days would turn into some of the most beautiful memories of our college life. 🥹❤️

Our little group of four — me, you, Kashish and Nikee — has given me countless memories. From sitting together in class and going everywhere together to random talks and endless laughter, somehow every ordinary day became special. 🫶

In the beginning, you and I weren’t that close, but things changed after I visited your home for the first time. We talked for so long and shared so many things, and that’s when I truly realised what a beautiful person you are. ❤️

Then, on Holi, u came at my home, where we had so much fun. And honestly, one of my favourite things is how close you became with my mummy. 😂❤️ Sometimes I feel you enjoy talking to her more than talking to me! 😂 But secretly, I love how much you both adore each other. 🥹💕

From Holi to Eid at Kashish’s house, from sitting together in college to doing barati dance in an empty classroom and then dancing on the Amity stage — we’ve really come a long way! 😂💃

Somewhere along the way, our thoughts, choices and situations started matching more and more. Sometimes we are exactly alike, and sometimes we couldn’t be more opposite. 😂 And then, of course, there’s our **MIND’S BLUETOOTH CONNECTION**:

**“Bluetooth device connected successfully.”** 🔵📱😂

And how can I forget our favourite hobby — roasting Nikee together! 😂❤️

Musu, you always say that if I were a boy, you would be my girlfriend 😂, And honestly, the way you make me feel so special, I know how much this friendship means to you. ❤️

Thank you for making my presence matter, for sharing your ups and downs with me, for laughing with me, and for making my college life so much more fun and memorable.

We may come from different backgrounds and have different beliefs, but somehow our friendship has always been bigger than all of that. ❤️🫂

From studying together, to dreaming about working together someday, and hopefully sharing many more chapters of life — I just hope this friendship keeps growing stronger. 🥹💕

**Happy Birthday, Musu!** 🎂🎉

Stay lazy, stay beautiful, stay foodie, keep making me laugh, and please never stop being my special person. 😂❤️
`;





    letterText.textContent = "";

    memoryButton.style.display = "none";


    let index = 0;

    const typingSpeed = 35;


    function typeNextCharacter() {

        if (index < message.length) {

            letterText.textContent += message.charAt(index);

            index++;

            setTimeout(
                typeNextCharacter,
                typingSpeed
            );

        } else {

            // Letter finished

            memoryButton.style.display = "inline-block";

        }

    }


    typeNextCharacter();

}
/* =========================
   6. MEMORY GALLERY
========================= */

const memoryScreen =
    document.getElementById("memoryScreen");

const finalBirthdayButton =
    document.getElementById("finalBirthdayButton");


memoryButton.addEventListener("click", function () {

    // Hide letter

    letterScreen.style.display = "none";


    // Show memory gallery

    memoryScreen.style.display = "block";


    // Start gallery from top

    memoryScreen.scrollTop = 0;

});
/* =================================
   7. FINAL BIRTHDAY SURPRISE
================================= */

const finalScreen =
    document.getElementById("finalScreen");

const replayButton =
    document.getElementById("replayButton");


/* One Last Surprise button */

finalBirthdayButton.addEventListener("click", function () {

    // Hide Memory Gallery

    memoryScreen.style.display = "none";


    // Show Final Birthday Screen

    finalScreen.style.display = "block";


    // Start from top

    finalScreen.scrollTop = 0;


    // Start confetti

    createConfetti();


    playBirthdayMusic();

});


/* =================================
   CONFETTI
================================= */

function createConfetti() {

    const confettiSymbols = [
        "🎉",
        "🎊",
        "❤️",
        "💖",
        "✨",
        "💕",
        "🌸"
    ];


    for (let i = 0; i < 45; i++) {

        const confetti =
            document.createElement("div");


        confetti.className =
            "birthday-confetti";


        confetti.innerText =
            confettiSymbols[
                Math.floor(
                    Math.random() *
                    confettiSymbols.length
                )
            ];


        confetti.style.left =
            Math.random() * 100 + "vw";


        confetti.style.animationDuration =
            (3 + Math.random() * 3) + "s";


        confetti.style.animationDelay =
            Math.random() * 1.5 + "s";


        document.body.appendChild(
            confetti
        );


        setTimeout(function () {

            confetti.remove();

        }, 7000);

    }

}


/* =================================
   REPLAY STORY
================================= */

replayButton.addEventListener(
    "click",
    function () {

        finalScreen.style.display =
            "none";

        memoryScreen.style.display =
            "block";

        memoryScreen.scrollTop = 0;

    }
);
/* =================================
   REAL BIRTHDAY MUSIC
================================= */

let birthdayMusic = new Audio("music/birthday-piano.mp3");

birthdayMusic.loop = true;

birthdayMusic.volume = 0.35;


function playBirthdayMusic() {

    birthdayMusic.currentTime = 0;

    birthdayMusic.play().catch(function(error) {

        console.log("Music could not start:", error);

    });

}