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
                lockElement.addEventListener("click", () => alert(lock.message));
                container.appendChild(lockElement);
            }

            // Adjust lock position **relative to the bridge image** instead of screen
            lockElement.style.left = (lock.xPercent / 100) * bridgeRect.width + bridgeRect.left + "px";
            lockElement.style.top = (lock.yPercent / 100) * bridgeRect.height + bridgeRect.top + "px";
        });
    }

    // Position locks when the page loads
    positionLocks();

    // Adjust lock positions **only when resizing or rotating**, not when scrolling
    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(positionLocks, 100); // Prevent excessive recalculations
    });

    window.addEventListener("orientationchange", positionLocks);
});
