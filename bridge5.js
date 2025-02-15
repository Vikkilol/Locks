document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("lock-container");
    const bridge = document.getElementById("bridge");

    if (!container || !bridge) {
        console.error("Lock container or bridge image not found!");
        return;
    }

    console.log("Lock container found! Waiting for bridge to load...");

    bridge.onload = () => {
        console.log("Bridge image loaded! Placing locks...");
        positionLocks();
    };

    function positionLocks() {
        const bridgeRect = bridge.getBoundingClientRect();
        container.style.width = `${bridgeRect.width}px`;
        container.style.height = `${bridgeRect.height}px`;

        const scaleFactor = bridgeRect.width / 1600;
        const bridgeTop = bridge.getBoundingClientRect().top + window.scrollY;

        const locks = [
            { id: 6, column: 15.10, yAlign: 0.04, message: "❤️ pinkmelodies + ChiaraNextDoor17 ❤️", img: "lock4r.png", size: 100 },
            { id: 7, column: 9.47, yAlign: 0.29, message: "❤️ selfmate + centen ❤️", img: "lock4r.png", size: 100 },
            { id: 8, column: 12.2, yAlign: 0.065, message: "❤️ pirioca + centen ❤️", img: "lock1r.png", size: 85 },
            { id: 9, column: 5.55, yAlign: 0.29, message: "❤️ kahei + Muse ❤️", img: "lock4r.png", size: 100 },
            { id: 10, column: 17.78, yAlign: 0.068, message: "❤️To: Boyo---------------From:Anonymous❤️", img: "lock5r.png", size: 130 },
            { id: 11, column: 21.6, yAlign: 0.065, message: "❤️To: respectable082---------------From:Anonymous❤️", img: "lock1r.png", size: 85 },
            { id: 12, column: 13.27, yAlign: 0.3, message: "❤️ Harmony_Starz + Espoir ❤️", img: "lock5r.png", size: 130 },
            { id: 13, column: 6.6, yAlign: 0.07, message: "❤️ centen + pinkmelodies ❤️", img: "lock5r.png", size: 130 },
            { id: 14, column: 14.2, yAlign: 0.065, message: "❤️To: shadow---------------From:Anonymous❤️", img: "mk3.png", size: 75 },
            { id: 15, column: 11.25, yAlign: 0.34, message: "❤️To: velvet---------------From:Anonymous❤️", img: "mk3.png", size: 75 },
            { id: 16, column: 7.5, yAlign: 0.35, message: "❤️ badcrookshanks + Boyo ❤️", img: "lock1r.png", size: 85 },
            { id: 17, column: 10.25, yAlign: 0.085, message: "❤️ Harmony_Starz + crimson ❤️", img: "lock5r.png", size: 130 },
            { id: 18, column: 4.7, yAlign: 0.07, message: "❤️ Day + ani07 ❤️", img: "ani-day.png", size: 70 },
            { id: 19, column: 2.8, yAlign: 0.05, message: "❤️Day + Muse❤️", img: "lock1r.png", size: 85 },
            { id: 20, column: 17, yAlign: 0.34, message: "❤️To: Skyles_Daughter-----------From: Anonymous❤️", img: "lock1r.png", size: 85 },
            { id: 21, column: 18.7, yAlign: 0.36, message: "❤️Boyo + badcrookshanks❤️", img: "shanksboy.png", size: 60 },
            { id: 22, column: 19.7, yAlign: 0.062, message: "❤️zena + Ahsoka❤️", img: "vik.png", size: 106 }
        ];

        locks.forEach(lock => {
            let lockElement = document.getElementById(`lock-${lock.id}`);
            if (!lockElement) {
                lockElement = document.createElement("img");
                lockElement.id = `lock-${lock.id}`;
                lockElement.className = "lock";
                lockElement.src = lock.img;
                container.appendChild(lockElement);
            }

            const scaledSize = lock.size * scaleFactor;
            lockElement.style.width = `${scaledSize}px`;
            lockElement.style.height = "auto";

            const xPosition = (lock.column / 22) * bridgeRect.width;
            const yPosition = bridgeTop + (lock.yAlign * bridgeRect.height * 0.3) + (bridgeRect.height * 0.4);

            lockElement.style.left = `${xPosition}px`;
            lockElement.style.top = `${yPosition}px`;

            // Ensure clicking a lock shows the message
            lockElement.onclick = () => showPopup(lock.message);
        });
    }

    function showPopup(message) {
        const popupOverlay = document.getElementById("popup-overlay");
        const popupContent = document.getElementById("popup-content");

        if (popupOverlay && popupContent) {
            popupContent.innerHTML = `<p>${message}</p>`;
            popupOverlay.style.display = "flex";
        }
    }

    // Close popup when clicking the X button
    document.getElementById("close-popup").addEventListener("click", () => {
        document.getElementById("popup-overlay").style.display = "none";
    });

    // Ensure locks reposition on resize
    window.addEventListener("resize", positionLocks);
    window.addEventListener("orientationchange", positionLocks);
});
