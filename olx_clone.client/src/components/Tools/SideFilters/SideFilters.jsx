import React from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Checkbox, Slider, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {BoxStyle} from "@/components/Tools/SideFilters/Styles.js";
import {useTheme} from "@mui/material/styles";

const SideFilters = () => {
    const theme = useTheme();
    const { colors } = theme.palette;
    
    return (
        <Box style={BoxStyle} sx={{background: colors.background.secondary, boxShadow: colors.boxShadow}}>
            <Typography variant="h6" sx={{paddingLeft: '16px', paddingTop: '16px'}}>Фільтри</Typography>

            <Accordion sx={{ width: '100%', background: 'inherit', boxShadow: 'none', border: 'none', '&::before': {
                    display: 'none',
                } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                    <Typography>Характеристики</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <Checkbox /> Характеристика 1
                        <br />
                        <Checkbox /> Характеристика 2
                    </div>
                </AccordionDetails>
            </Accordion>

            <Accordion sx={{ width: '100%', background: 'inherit', boxShadow: 'none', border: 'none', '&::before': {
                    display: 'none',
                } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Ціна</Typography>
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

            <Accordion sx={{ width: '100%', background: 'inherit', boxShadow: 'none', border: 'none', '&::before': {
                    display: 'none',
                } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Характеристики 2</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <Checkbox /> Характеристика 3
                        <br />
                        <Checkbox /> Характеристика 4
                    </div>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default SideFilters;
