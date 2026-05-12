"use client";

import { pushEvent } from "@/lib/analytics";

// Wraps a tel: anchor so we can fire phone_click before the dialer opens.
// Used on /contact wherever the phone number is rendered as a tappable link.
export function PhoneLink({
  phoneNumber,
  children,
  className,
}: {
  phoneNumber: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={`tel:${phoneNumber}`}
      className={className}
      onClick={() => pushEvent("phone_click", { phoneNumber })}
    >
      {children}
    </a>
  );
}
