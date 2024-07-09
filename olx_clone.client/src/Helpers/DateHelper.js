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
export function formatTimeFromISO(isoString) {
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

export const formatDateFromISOV2 = (isoString) => {
    const date = new Date(isoString);
    const monthNames = [
        "січня", "лютого", "березня", "квітня", "травня", "червня",
        "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"
    ];
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];

    return `з ${month} ${year} р.`;
};