export const sendToParent = ({ action, body }: { action: any; body?: any }) => {
    window.parent.postMessage(
        {
            action,
            body,
        },
        '*'
    );
};

export const className = (
    ...classNames: (string | boolean | null | undefined)[]
): string => {
    return classNames.filter((className) => Boolean(className)).join(' ');
};

export const toPascalCase = (str: string): string =>
    (str.match(/[a-zA-Z0-9]+/g) || [])
        .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
        .join('');

export const formatTimeToMMSS = (value: number) => {
    const time = Number(value);
    console.log(time);
    if (isNaN(time)) return `00:00`;
    let minute: string | number = Math.floor(time / 60);
    let second: number | string = Math.floor(time % 60);
    second = second < 10 ? `0${second}` : second;
    minute = minute < 10 ? `0${minute}` : minute;
    return `${minute}:${second}`;
};
