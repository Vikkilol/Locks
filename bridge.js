document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("lock-container");
    const bridge = document.getElementById("bridge");
 const popupOverlay = document.getElementById("popup-overlay");
    const popupContent = document.getElementById("popup-content");
    const closePopup = document.getElementById("close-popup");

    if (!container || !bridge) {
        console.error("Lock container or bridge image not found!");
        return;
    }

    console.log("Lock container found! Adding locks...");

    const locks = [
        { id: 1, xPercent: 30, yPercent: 30, message: "Here is an example of a message!", img: "lock1.png", size: 60 },
        { id: 2, xPercent: 45, yPercent: 69, message: "DM the events team when you're ready", img: "lock2.png", size: 65 },
        { id: 3, xPercent: 71, yPercent: 51, message: "Check out the thread for more info!", img: "lock3.png", size: 55 }
    ];

    function positionLocks() {
        const bridgeRect = bridge.getBoundingClientRect(); // Get bridge size

        locks.forEach(lock => {
            let lockElement = document.getElementById(`lock-${lock.id}`);
            if (!lockElement) {
                lockElement = document.createElement("img");
                lockElement.id = `lock-${lock.id}`;
                lockElement.className = "lock";
                lockElement.src = lock.img;
                lockElement.style.width = lock.size + "px"; 
                lockElement.style.height = "auto";

                // Show popup on click
                lockElement.addEventListener("click", () => {
                    popupContent.innerHTML = `<p>${lock.message}</p>`; // Insert message
                    popupOverlay.style.display = "flex"; // Show popup
                });

                container.appendChild(lockElement);
            }

            lockElement.style.left = (lock.xPercent / 100) * bridgeRect.width + "px";
            lockElement.style.top = (lock.yPercent / 100) * bridgeRect.height + "px";
        });
    }

    // Close popup when "X" is clicked
    closePopup.addEventListener("click", () => {
  // Ensure popup is hidden on load
    popupOverlay.style.display = "none";
    });

    // Position locks when the page loads
    positionLocks();

    // Recalculate positions on resize or orientation change
    window.addEventListener("resize", positionLocks);
    window.addEventListener("orientationchange", positionLocks);
});
