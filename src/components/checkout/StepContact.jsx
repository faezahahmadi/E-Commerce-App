import { Grid, TextField, Typography, Box } from "@mui/material";

export default function StepContact({ data, errors, onChange }) {
    const handleChange = (field) => (e) => onChange({ ...data, [field]: e.target.value });

    return (
        <Box>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
                Contact Information
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                We'll use this to send your order confirmation and updates.
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        value={data.email || ""}
                        onChange={handleChange("email")}
                        error={!!errors.email}
                        helperText={errors.email}
                        autoComplete="email"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Phone"
                        type="tel"
                        fullWidth
                        value={data.phone || ""}
                        onChange={handleChange("phone")}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        autoComplete="tel"
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
