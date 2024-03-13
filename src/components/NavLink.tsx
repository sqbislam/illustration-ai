import Link, { LinkProps } from 'next/link';

const NavLink = ({
  children,
  href,
  ...props
}: LinkProps & {
  children?: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>) => (
  <Link
    href={href}
    {...props}
    className={`py-2.5 px-4 text-center rounded-lg duration-150 ${
      props?.className || ''
    }`}
  >
    {children}
  </Link>
);

export default NavLink;
