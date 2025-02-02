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

        if (!bridge) {
        console.error("Bridge image not found!");
        return;
    }

    // Show mouse coordinates relative to the bridge
    bridge.addEventListener("mousemove", (event) => {
        const bridgeRect = bridge.getBoundingClientRect(); // Get bridge size
        const xPercent = ((event.clientX - bridgeRect.left) / bridgeRect.width) * 100;
        const yPercent = ((event.clientY - bridgeRect.top) / bridgeRect.height) * 100;

        console.log(`X: ${xPercent.toFixed(2)}%, Y: ${yPercent.toFixed(2)}%`);
    });

    console.log("Lock container found! Adding locks...");

    const locks = [
        { id: 1, xPercent: 19, yPercent: 50, message: "Send messages to your favorite people ❤️", img: "lock1.png", size: 50 },
        { id: 2, xPercent: 32, yPercent: 41, message: "Use a template, or use your own lock image!", img: "lock2.png", size: 50 },
        { id: 3, xPercent: 76, yPercent: 41, message: "DM the events team when you're ready!", img: "lock3.png", size: 50 }
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

lockElement.style.left = `${bridgeRect.left + (lock.xPercent / 100) * bridgeRect.width}px`;
lockElement.style.top = `${bridgeRect.top + (lock.yPercent / 100) * bridgeRect.height}px`;
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
