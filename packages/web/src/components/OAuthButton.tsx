import Link from "next/link";
import React from "react";
import { capitalize } from "client-controllers";
import { DiscordIcon } from "../icons/oauth/DiscordIcon";
import { GoogleIcon } from "../icons/oauth/GoogleIcon";
import { MicrosoftIcon } from "../icons/oauth/MicrosoftIcon";

type ProviderType = "google" | "discord" | "microsoft";

interface OAuthButtonProps {
  provider: ProviderType;
  href: string | null | undefined;
  style?: React.CSSProperties;
}

const ICON_MAP = {
  discord: DiscordIcon,
  google: GoogleIcon,
  microsoft: MicrosoftIcon
};

export const OAuthButton: React.FC<OAuthButtonProps> = ({
  provider,
  href,
  style
}) => {
  const Icon = ICON_MAP[provider];
  return !href ? (
    <button>No href provided</button>
  ) : (
    <Link href={href} passHref>
      <button className={`oauth-button oauth-button-${provider}`} style={style}>
        {capitalize(provider)}
        <Icon className="oauth-button__icon" />
      </button>
    </Link>
  );
};
