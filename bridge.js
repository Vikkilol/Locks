document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("lock-container");

    if (!container) {
        console.error("Lock container not found!");
        return;
    }

    console.log("Lock container found! Adding locks...");

    const locks = [
        { id: 1, xPercent: 10, yPercent: 30, message: "Forever Love ❤️", img: "IMG_0175.webp" },
        { id: 2, xPercent: 50, yPercent: 60, message: "Best Friends Forever 💕", img: "lock2.png" },
        { id: 3, xPercent: 75, yPercent: 40, message: "Locked in Time 🔒", img: "lock3.png" }
    ];

    locks.forEach(lock => {
        const lockElement = document.createElement("img");
        lockElement.className = "lock";
        lockElement.src = lock.img; // Use custom lock image
        lockElement.style.left = lock.xPercent + "%";
        lockElement.style.top = lock.yPercent + "%";

        lockElement.addEventListener("click", () => {
            alert(lock.message);
        });

        container.appendChild(lockElement);
    });

    console.log("Locks added successfully!");
});
