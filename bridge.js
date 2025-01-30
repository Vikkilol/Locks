document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("lock-container");

    if (!container) {
        console.error("Lock container not found!");
        return;
    }

    console.log("Lock container found! Adding locks...");

    const locks = [
        { id: 1, xPercent: 10, yPercent: 30, message: "Forever Love ❤️", img: "Love.png", size: 80 },
        { id: 2, xPercent: 50, yPercent: 60, message: "Best Friends Forever 💕", img: "lock2.png", size: 20 },
        { id: 3, xPercent: 75, yPercent: 40, message: "Locked in Time 🔒", img: "lock3.png", size: 35 }
    ];

    locks.forEach(lock => {
        const lockElement = document.createElement("img");
        lockElement.className = "lock";
        lockElement.src = lock.img;
        lockElement.style.left = lock.xPercent + "%";
        lockElement.style.top = lock.yPercent + "%";
        lockElement.style.width = lock.size + "px"; // Set width based on lock size
        lockElement.style.height = "auto"; // Maintain aspect ratio

        lockElement.addEventListener("click", () => {
            alert(lock.message);
        });

        container.appendChild(lockElement);
    });

    console.log("Locks added successfully!");
});
