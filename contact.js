(function () {
    emailjs.init("ZlyIan_TuixwqaE2_");
})();

const form = document.getElementById("contactForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    emailjs.send("service_pdzc4ou", "template_ww08oio", {
        name: document.getElementById("nameInput").value,
        email: document.getElementById("emailInput").value,
        message: document.getElementById("messageInput").value
    })
        .then(function () {
            alert("Message sent successfully!");
            form.reset();
        })
        .catch(function (error) {
            console.error("EmailJS error:", error);
            alert("Failed to send message. Please try again.");
        });
});