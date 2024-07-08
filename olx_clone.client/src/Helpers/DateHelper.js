import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

const monthNames = [
    "січня", "лютого", "березня", "квітня", "травня", "червня",
    "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"
];

export const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year} р.`;
};
export const formatLocationAndDate = (location, createdAt) => {
    const [settlement, region] = location.split('|');
    const place = (!settlement || settlement.toLowerCase() === 'empty') ? region : settlement;
    const date = new Date(createdAt);
    const formattedDate = format(date, "d MMMM yyyy 'р.'", { locale: uk });
    return `${place}, ${formattedDate}`;
};