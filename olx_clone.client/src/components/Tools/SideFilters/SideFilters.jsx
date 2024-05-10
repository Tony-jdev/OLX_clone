import React from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Checkbox, Slider, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {BoxStyle} from "@/components/Tools/SideFilters/Styles.js";

const SideFilters = () => {
    return (
        <Box style={BoxStyle}>
            <Typography variant="h6" gutterBottom>Фільтри</Typography>

            {/* Перший акордеон */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Характеристики</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <Checkbox /> Характеристика 1
                        <br />
                        <Checkbox /> Характеристика 2
                        {/* Додайте інші чекбокси за необхідності */}
                    </div>
                </AccordionDetails>
            </Accordion>

            {/* Другий акордеон */}
            <Accordion>
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

            {/* Третій акордеон */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Характеристики 2</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <Checkbox /> Характеристика 3
                        <br />
                        <Checkbox /> Характеристика 4
                        {/* Додайте інші чекбокси за необхідності */}
                    </div>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default SideFilters;
