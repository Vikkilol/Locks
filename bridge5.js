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
    const scaleFactor = bridgeRect.width / 1600;
    
    // Number of fence sections
    const numColumns = 22;
    const sectionWidth = bridgeRect.width / numColumns;
    
    // Define fence structure heights (as ratio of total height)
    const topBarY = 0.4;    // Position of the top horizontal bar
    const bottomBarY = 0.7;  // Position of the bottom horizontal bar
    const fenceHeight = bottomBarY - topBarY;
    
    const locks = [
        // yAlign values: 0 = at top bar, 1 = at bottom bar
        { id: 6, column: 15.62, yAlign: 0.6, message: "❤️ pinkmelodies + ChiaraNextDoor17 ❤️", img: "lock4r.png", size: 100 },
        { id: 7, column: 8.58, yAlign: 0.6, message: "❤️ selfmate + centen ❤️", img: "lock4r.png", size: 100 },
        { id: 8, column: 11, yAlign: 0.8, message: "❤️ pirioca + centen ❤️", img: "lock1r.png", size: 65 },
        { id: 9, column: 6.05, yAlign: 0.8, message: "❤️ kahei + Muse ❤️", img: "lock4r.png", size: 100},
        { id: 10, column: 17.325, yAlign: 0.85, message: "❤️To: Boyo---------------From:Anonymous❤️", img: "lock5r.png", size: 100},
        { id: 11, column: 19.58, yAlign: 0.6, message: "❤️To: respectable082---------------From:Anonymous❤️", img: "lock1r.png", size: 65},
        { id: 12, column: 13.86, yAlign: 0.85, message: "❤️ Harmony_Starz + Espoir ❤️", img: "lock5r.png", size: 100},
        { id: 13, column: 6.93, yAlign: 0.6, message: "❤️ centen + pinkmelodies ❤️", img: "lock5r.png", size: 100},
        { id: 14, column: 12.54, yAlign: 0.6, message: "❤️To: shadow---------------From:Anonymous❤️", img: "mk3.png", size: 60},
        { id: 15, column: 9.13, yAlign: 0.85, message: "❤️To: velvet---------------From:Anonymous❤️", img: "mk3.png", size: 60},
        { id: 16, column: 7.48, yAlign: 0.8, message: "❤️ badcrookshanks + Boyo ❤️", img: "lock1r.png", size: 65},
        { id: 17, column: 10.34, yAlign: 0.65, message: "❤️ Harmony_Starz + crimson ❤️", img: "lock5r.png", size: 100},
        { id: 18, column: 4.84, yAlign: 0.6, message: "❤️ Day + ani07 ❤️", img: "ani-day.png", size: 50},
        { id: 19, column: 3.102, yAlign: 0.6, message: "❤️Day + Muse❤️", img: "lock1r.png", size: 65},
        { id: 20, column: 14.41, yAlign: 0.85, message: "❤️To: Skyles_Daughter-----------From: Anonymous❤️", img: "lock1r.png", size: 65},
        { id: 21, column: 18.59, yAlign: 0.85, message: "❤️Boyo + badcrookshanks❤️", img: "shanksboy.png", size: 47},
        { id: 22, column: 18.04, yAlign: 0.6, message: "❤️zena + Ahsoka❤️", img: "vik.png", size: 85}
    ];

    locks.forEach(lock => {
        let lockElement = document.getElementById(`lock-${lock.id}`);
        if (!lockElement) {
            lockElement = document.createElement("img");
            lockElement.id = `lock-${lock.id}`;
            lockElement.className = "lock";
            lockElement.src = lock.img;
        }
        
        // Scale the lock size
        const scaledSize = lock.size * scaleFactor;
        lockElement.style.width = `${scaledSize}px`; 
        lockElement.style.height = "auto";
        
        if (!lockElement.parentElement) {
            container.appendChild(lockElement);
        }

        // Position based on column number and relative to fence bars
        const xPosition = (lock.column * sectionWidth);
        const yPosition = (topBarY + (lock.yAlign * fenceHeight)) * bridgeRect.height;
        
        lockElement.style.left = `${xPosition}px`;
        lockElement.style.top = `${yPosition}px`;

        lockElement.onclick = () => {
            showPopup(lock.message);
        };
    });

    console.log("Locks placed successfully!");
}

    function showPopup(message) {
        const popupOverlay = document.getElementById("popup-overlay");
        const popupContent = document.getElementById("popup-content");

        if (popupOverlay && popupContent) {
            popupContent.innerHTML = `<p>${message}</p>`;
            popupOverlay.style.display = "flex";
        }
    }

    document.getElementById("close-popup").addEventListener("click", () => {
        document.getElementById("popup-overlay").style.display = "none";
    });

    window.addEventListener("resize", positionLocks);
    window.addEventListener("orientationchange", positionLocks);
});
