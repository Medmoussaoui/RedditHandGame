import { Devvit } from "@devvit/public-api";

export async function broadcastChannelMessage(
  context: Devvit.Context,
  channel: string,
  message: any
) {
  const { realtime } = context;
  realtime.send(channel, message);
}
