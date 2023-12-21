import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
  title: string;
  href: string;
}

const ListItem = React.forwardRef<HTMLAnchorElement, Props>(
  ({ className, children, title, href }, forwardedRef) => (
    <li>
      <NavigationMenuLink asChild>
        <Link
          className={classNames("ListItemLink", className)}
          href={href}
          ref={forwardedRef}
        >
          <>
            <div className="ListItemHeading">{title}</div>
            <p className="ListItemText">{children}</p>
          </>
        </Link>
      </NavigationMenuLink>
    </li>
  )
);

ListItem.displayName = "ListItem";

export default ListItem;
