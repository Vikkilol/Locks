document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("lock-container");

    // Example locks with preset positions and messages
    const locks = [
        { id: 1, x: 100, y: 300, message: "Forever Love" },
        { id: 2, x: 250, y: 300, message: "Best Friends Forever 💕" },
        { id: 3, x: 400, y: 200, message: "Locked in Time 🔒" },
    ];

    locks.forEach(lock => {
        const lockElement = document.createElement("div");
        lockElement.className = "lock";
        lockElement.style.left = lock.x + "px";
        lockElement.style.top = lock.y + "px";
        lockElement.innerHTML = "🔒"; // Lock emoji, can be replaced with an image
        lockElement.style.position = "absolute";
        lockElement.style.cursor = "pointer";

        // Show message when clicked
        lockElement.addEventListener("click", () => {
            alert(lock.message);
        });

        container.appendChild(lockElement);
    });
});
