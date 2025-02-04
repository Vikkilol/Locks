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
        { id: 1, xPercent: 17.5, yPercent: 82, message: "Send messages to your favorite people ❤️", img: "lock2r.png", size: 45 },
        { id: 2, xPercent: 33.75, yPercent: 95, message: "Use a template, or use your own lock image!", img: "lock1r.png", size: 65 },
        { id: 3, xPercent: 75, yPercent: 82, message: "You can be annonymous, or include your name!", img: "lock3r.png", size: 100 },
        { id: 4, xPercent: 63, yPercent: 50, message: "Feel free to add extra messages! They'll be sent to the users in a DM.", img: "lock4r.png", size: 100 },
        { id: 5, xPercent: 78.75, yPercent: 82.75, message: "Fill out the form when you're ready!", img: "lock5r.png", size: 100 }
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
