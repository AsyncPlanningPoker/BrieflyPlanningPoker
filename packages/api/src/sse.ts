const { createChannel } = await import('better-sse');;
const usersChannel = createChannel();
export { usersChannel };