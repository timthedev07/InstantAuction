import Link from "next/link";
import React from "react";
import { capitalize } from "shared";

interface OAuthButtonProps {
  provider: "google" | "discord" | "facebook";
  href: string;
}

export const OAuthButton: React.FC<OAuthButtonProps> = ({ provider, href }) => {
  return (
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
