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
    option.addEventListener('click', function() {
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

// Format message for different platforms
function formatMessage(platform, order) {
    const newLine = platform === 'whatsapp' ? '\n' : '%0A';
    const bullet = platform === 'whatsapp' ? '▫️ ' : '• ';
    
    let message = `Hello! I want to order an AI Fusion video.${newLine}${newLine}`;
    message += `*My selections:*${newLine}`;
    message += `${bullet}Aspect Ratio: ${order.selectedOptions[0]}${newLine}`;
    message += `${bullet}Video Quality: ${order.selectedOptions[1]}${newLine}`;
    message += `${bullet}Frame Rate: ${order.selectedOptions[2]}${newLine}`;
    message += `${bullet}Video Style: ${order.selectedOptions[3]}${newLine}`;
    message += `${bullet}Music Style: ${order.selectedOptions[4]}${newLine}`;
    message += `${bullet}Delivery Option: ${order.selectedOptions[5]}${newLine}`;
    message += `${newLine}`;
    message += `*Additional Notes:*${newLine}${order.additionalNotes || "No additional notes"}${newLine}${newLine}`;
    message += `Total Price: €${order.totalPrice}${newLine}${newLine}`;
    message += "I'll send my face photo in the next message.";
    
    return message;
}

// WhatsApp submission
document.getElementById('whatsapp-btn').addEventListener('click', function() {
    // Show loading animation
    document.getElementById('loading').style.display = 'block';

    // Simulate processing delay
    setTimeout(function() {
        const order = getOrderDetails();
        const message = formatMessage('whatsapp', order);
        const phoneNumber = "+989024645653";

        // Open WhatsApp
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');

        // Hide loading animation
        document.getElementById('loading').style.display = 'none';
    }, 1500);
});

// Telegram submission
document.getElementById('telegram-btn').addEventListener('click', function() {
    // Show loading animation
    document.getElementById('loading').style.display = 'block';

    // Simulate processing delay
    setTimeout(function() {
        const order = getOrderDetails();
        const message = formatMessage('telegram', order);
        const telegramUsername = "kohandev";

        // Open Telegram
        window.open(`https://t.me/${telegramUsername}?start=${message}`, '_blank');

        // Hide loading animation
        document.getElementById('loading').style.display = 'none';
    }, 1500);
});

// Initialize price display
recalculateTotal();
