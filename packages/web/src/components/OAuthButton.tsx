import Link from "next/link";
import React from "react";
import { capitalize } from "client-controllers";

interface OAuthButtonProps {
  provider: "google" | "discord";
  href: string | null | undefined;
}

export const OAuthButton: React.FC<OAuthButtonProps> = ({ provider, href }) => {
  return !href ? (
    <button>No href provided</button>
  ) : (
    <Link href={href} passHref>
      <a>
        <button className={`oauth-button oauth-button-${provider}`}>
          {capitalize(provider)}
          <img
            className="oauth-button__icon"
            src={`/images/icons/oauth/${provider}.svg`}
            alt=""
          />
        </button>
      </a>
    </Link>
  );
};
