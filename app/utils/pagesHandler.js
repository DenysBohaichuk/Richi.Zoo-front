export function removeProjectNameSeparator(title) {
    const separatorIndex = title.indexOf('|');
    if (separatorIndex !== -1) {
        return title.slice(0, separatorIndex).trim(); // Видаляємо все після "|", включно з ним
    }
    return title;
}