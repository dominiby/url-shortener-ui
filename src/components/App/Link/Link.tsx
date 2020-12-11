import React, { FC } from 'react';

interface LinkProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  href: string;
}

const Link: FC<LinkProps> = ({ className, href }) => {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {href}
    </a>
  );
};

export default Link;
