export interface DiscordUser {
  accent_color: string | null | undefined;
  avatar: string | null | undefined;
  banner: string | null | undefined;
  banner_color: string | null | undefined;
  discriminator: string;
  email: string | null | undefined;
  flags: number;
  id: string;
  locale: string;
  mfa_enabled: boolean;
  public_flags: number;
  username: string;
  verified: boolean;
}
