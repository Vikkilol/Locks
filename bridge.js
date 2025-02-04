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
            { id: 1, xPercent: 10, yPercent: 30, message: "Forever Love ❤️", img: "lock1.png", size: 40 },
            { id: 2, xPercent: 50, yPercent: 60, message: "Best Friends Forever 💕", img: "lock2.png", size: 50 },
            { id: 3, xPercent: 75, yPercent: 40, message: "Locked in Time 🔒", img: "lock3.png", size: 35 }
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
        });

        console.log("Locks placed successfully!");
    }

    // Reposition locks on window resize
    window.addEventListener("resize", positionLocks);
    window.addEventListener("orientationchange", positionLocks);
});
