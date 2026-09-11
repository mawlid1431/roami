export interface NavItem {
  label: string;
  href: string;
}

// Hrefs are "/#section" (not "#section") so they resolve from every page,
// not only the homepage that owns those sections.
export const contactCta: NavItem = { label: "Get in touch", href: "/#get-in-touch" };
export const planCta: NavItem = { label: "Plan my trip", href: "/plan" };

export const primaryNav: NavItem[] = [
  { label: "Intro", href: "/#cinema" },
  { label: "Bridge", href: "/#bridge" },
  { label: "Bazaar", href: "/#bazaar" },
  { label: "Routes", href: "/#routes" },
  { label: "Places", href: "/#places" },
  contactCta,
];

export const footerNav: NavItem[] = [
  { label: "Intro", href: "/#cinema" },
  { label: "Bridge", href: "/#bridge" },
  { label: "Bazaar", href: "/#bazaar" },
  { label: "Places", href: "/#places" },
  { label: "Stories", href: "/#testimonials" },
  contactCta,
];
