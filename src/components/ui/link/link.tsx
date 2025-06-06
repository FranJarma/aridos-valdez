type LinkProps = {
  children: React.ReactNode;
  href: string;
  isActive?: boolean;
  isButton?: boolean;
  isDisabled?: boolean;
  isIcon?: boolean;
  openInNewTab?: boolean;
  text?: string;
};

export function Link({ children, href, openInNewTab }: LinkProps) {
  const target = openInNewTab ? "_blank" : "_self";
  return (
    <a href={href} target={target}>
      {children}
    </a>
  );
}
