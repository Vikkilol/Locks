document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("lock-container");
    const bridge = document.getElementById("bridge");

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
                lockElement.draggable = true; // Enable dragging

                container.appendChild(lockElement);
            }

            lockElement.style.left = (lock.xPercent / 100) * bridgeRect.width + "px";
            lockElement.style.top = (lock.yPercent / 100) * bridgeRect.height + "px";

            // Handle dragging
            lockElement.addEventListener("dragstart", (event) => {
                event.dataTransfer.setData("lockId", lock.id);
            });

            lockElement.addEventListener("dragover", (event) => {
                event.preventDefault(); // Allows dropping
            });

            lockElement.addEventListener("drop", (event) => {
                event.preventDefault();
                const lockId = event.dataTransfer.getData("lockId");
                const droppedLock = document.getElementById(`lock-${lockId}`);
                
                if (!droppedLock) return;

                // Convert mouse position to bridge-relative percentage
                const newXPercent = ((event.clientX - bridgeRect.left) / bridgeRect.width) * 100;
                const newYPercent = ((event.clientY - bridgeRect.top) / bridgeRect.height) * 100;

                // Update lock position
                droppedLock.style.left = `${newXPercent}%`;
                droppedLock.style.top = `${newYPercent}%`;

                console.log(`Lock ${lockId} placed at X: ${newXPercent.toFixed(2)}%, Y: ${newYPercent.toFixed(2)}%`);
            });
        });
    }

    positionLocks();
    window.addEventListener("resize", positionLocks);
    window.addEventListener("orientationchange", positionLocks);

    // Recalculate positions on resize or orientation change
  //  window.addEventListener("resize", positionLocks);
  //  window.addEventListener("orientationchange", positionLocks);
});
