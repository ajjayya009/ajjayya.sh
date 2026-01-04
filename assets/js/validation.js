(() => {
    "use strict";

    const debounce = (fn, delay = 300) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    };

    const regex = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        alpha: /^[a-zA-Z\s]+$/
    };

    const validators = {
        required: (v) => v.trim() !== "",
        minLength: (v, l) => v.length >= l,
        email: (v) => regex.email.test(v),
        alpha: (v) => regex.alpha.test(v)
    };

    const showError = (field, msg) => {
        const error = document.getElementById(`${field.name}-error`);
        field.classList.add("border-red-500");
        error.textContent = msg;
        error.classList.remove("hidden");
    };

    const clearError = (field) => {
        const error = document.getElementById(`${field.name}-error`);
        field.classList.remove("border-red-500");
        error.textContent = "";
        error.classList.add("hidden");
    };

    const validateField = (field, rules) => {
        const value = field.value || "";

        for (const rule in rules) {
            if (rule === "messages") continue;

            if (!validators[rule](value, rules[rule])) {
                showError(field, rules.messages?.[rule] || "Invalid");
                return false;
            }
        }

        clearError(field);
        return true;
    };

    const validateForm = (form, config) => {
        let valid = true;

        Object.keys(config).forEach((name) => {
            const field = form.querySelector(`[name="${name}"]`);
            if (!field) return;

            if (!validateField(field, config[name])) {
                valid = false;
            }
        });

        return valid;
    };

    const initValidation = (formSelector, config) => {
        const form = document.querySelector(formSelector);
        if (!form) return;

        const debouncedHandler = debounce((e) => {
            const field = e.target;
            if (!field.name || !config[field.name]) return;
            validateField(field, config[field.name]);
        });

        const sendToWhatsApp = ({ phone, message }) => {
            const encodedMessage = encodeURIComponent(message);
            const url = `https://wa.me/${phone}?text=${encodedMessage}`;
            window.open(url, "_blank");
        };

        const buildWhatsAppMessage = (form) => {
            const data = new FormData(form);
            return `
                📩 *New Contact Form Message*

                👤 *Name:* ${data.get("username")}
                📧 *Email:* ${data.get("email")}
                💬 *Message:* 
                ${data.get("message")}
            `.trim();
        };


        // INPUT
        form.addEventListener("input", debouncedHandler);

        // BLUR
        form.addEventListener(
            "blur",
            (e) => {
                if (!e.target.name || !config[e.target.name]) return;
                validateField(e.target, config[e.target.name]);
            },
            true
        );

        // SUBMIT
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (!validateForm(form, validationConfig)) return;

            const message = buildWhatsAppMessage(form);

            sendToWhatsApp({
                phone: "916360045433", // 🔴 replace with your WhatsApp number
                message
            });
            form.reset();
        });
    };

    const validationConfig = {
        username: {
            required: true,
            alpha: true,
            minLength: 3,
            messages: {
                required: "Name required",
                alpha: "Only letters",
                minLength: "Min 3 chars"
            }
        },
        email: {
            required: true,
            email: true,
            messages: {
                required: "Email required",
                email: "Invalid email"
            }
        },
        message: {
            required: true,
            minLength: 10,
            messages: {
                required: "Message required",
                minLength: "Min 10 chars"
            }
        }
    };

    initValidation("#contactForm", validationConfig);
})();