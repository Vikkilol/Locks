document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("lock-container");
    const bridge = document.getElementById("bridge");

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
        const bridgeRect = bridge.getBoundingClientRect(); // Get bridge image dimensions

        locks.forEach(lock => {
            let lockElement = document.getElementById(`lock-${lock.id}`);
            if (!lockElement) {
                lockElement = document.createElement("img");
                lockElement.id = `lock-${lock.id}`;
                lockElement.className = "lock";
                lockElement.src = lock.img;
                lockElement.style.width = lock.size + "px";
                lockElement.style.height = "auto";
                lockElement.addEventListener("click", () => alert(lock.message));
                container.appendChild(lockElement);
            }

            // Set the lock position relative to the bridge image itself
            const lockLeft = lock.xPercent * bridgeRect.width / 100;
            const lockTop = lock.yPercent * bridgeRect.height / 100;

            lockElement.style.left = lockLeft + "px"; // Lock inside the bridge
            lockElement.style.top = lockTop + "px";
        });
    }

    // Position locks when the page loads
    positionLocks();

    // Recalculate positions on resize or orientation change
    window.addEventListener("resize", positionLocks);
    window.addEventListener("orientationchange", positionLocks);
});
