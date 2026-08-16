const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s()-]{7,20}$/;

export function validateContact(data) {
    const errors = {};
    if (!data.email?.trim()) errors.email = "Email is required";
    else if (!EMAIL_RE.test(data.email.trim())) errors.email = "Enter a valid email address";

    if (!data.phone?.trim()) errors.phone = "Phone number is required";
    else if (!PHONE_RE.test(data.phone.trim())) errors.phone = "Enter a valid phone number";

    return errors;
}

export function validateShipping(data) {
    const errors = {};
    const required = {
        firstName: "First name is required",
        lastName: "Last name is required",
        address: "Address is required",
        city: "City is required",
        province: "Province is required",
        postalCode: "Postal code is required",
        country: "Country is required",
    };
    Object.entries(required).forEach(([field, message]) => {
        if (!data[field]?.trim()) errors[field] = message;
    });
    return errors;
}

export function validateDelivery(data) {
    const errors = {};
    if (!data.method) errors.method = "Select a delivery option";
    return errors;
}

export function validatePayment(data) {
    const errors = {};
    const digits = (data.cardNumber || "").replace(/\s+/g, "");

    if (!digits) errors.cardNumber = "Card number is required";
    else if (digits.length < 13 || digits.length > 16) errors.cardNumber = "Enter a valid card number";

    if (!data.expiry?.trim()) errors.expiry = "Expiry date is required";
    else if (!/^\d{2}\/\d{2}$/.test(data.expiry.trim())) errors.expiry = "Use MM/YY format";
    else {
        const [mm, yy] = data.expiry.split("/").map(Number);
        const now = new Date();
        const currentYear = now.getFullYear() % 100;
        const currentMonth = now.getMonth() + 1;
        if (mm < 1 || mm > 12) errors.expiry = "Invalid month";
        else if (yy < currentYear || (yy === currentYear && mm < currentMonth)) {
            errors.expiry = "Card has expired";
        }
    }

    if (!data.cvc?.trim()) errors.cvc = "CVC is required";
    else if (!/^\d{3,4}$/.test(data.cvc.trim())) errors.cvc = "Enter a valid CVC";

    if (!data.nameOnCard?.trim()) errors.nameOnCard = "Name on card is required";

    return errors;
}

export function isStepValid(errors) {
    return Object.keys(errors).length === 0;
}
