import { Grid, TextField, Typography, Box } from "@mui/material";

export default function StepShipping({ data, errors, onChange }) {
    const handleChange = (field) => (e) => onChange({ ...data, [field]: e.target.value });

    return (
        <Box>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
                Shipping Address
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Where should we deliver your order?
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="First name"
                        fullWidth
                        value={data.firstName || ""}
                        onChange={handleChange("firstName")}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        autoComplete="given-name"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Last name"
                        fullWidth
                        value={data.lastName || ""}
                        onChange={handleChange("lastName")}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        autoComplete="family-name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Address"
                        fullWidth
                        value={data.address || ""}
                        onChange={handleChange("address")}
                        error={!!errors.address}
                        helperText={errors.address}
                        autoComplete="street-address"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="City"
                        fullWidth
                        value={data.city || ""}
                        onChange={handleChange("city")}
                        error={!!errors.city}
                        helperText={errors.city}
                        autoComplete="address-level2"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Province"
                        fullWidth
                        value={data.province || ""}
                        onChange={handleChange("province")}
                        error={!!errors.province}
                        helperText={errors.province}
                        autoComplete="address-level1"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Postal code"
                        fullWidth
                        value={data.postalCode || ""}
                        onChange={handleChange("postalCode")}
                        error={!!errors.postalCode}
                        helperText={errors.postalCode}
                        autoComplete="postal-code"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Country"
                        fullWidth
                        value={data.country || ""}
                        onChange={handleChange("country")}
                        error={!!errors.country}
                        helperText={errors.country}
                        autoComplete="country-name"
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
