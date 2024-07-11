import React from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Checkbox, Slider, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BoxStyle } from "@/components/Tools/SideFilters/Styles.js";
import { useTheme } from "@mui/material/styles";
import { FormattedMessage } from 'react-intl';

const SideFilters = () => {
    const theme = useTheme();
    const { colors } = theme.palette;

    return (
        <Box style={BoxStyle} sx={{ background: colors.background.secondary, boxShadow: colors.boxShadow }}>
            <Typography variant="h6" sx={{ paddingLeft: '16px', paddingTop: '16px' }}>
                <FormattedMessage id="sideFilters.filters" />
            </Typography>

            <Accordion sx={{ width: '100%', background: 'inherit', boxShadow: 'none', border: 'none', '&::before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                        <FormattedMessage id="sideFilters.type" />
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <Checkbox /> <FormattedMessage id="sideFilters.new" />
                        <br />
                        <Checkbox /> <FormattedMessage id="sideFilters.used" />
                    </div>
                </AccordionDetails>
            </Accordion>

            <Accordion sx={{ width: '100%', background: 'inherit', boxShadow: 'none', border: 'none', '&::before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                        <FormattedMessage id="sideFilters.price" />
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Slider
                        min={0}
                        max={100}
                        value={[20, 80]}
                        onChange={(event, newValue) => console.log(newValue)}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                    />
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default SideFilters;
