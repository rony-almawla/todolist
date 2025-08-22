import { Box, Divider, Typography } from '@mui/material';

export default function BrandHeader() {
    return (
        <Box sx={{ py: 2 }}>
            <Typography variant="subtitle1" fontWeight={700}>TO DO APP</Typography>
            <Typography variant="caption" color="text.secondary">Stop Procrastinating, Start Organizing</Typography>
            <Divider sx={{ mt: 2, opacity: 0.2 }} />
        </Box>
    );
}


