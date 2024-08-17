import { ele } from "../viewComponents/_htmlElementSelector";

export const JSONToFile = (obj, filename) => {
    const blob = new Blob([JSON.stringify(obj)], {
        type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = ele.getBtnGameFileSave();
    a.href = url;

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const dateStr = today.toISOString().replace(':', '_').replace('.', '_');

    a.download = `${filename}${dateStr}.json`;
    // a.click();
    // URL.revokeObjectURL(url);
};
