export function truncateText(text, maxChars) {
    if (text.length <= maxChars) {
        return text;
    }
    return text.slice(0, maxChars) + '...';
}