// Initialize pricing
const basePrice = 15;
let totalPrice = basePrice;

// Update price display
function updatePrice() {
    document.getElementById('total-price').textContent = totalPrice;
}

// Recalculate total price
function recalculateTotal() {
    totalPrice = basePrice;

    // Get selected options and add their prices
    document.querySelectorAll('.option.selected').forEach(option => {
        const price = parseFloat(option.getAttribute('data-price')) || 0;
        totalPrice += price;
    });

    updatePrice();
}

// Option selection
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function () {
        // Get parent group
        const group = this.closest('.form-group');

        // Remove selected class from siblings in the same group
        const siblings = group.querySelectorAll('.option');
        siblings.forEach(sibling => {
            sibling.classList.remove('selected');
        });

        // Add selected class to clicked option
        this.classList.add('selected');

        // Recalculate total price
        recalculateTotal();
    });
});

// Shared function to get order details
function getOrderDetails() {
    const selectedOptions = [];
    document.querySelectorAll('.option.selected').forEach(option => {
        selectedOptions.push(option.querySelector('.option-title').textContent);
    });

    const additionalNotes = document.getElementById('additional-notes').value;

    return {
        selectedOptions,
        additionalNotes,
        totalPrice
    };
}

// WhatsApp submission
document.getElementById('whatsapp-btn').addEventListener('click', function () {
    // Show loading animation
    document.getElementById('loading').style.display = 'block';

    // Simulate processing delay
    setTimeout(function () {
        const order = getOrderDetails();

        // Compose WhatsApp message
        const phoneNumber = "+989024645653";
        let message = "Hello! I want to order an AI Fusion video.\n\n";
        message += "*My selections:*\n";
        message += "▫️ Aspect Ratio: " + order.selectedOptions[0] + "\n";
        message += "▫️ Video Quality: " + order.selectedOptions[1] + "\n";
        message += "▫️ Frame Rate: " + order.selectedOptions[2] + "\n";
        message += "▫️ Video Style: " + order.selectedOptions[3] + "\n";
        message += "▫️ Music Style: " + order.selectedOptions[4] + "\n";
        message += "▫️ Delivery Option: " + order.selectedOptions[5] + "\n";
        message += "\n";
        message += "*Additional Notes:*\n" + (order.additionalNotes || "No additional notes") + "\n\n";
        message += "Total Price: €" + order.totalPrice + "\n\n";
        message += "I'll send my face photo in the next message.";

        // Open WhatsApp
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');

        // Hide loading animation
        document.getElementById('loading').style.display = 'none';
    }, 1500);
});

// Telegram submission
document.getElementById('telegram-btn').addEventListener('click', function () {
    // Show loading animation
    document.getElementById('loading').style.display = 'block';

    // Simulate processing delay
    setTimeout(function () {
        const order = getOrderDetails();

        // Compose Telegram message
        const telegramUsername = "kohandev";
        let message = "Hello! I want to order an AI Fusion video.%0A%0A";
        message += "*My selections:*%0A";
        message += "▫️ Aspect Ratio: " + order.selectedOptions[0] + "%0A";
        message += "▫️ Video Quality: " + order.selectedOptions[1] + "%0A";
        message += "▫️ Frame Rate: " + order.selectedOptions[2] + "%0A";
        message += "▫️ Video Style: " + order.selectedOptions[3] + "%0A";
        message += "▫️ Music Style: " + order.selectedOptions[4] + "%0A";
        message += "▫️ Delivery Option: " + order.selectedOptions[5] + "%0A";
        message += "%0A";
        message += "*Additional Notes:*%0A" + (order.additionalNotes || "No additional notes") + "%0A%0A";
        message += "Total Price: €" + order.totalPrice + "%0A%0A";
        message += "I'll send my face photo in the next message.";

        // Open Telegram
        window.open(`https://t.me/${telegramUsername}?start=${encodeURIComponent(message)}`, '_blank');

        // Hide loading animation
        document.getElementById('loading').style.display = 'none';
    }, 1500);
});

// Initialize price display
recalculateTotal();
