export const getDiscordAvatarUrlFromHash = (
  hash: string,
  discordUserId: string
) => {
  return `https://cdn.discordapp.com/avatars/${discordUserId}/${hash}.jpg`;
};
