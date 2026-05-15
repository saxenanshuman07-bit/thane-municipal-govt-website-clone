$(document).ready(function () {
    const $chatbot = $("#chatbot");
    const $toggle = $("#chatbot-toggle");
    const $close = $("#close");
    const $messages = $("#messages");
    const $input = $("#userInput");

    /* ================= TOGGLE CHAT ================= */
    $toggle.on("click", () => {
        $chatbot.fadeToggle();
        // Focus input and scroll to bottom when opening
        setTimeout(() => {
            $input.focus();
            scrollBottom();
        }, 100);
    });
    
    $close.on("click", () => $chatbot.fadeOut());

    /* ================= AUTO SCROLL ================= */
    function scrollBottom() {
        // Automatically scrolls to the bottom of the message area
        $messages.animate({ scrollTop: $messages.prop("scrollHeight") }, 400);
    }

    /* ================= MESSAGE RENDERING ================= */
    function userMessage(text) {
        $messages.append(`<div class="user-msg">${text}</div>`);
        scrollBottom();
    }

    function botMessage(text) {
        // 1. Show Typing Indicator
        const typingId = "typing-" + Date.now();
        $messages.append(`<div class="typing" id="${typingId}" style="font-size:0.8rem; color:#888; margin-left:10px;">Typing...</div>`);
        scrollBottom();
        
        // 2. Remove Typing and Show Message after delay
        setTimeout(() => {
            $(`#${typingId}`).remove();
            $messages.append(`<div class="bot-msg">${text}</div>`);
            scrollBottom();
        }, 600);
    }

    function showSuggestions(options) {
        setTimeout(() => {
            let html = '<div style="margin-left: 5px; margin-bottom: 5px;">';
            options.forEach(opt => {
                html += `<button class="suggestion-btn" data-val="${opt}">${opt}</button>`;
            });
            html += '</div>';
            $messages.append(html);
            scrollBottom();
        }, 700);
    }

    /* ================= SMART NAVIGATION LOGIC ================= */
    function handleInput(text) {
        const t = text.toLowerCase();

        // Greeting
        if (t.match(/\b(hi|hello|hey|namaste)\b/)) {
            botMessage("Namaste! Welcome to TMC. I can navigate the site for you.");
            showSuggestions(["Services", "Jobs", "Contact"]);
            return;
        }

        // Navigation: HOME
        if (t.includes("home") || t.includes("main")) {
            botMessage("Navigating to **Home Page**...");
            setTimeout(() => window.location.href = "index.html", 1000);
            return;
        }

        // Navigation: SERVICES
        if (t.includes("tax") || t.includes("bill") || t.includes("certificate") || t.includes("service")) {
            botMessage("Taking you to **Online Services**...");
            setTimeout(() => window.location.href = "services.html", 1500);
            return;
        }

        // Navigation: RECRUITMENT
        if (t.includes("job") || t.includes("recruit") || t.includes("career") || t.includes("vacancy")) {
            botMessage("Opening **Recruitment** section...");
            setTimeout(() => window.location.href = "recruitment.html", 1500);
            return;
        }

        // Navigation: CONTACT
        if (t.includes("contact") || t.includes("phone") || t.includes("complaint") || t.includes("email")) {
            botMessage("Redirecting to **Contact & Support**...");
            setTimeout(() => window.location.href = "contact.html", 1500);
            return;
        }

        // Navigation: RTS
        if (t.includes("rts") || t.includes("right")) {
            botMessage("Opening **RTS Act** details...");
            setTimeout(() => window.location.href = "rts.html", 1500);
            return;
        }

        // Navigation: ENTERTAINMENT
        if (t.includes("fun") || t.includes("park") || t.includes("lake") || t.includes("city life")) {
            botMessage("Let's explore **City Life**...");
            setTimeout(() => window.location.href = "entertainment.html", 1500);
            return;
        }

        // Fallback
        botMessage("I can help you navigate. Try asking for:");
        showSuggestions(["Home", "Services", "Contact"]);
    }

    /* ================= INPUT HANDLERS ================= */
    $input.on("keypress", function (e) {
        if (e.which === 13) { // Enter Key
            const text = $input.val().trim();
            if (!text) return;
            userMessage(text);
            $input.val("");
            handleInput(text);
        }
    });

    $(document).on('click', '.suggestion-btn', function() {
        const text = $(this).data('val');
        userMessage(text);
        handleInput(text);
    });

    /* ================= INITIAL GREETING ================= */
    setTimeout(() => {
        botMessage("👋 Hello! I am the TMC Assistant.");
        showSuggestions(["Pay Tax", "Job Openings", "Contact"]);
    }, 1000);
});