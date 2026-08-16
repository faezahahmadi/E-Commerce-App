import { Grid, TextField, Typography, Box, Alert, Paper, Stack } from "@mui/material";
import { CreditCard, Lock } from "@mui/icons-material";
import { formatCardNumber, formatExpiry, detectCardBrand } from "../../utils/format";

export default function StepPayment({ data, errors, onChange }) {
    const cardBrand = detectCardBrand(data.cardNumber || "");

    const handleCardNumber = (e) => {
        onChange({ ...data, cardNumber: formatCardNumber(e.target.value) });
    };
    const handleExpiry = (e) => {
        onChange({ ...data, expiry: formatExpiry(e.target.value) });
    };
    const handleCvc = (e) => {
        onChange({ ...data, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) });
    };
    const handleName = (e) => onChange({ ...data, nameOnCard: e.target.value });

    return (
        <Box>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
                Payment
            </Typography>
            <Alert severity="info" icon={<Lock fontSize="small" />} sx={{ mb: 3 }}>
                This is a demo checkout — no real payment is processed and no card data is
                transmitted or stored.
            </Alert>

            {/* Mock card preview */}
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 3,
                    color: "#fff",
                    background: "linear-gradient(135deg, #0f3d2e 0%, #1e8449 100%)",
                }}
            >
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <CreditCard sx={{ fontSize: 32, opacity: 0.85 }} />
                    <Typography variant="overline" sx={{ opacity: 0.85 }}>
                        {cardBrand || "Card"}
                    </Typography>
                </Stack>
                <Typography variant="h5" letterSpacing={2} sx={{ mt: 3, mb: 2, fontFamily: "monospace" }}>
                    {data.cardNumber || "•••• •••• •••• ••••"}
                </Typography>
                <Stack direction="row" justifyContent="space-between">
                    <Box>
                        <Typography variant="caption" sx={{ opacity: 0.7, display: "block" }}>
                            CARD HOLDER
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                            {data.nameOnCard || "YOUR NAME"}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="caption" sx={{ opacity: 0.7, display: "block" }}>
                            EXPIRES
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                            {data.expiry || "MM/YY"}
                        </Typography>
                    </Box>
                </Stack>
            </Paper>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Card number"
                        fullWidth
                        value={data.cardNumber || ""}
                        onChange={handleCardNumber}
                        error={!!errors.cardNumber}
                        helperText={errors.cardNumber}
                        placeholder="1234 5678 9012 3456"
                        inputProps={{ inputMode: "numeric" }}
                        autoComplete="cc-number"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="MM/YY"
                        fullWidth
                        value={data.expiry || ""}
                        onChange={handleExpiry}
                        error={!!errors.expiry}
                        helperText={errors.expiry}
                        placeholder="MM/YY"
                        inputProps={{ inputMode: "numeric" }}
                        autoComplete="cc-exp"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="CVC"
                        fullWidth
                        value={data.cvc || ""}
                        onChange={handleCvc}
                        error={!!errors.cvc}
                        helperText={errors.cvc}
                        placeholder="123"
                        inputProps={{ inputMode: "numeric" }}
                        autoComplete="cc-csc"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Name on card"
                        fullWidth
                        value={data.nameOnCard || ""}
                        onChange={handleName}
                        error={!!errors.nameOnCard}
                        helperText={errors.nameOnCard}
                        autoComplete="cc-name"
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
