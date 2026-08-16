import {
    Box,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    Paper,
    Stack,
    FormHelperText,
} from "@mui/material";
import { LocalShipping, FlashOn, Bolt } from "@mui/icons-material";
import { getDeliveryOptions } from "../../utils/format";

const ICONS = {
    standard: LocalShipping,
    express: FlashOn,
    nextday: Bolt,
};

export default function StepDelivery({ data, errors, onChange }) {
    const options = getDeliveryOptions();

    return (
        <Box>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
                Delivery Method
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Choose how fast you'd like your order to arrive.
            </Typography>

            <RadioGroup
                value={data.method || ""}
                onChange={(e) => onChange({ ...data, method: e.target.value })}
            >
                <Stack spacing={1.5}>
                    {Object.entries(options).map(([key, opt]) => {
                        const Icon = ICONS[key];
                        const selected = data.method === key;
                        return (
                            <Paper
                                key={key}
                                variant="outlined"
                                onClick={() => onChange({ ...data, method: key })}
                                sx={{
                                    p: 2,
                                    cursor: "pointer",
                                    borderColor: selected ? "success.main" : "divider",
                                    borderWidth: selected ? 2 : 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Stack direction="row" alignItems="center" spacing={1.5}>
                                    <FormControlLabel
                                        value={key}
                                        control={<Radio color="success" />}
                                        label=""
                                        sx={{ mr: 0 }}
                                    />
                                    <Icon color={selected ? "success" : "action"} />
                                    <Box>
                                        <Typography fontWeight={600}>{opt.label}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {opt.minDays === opt.maxDays
                                                ? `${opt.minDays} business day`
                                                : `${opt.minDays}-${opt.maxDays} business days`}
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Typography fontWeight={700} color={opt.price === 0 ? "success.main" : "text.primary"}>
                                    {opt.price === 0 ? "Free" : `$${opt.price}`}
                                </Typography>
                            </Paper>
                        );
                    })}
                </Stack>
            </RadioGroup>
            {errors.method && <FormHelperText error>{errors.method}</FormHelperText>}
        </Box>
    );
}
