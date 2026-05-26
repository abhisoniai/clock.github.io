// Settings module JavaScript

// Function to handle settings functionality
function initSettings() {
    const soundToggle = document.getElementById('sound-toggle');

    if (soundToggle) {
        soundToggle.addEventListener('change', function() {
            // In a real implementation, this would toggle sound on/off
            console.log('Sound setting changed');
        });
    }

    // Mouse Forward (M5) button shortcut to toggle sound effects
    document.addEventListener('mousedown', function(e) {
        if (e.button === 4) { // Forward button on mouse
            e.preventDefault();
            const toggle = document.getElementById('sound-toggle');
            if (toggle) {
                toggle.checked = !toggle.checked;
                const event = new Event('change', { bubbles: true });
                toggle.dispatchEvent(event);
            }
        }
    });
}

// Audio for sounds card
function initSoundButtons() {
    const soundButtons = document.querySelectorAll('.sound-btn');
    let currentAudio = null;
    let currentBtn = null;

    soundButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const soundPath = btn.getAttribute('data-sound');

            if (currentBtn === btn && currentAudio && !currentAudio.paused) {
                // Pause if clicking the same playing button
                currentAudio.pause();
                btn.classList.remove('playing');
                return;
            }

            // Reset previous
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
            if (currentBtn) {
                currentBtn.classList.remove('playing');
            }

            currentAudio = new Audio(soundPath);
            currentAudio.loop = true;
            currentAudio.play().catch(() => {});
            btn.classList.add('playing');
            currentBtn = btn;

            currentAudio.addEventListener('ended', () => {
                btn.classList.remove('playing');
            });
        });
    });
}

// Call the init function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initSettings();
    initSoundButtons();
});
