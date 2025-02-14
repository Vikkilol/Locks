document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("lock-container");
    const bridge = document.getElementById("bridge");

    if (!container || !bridge) {
        console.error("Lock container or bridge image not found!");
        return;
    }

    console.log("Lock container found! Waiting for bridge to load...");

    // Ensure the bridge image is fully loaded before positioning locks
    bridge.onload = () => {
        console.log("Bridge image loaded! Placing locks...");
        positionLocks();
    };

function positionLocks() {
    const bridgeRect = bridge.getBoundingClientRect(); // Get bridge size

    const locks = [
   /*     { id: 1, xPercent: 17.5, yPercent: 82, message: "Send messages to your favorite people ❤️", img: "lock2r.png", size: 45 },
        { id: 2, xPercent: 33.75, yPercent: 95, message: "Use a template, or use your own lock image!", img: "lock1r.png", size: 65 },
        { id: 3, xPercent: 50.125, yPercent: 78, message: "You can be annonymous, or include your name!", img: "lock3r.png", size: 100 },
        { id: 4, xPercent: 71, yPercent: 95, message: "Feel free to add extra messages! They'll be sent to the users in a DM.", img: "lock4r.png", size: 100 },
        { id: 5, xPercent: 78.75, yPercent: 82.75, message: "Fill out the form when you're ready!", img: "lock5r.png", size: 100 }, */
        { id: 6, xPercent: 71, yPercent: 89, message: "❤️ pinkmelodies + ChiaraNextDoor17 ❤️", img: "lock4r.png", size: 100 },
        { id: 7, xPercent: 39, yPercent: 89, message: "❤️ selfmate + centen ❤️", img: "lock4r.png", size: 100 },
        { id: 8, xPercent: 50, yPercent: 102, message: "❤️ pirioca + centen ❤️", img: "lock1r.png", size: 65 },
        { id: 9, xPercent: 27.5, yPercent: 102, message: "❤️ kahei + Muse ❤️", img: "lock4r.png", size: 100},
        { id: 10, xPercent: 78.75, yPercent: 103, message: "❤️To: Boyo---------------From:Anonymous❤️", img: "lock5r.png", size: 100},
        { id: 11, xPercent: 85, yPercent: 91, message: "❤️To: respectable082---------------From:Anonymous❤️", img: "lock1r.png", size: 65},
        { id: 12, xPercent: 63, yPercent: 103, message: "❤️ Harmony_Starz + Espoir ❤️", img: "lock5r.png", size: 100},
        { id: 13, xPercent: 31.5, yPercent: 91, message: "❤️ centen + pinkmelodies ❤️", img: "lock5r.png", size: 100},
        { id: 14, xPercent: 57, yPercent: 91, message: "❤️To: shadow---------------From:Anonymous❤️", img: "mk3.png", size: 60},
        { id: 15, xPercent: 41, yPercent: 102, message: "❤️To: velvet---------------From:Anonymous❤️", img: "mk3.png", size: 60},
        { id: 16, xPercent: 33, yPercent: 102, message: "❤️ badcrookshanks + Boyo ❤️", img: "lock1r.png", size: 65},
        { id: 17, xPercent: 47, yPercent: 92, message: "❤️ Harmony_Starz + crimson ❤️", img: "lock5r.png", size: 100},
        { id: 18, xPercent: 22, yPercent: 91, message: "❤️ Day + ani07 ❤️", img: "ani-day.png", size: 50},
        { id: 19, xPercent: 13.5, yPercent: 91, message: "❤️Day + Muse❤️", img: "lock1r.png", size: 65}
        
/*        { id: 7, xPercent: 33.75, yPercent: 95, message: "Use a template, or use your own lock image!", img: "lock1r.png", size: 65 },
        { id: 8, xPercent: 50.125, yPercent: 78, message: "You can be annonymous, or include your name!", img: "lock3r.png", size: 100},
        { id: 9, xPercent: 71, yPercent: 95, message: "Feel free to add extra messages! They'll be sent to the users in a DM.", img: "lock4r.png", size: 100 },
        { id: 10, xPercent: 78.75, yPercent: 82.75, message: "Fill out the form when you're ready!", img: "lock5r.png", size: 100 },
        { id: 11, xPercent: 17.5, yPercent: 82, message: "Send messages to your favorite people ❤️", img: "lock2r.png", size: 45 },
        { id: 12, xPercent: 33.75, yPercent: 95, message: "Use a template, or use your own lock image!", img: "lock1r.png", size: 65 },
        { id: 13, xPercent: 50.125, yPercent: 78, message: "You can be annonymous, or include your name!", img: "lock3r.png", size: 100 },
        { id: 14, xPercent: 71, yPercent: 95, message: "Feel free to add extra messages! They'll be sent to the users in a DM.", img: "lock4r.png", size: 100 },
        { id: 15, xPercent: 78.75, yPercent: 82.75, message: "Fill out the form when you're ready!", img: "lock5r.png", size: 45 }
        */
    ];

       locks.forEach(lock => {
        let lockElement = document.getElementById(`lock-${lock.id}`);
        if (!lockElement) {
            lockElement = document.createElement("img");
            lockElement.id = `lock-${lock.id}`;
            lockElement.className = "lock";
            lockElement.src = lock.img;
            lockElement.style.width = lock.size + "px"; 
            lockElement.style.height = "auto";
            container.appendChild(lockElement);
        }

        // Ensure locks are positioned **relative to the bridge** and centered properly
        lockElement.style.left = `calc(${lock.xPercent}% - ${lockElement.offsetWidth / 2}px)`;
        lockElement.style.top = `calc(${lock.yPercent}% - ${lockElement.offsetHeight / 2}px)`;

        // **Add the click event to show the message popup**
        lockElement.onclick = () => {
            showPopup(lock.message);
        };
    });

    console.log("Locks placed successfully!");
    }

    function showPopup(message) {
    const popupOverlay = document.getElementById("popup-overlay");
    const popupContent = document.getElementById("popup-content");

    if (popupOverlay && popupContent) {
        popupContent.innerHTML = `<p>${message}</p>`;
        popupOverlay.style.display = "flex";
    }
}

// Close popup when "X" is clicked
document.getElementById("close-popup").addEventListener("click", () => {
    document.getElementById("popup-overlay").style.display = "none";
});

    // Reposition locks on window resize
    window.addEventListener("resize", positionLocks);
    window.addEventListener("orientationchange", positionLocks);
});
