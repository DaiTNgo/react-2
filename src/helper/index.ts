export const sendToParent = ({ action, body }: { action: any; body?: any }) => {
    window.parent.postMessage(
        {
            action,
            body,
        },
        "*"
    );
};

export const className = (
    ...classNames: (string | boolean | null | undefined)[]
): string => {
    return classNames.filter((className) => Boolean(className)).join(" ");
};

export const toPascalCase = (str: string): string =>
    (str.match(/[a-zA-Z0-9]+/g) || [])
        .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
        .join("");
