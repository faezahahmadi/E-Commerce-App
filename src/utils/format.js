// Shared formatting + mock-data helpers used across the app.

export function formatCurrency(amount) {
    const value = Number(amount) || 0;
    return `$${value.toFixed(2)}`;
}

/** Generates a realistic-looking mock order id, e.g. ORD-2026-84721 */
export function generateOrderId() {
    const year = new Date().getFullYear();
    const random = Math.floor(10000 + Math.random() * 90000);
    return `ORD-${year}-${random}`;
}

const DELIVERY_OPTIONS = {
    standard: { label: "Standard", price: 0, minDays: 5, maxDays: 7 },
    express: { label: "Express", price: 12, minDays: 2, maxDays: 3 },
    nextday: { label: "Next Day", price: 25, minDays: 1, maxDays: 1 },
};

export function getDeliveryOptions() {
    return DELIVERY_OPTIONS;
}

function formatShortDate(date) {
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
}

/** Returns a human-readable estimated delivery window, e.g. "August 20 - 23" */
export function estimateDeliveryWindow(deliveryMethod = "standard", fromDate = new Date()) {
    const option = DELIVERY_OPTIONS[deliveryMethod] || DELIVERY_OPTIONS.standard;
    const start = new Date(fromDate);
    start.setDate(start.getDate() + option.minDays);
    const end = new Date(fromDate);
    end.setDate(end.getDate() + option.maxDays);

    if (option.minDays === option.maxDays) {
        return formatShortDate(start);
    }

    const sameMonth = start.getMonth() === end.getMonth();
    return sameMonth
        ? `${formatShortDate(start)} - ${end.getDate()}`
        : `${formatShortDate(start)} - ${formatShortDate(end)}`;
}

/** Masks a card number down to the last 4 digits, e.g. •••• •••• •••• 4242 */
export function maskCardNumber(cardNumber = "") {
    const digits = cardNumber.replace(/\s+/g, "");
    const last4 = digits.slice(-4);
    return `•••• •••• •••• ${last4}`;
}

/** Formats raw digits into "1234 5678 9012 3456" as the user types */
export function formatCardNumber(value = "") {
    return value
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(.{4})/g, "$1 ")
        .trim();
}

/** Formats raw digits into "MM/YY" as the user types */
export function formatExpiry(value = "") {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function detectCardBrand(cardNumber = "") {
    const digits = cardNumber.replace(/\s+/g, "");
    if (/^4/.test(digits)) return "Visa";
    if (/^5[1-5]/.test(digits)) return "Mastercard";
    if (/^3[47]/.test(digits)) return "Amex";
    if (/^6(?:011|5)/.test(digits)) return "Discover";
    return null;
}
