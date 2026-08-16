import { useEffect, useState } from "react";
import {
    Box,
    Stepper,
    Step,
    StepLabel,
    Button,
    Paper,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { ArrowBack, ArrowForward, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cartSlice";

import StepContact from "../components/checkout/StepContact";
import StepShipping from "../components/checkout/StepShipping";
import StepDelivery from "../components/checkout/StepDelivery";
import StepPayment from "../components/checkout/StepPayment";
import StepReview from "../components/checkout/StepReview";

import {
    validateContact,
    validateShipping,
    validateDelivery,
    validatePayment,
    isStepValid,
} from "../utils/checkoutValidation";
import { generateOrderId, estimateDeliveryWindow, getDeliveryOptions } from "../utils/format";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useSEO } from "../hooks/useSEO";

const STEPS = ["Contact", "Shipping", "Delivery", "Payment", "Review"];

const EMPTY_FORM = {
    contact: { email: "", phone: "" },
    shipping: {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        province: "",
        postalCode: "",
        country: "",
    },
    delivery: { method: "standard" },
    payment: { cardNumber: "", expiry: "", cvc: "", nameOnCard: "" },
};

export default function CheckoutPage() {
    useSEO({ title: "Checkout", description: "Complete your purchase securely." });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery("(max-width:640px)");

    const cartItems = useSelector((state) => state.cart.items);
    const subtotal = useSelector((state) => state.cart.totalPrice);

    const [activeStep, setActiveStep] = useState(0);
    // Backed by sessionStorage so an accidental refresh mid-checkout doesn't
    // wipe out everything the person already typed.
    const [form, setForm] = useState(() => {
        try {
            const raw = window.sessionStorage.getItem("rosa_checkout_draft");
            return raw ? { ...EMPTY_FORM, ...JSON.parse(raw) } : EMPTY_FORM;
        } catch {
            return EMPTY_FORM;
        }
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        try {
            window.sessionStorage.setItem("rosa_checkout_draft", JSON.stringify(form));
        } catch {
            // ignore
        }
    }, [form]);

    // Guard: don't allow checkout with an empty cart.
    useEffect(() => {
        if (cartItems.length === 0) {
            navigate("/cart", { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (cartItems.length === 0) return null;

    const updateStep = (key, data) => setForm((prev) => ({ ...prev, [key]: data }));

    const validators = [validateContact, validateShipping, validateDelivery, validatePayment, () => ({})];
    const formKeys = ["contact", "shipping", "delivery", "payment", null];

    const handleNext = () => {
        const key = formKeys[activeStep];
        const stepErrors = key ? validators[activeStep](form[key]) : {};
        setErrors(stepErrors);
        if (!isStepValid(stepErrors)) return;
        setActiveStep((s) => Math.min(s + 1, STEPS.length - 1));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBack = () => {
        setErrors({});
        setActiveStep((s) => Math.max(s - 1, 0));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handlePlaceOrder = () => {
        const deliveryOption = getDeliveryOptions()[form.delivery.method];
        const orderId = generateOrderId();
        const estimatedDelivery = estimateDeliveryWindow(form.delivery.method);
        const total = subtotal + (deliveryOption?.price ?? 0);

        try {
            window.sessionStorage.removeItem("rosa_checkout_draft");
        } catch {
            // ignore
        }

        dispatch(clearCart());

        navigate("/order-confirmation", {
            replace: true,
            state: {
                orderId,
                estimatedDelivery,
                total,
                itemCount: cartItems.reduce((sum, i) => sum + i.quantity, 0),
            },
        });
    };

    const renderStep = () => {
        switch (activeStep) {
            case 0:
                return <StepContact data={form.contact} errors={errors} onChange={(d) => updateStep("contact", d)} />;
            case 1:
                return <StepShipping data={form.shipping} errors={errors} onChange={(d) => updateStep("shipping", d)} />;
            case 2:
                return <StepDelivery data={form.delivery} errors={errors} onChange={(d) => updateStep("delivery", d)} />;
            case 3:
                return <StepPayment data={form.payment} errors={errors} onChange={(d) => updateStep("payment", d)} />;
            case 4:
                return (
                    <StepReview
                        contact={form.contact}
                        shipping={form.shipping}
                        delivery={form.delivery}
                        payment={form.payment}
                        cartItems={cartItems}
                        subtotal={subtotal}
                    />
                );
            default:
                return null;
        }
    };

    const isLastStep = activeStep === STEPS.length - 1;

    return (
        <Box sx={{ maxWidth: 900, mx: "auto", px: 3, py: 4 }}>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
                Checkout
            </Typography>

            <Stepper
                activeStep={activeStep}
                alternativeLabel={!isMobile}
                orientation="horizontal"
                sx={{
                    mb: 4,
                    ...(isMobile && {
                        overflowX: "auto",
                        "& .MuiStepLabel-label": { fontSize: "0.7rem" },
                    }),
                }}
            >
                {STEPS.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Paper variant="outlined" sx={{ p: { xs: 2, sm: 4 }, mb: 3 }}>
                {renderStep()}
            </Paper>

            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={activeStep === 0 ? () => navigate("/cart") : handleBack}
                >
                    {activeStep === 0 ? "Back to Cart" : "Back"}
                </Button>

                {isLastStep ? (
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        startIcon={<Lock />}
                        onClick={handlePlaceOrder}
                    >
                        Place Order
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="success"
                        endIcon={<ArrowForward />}
                        onClick={handleNext}
                    >
                        Continue
                    </Button>
                )}
            </Box>
        </Box>
    );
}
