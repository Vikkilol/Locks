document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("lock-container");
    const bridge = document.getElementById("bridge");
    const popupOverlay = document.getElementById("popup-overlay");
    const popupContent = document.getElementById("popup-content");
    const closePopup = document.getElementById("close-popup");

        // Ensure popup is hidden on load
    popupOverlay.style.display = "none";

    if (!container || !bridge) {
        console.error("Lock container or bridge image not found!");
        return;
    }

    console.log("Lock container found! Adding locks...");

    const locks = [
        { id: 1, xPercent: 10, yPercent: 30, message: "Forever Love ❤️", img: "lock1.png", size: 40 },
        { id: 2, xPercent: 50, yPercent: 60, message: "Best Friends Forever 💕", img: "lock2.png", size: 50 },
        { id: 3, xPercent: 75, yPercent: 40, message: "Locked in Time 🔒", img: "lock3.png", size: 35 }
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
        popupOverlay.style.display = "none"; // Hide popup
    });

    // Position locks when the page loads
    positionLocks();

    // Recalculate positions on resize or orientation change
    window.addEventListener("resize", positionLocks);
    window.addEventListener("orientationchange", positionLocks);
});
