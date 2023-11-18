const { createChannel } = await import('better-sse');
const sse = createChannel();
sse.on('session-registered', (session) => {
    const data = new Date();
    sse.broadcast(data, 'register');
});
export { sse };