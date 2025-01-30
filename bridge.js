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

            // Adjust lock position **relative to the bridge image**, ensuring it stays inside
            let lockLeft = (lock.xPercent / 100) * bridgeRect.width + bridgeRect.left;
            let lockTop = (lock.yPercent / 100) * bridgeRect.height + bridgeRect.top;

            // Ensure locks don't go outside the bridge image
            if (lockLeft < bridgeRect.left) lockLeft = bridgeRect.left;
            if (lockLeft > bridgeRect.right) lockLeft = bridgeRect.right - lock.size;
            if (lockTop < bridgeRect.top) lockTop = bridgeRect.top;
            if (lockTop > bridgeRect.bottom) lockTop = bridgeRect.bottom - lock.size;

            lockElement.style.left = lockLeft + "px";
            lockElement.style.top = lockTop + "px";
        });
    }

    // Position locks when the page loads
    positionLocks();

    // Recalculate positions on resize or orientation change
    window.addEventListener("resize", positionLocks);
    window.addEventListener("orientationchange", positionLocks);
});
