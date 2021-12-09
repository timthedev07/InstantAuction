import Link from "next/link";
import React from "react";
import { capitalize } from "client-controllers";

interface OAuthButtonProps {
  provider: "google" | "discord" | "microsoft";
  href: string | null | undefined;
  style?: React.CSSProperties;
}

export const OAuthButton: React.FC<OAuthButtonProps> = ({
  provider,
  href,
  style
}) => {
  return !href ? (
    <button>No href provided</button>
  ) : (
    <Link href={href} passHref>
      <button className={`oauth-button oauth-button-${provider}`} style={style}>
        {capitalize(provider)}
        <img
          className="oauth-button__icon"
          src={`/images/icons/oauth/${provider}.svg`}
          alt=""
        />
      </button>
    </Link>
  );
};
