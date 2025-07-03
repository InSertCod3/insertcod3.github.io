function greeting(version=01){
    console.log(`%c ________________________________________ v.1.${version}
     ______  __      __    __  __  ______  __  __  ______  __  __       ______  ______  __   __  ______  ______  __      ______    
    /\\  __ \\/\\ \\    /\\ "-./  \\/\\ \\/\\  ___\\/\\ \\_\\ \\/\\__  _\\/\\ \\_\\ \\     /\\  ___\\/\\  __ \\/\\ "-.\\ \\/\\  ___\\/\\  __ \\/\\ \\    /\\  ___\\   
    \\ \\  __ \\ \\ \\___\\ \\ \\-./\\ \\ \\ \\ \\ \\__ \\ \\  __ \\/_/\\ \\/\\ \\____ \\    \\ \\ \\___\\ \\ \\/\\ \\ \\ \\-.  \\ \\___  \\ \\ \\/\\ \\ \\ \\___\\ \\  __\\   
     \\ \\_\\ \\_\\ \\_____\\ \\_\\ \\ \\_\\ \\_\\ \\_____\\ \\_\\ \\_\\ \\ \\_\\ \\/\\_____\\    \\ \\_____\\ \\_____\\ \\_\\"\\_\\/\\_____\\ \\_____\\ \\_____\\ \\_____\\ 
      \\/_/\\/_/\\/_____/\\/_/  \\/_/\\/_/\\/_____/\\/_/\\/_/  \\/_/  \\/_____/     \\/_____/\\/_____/\\/_/ \\/_/\\/_____/\\/_____/\\/_____/\\/_____/ 
        _________________________________ The Programmers Playground. \n`, "font-family:monospace")
    console.log('%c [x] - Site loaded and optimized for the user.', 'background: #4b5162; color: white; display: block;')
}

// A $( document ).ready() block.
$(function() {
    // Activate Console
    greeting();

    // Activate Toggle Switch
    $('.toggle-switch').click(function() {
        if ($(this).hasClass('active')){
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
        }
      });
});

// Live EST Clock
function updateESTClock() {
    const estClock = document.getElementById('est-clock');
    if (!estClock) return;
    const now = new Date();
    // Convert to EST (UTC-5 or UTC-4 for daylight saving)
    // Use Intl API for robust timezone handling
    const options = {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'America/New_York'
    };
    const timeString = now.toLocaleTimeString('en-US', options);
    estClock.textContent = timeString;
}
setInterval(updateESTClock, 1000);
document.addEventListener('DOMContentLoaded', updateESTClock);

