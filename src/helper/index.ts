export const sendToParent = ({ action, body }: { action: any; body?: any }) => {
    window.parent.postMessage(
        {
            action,
            body,
        },
        "*"
    );
};
