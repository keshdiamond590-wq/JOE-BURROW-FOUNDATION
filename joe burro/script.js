document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("jbf-donation-form");
    const donationNote = document.getElementById("donation-note");
    const charCount = document.getElementById("char-count");
    const radioTiles = document.querySelectorAll(".radio-tile");

    // 1. Text Counter Strategy for Textarea Notes
    donationNote.addEventListener("input", function () {
        charCount.textContent = donationNote.value.length;
    });

    // 2. Radio Switcher Layout Toggler Accent
    radioTiles.forEach(tile => {
        tile.addEventListener("click", function () {
            radioTiles.forEach(t => t.classList.remove("active"));
            this.classList.add("active");
            
            const internalInput = this.querySelector("input[type='radio']");
            if (internalInput) internalInput.checked = true;
        });
    });

    // 3. Evaluation Handler interceptor
    form.addEventListener("submit", function (e) {
        let isValid = true;
        
        const firstName = document.getElementById("first-name");
        const lastName = document.getElementById("last-name");
        const email = document.getElementById("email");
        const amount = document.getElementById("donation-amount");

        // Clear previous alert error borders
        [firstName, lastName, email, amount].forEach(field => field.classList.remove("input-error"));

        // Name values checking
        if (!firstName.value.trim()) {
            firstName.classList.add("input-error");
            isValid = false;
        }
        if (!lastName.value.trim()) {
            lastName.classList.add("input-error");
            isValid = false;
        }

        // Standard Email RegExp pattern testing
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
            email.classList.add("input-error");
            isValid = false;
        }

        // Amount parameters matching window requirements (0.5 to 999999.99)
        const numericAmount = parseFloat(amount.value);
        if (isNaN(numericAmount) || numericAmount < 0.5 || numericAmount > 999999.99) {
            amount.classList.add("input-error");
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault(); // Stop processing pipeline
            alert("Please accurately fill out all required missing fields highlights.");
        }
    });
});