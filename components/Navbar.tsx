import { CaretDownIcon } from "@radix-ui/react-icons";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import ListItem from "./ListItem";
const Navbar = () => {
  return (
    <NavigationMenu.Root className="NavigationMenuRoot">
      <NavigationMenu.List className="NavigationMenuList">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Overview <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List one">
              <li style={{ gridRow: "span 3" }}>
                <NavigationMenu.Link asChild>
                  <Link
                    className="Callout"
                    href="https://blog.lewiscasewell.com"
                  >
                    <div className="CalloutHeading">Hi, I&apos;m Lewis.</div>
                    <p className="CalloutText">
                      I am a UK based software engineer primarily working with
                      Typescript, Go, React and React native.
                    </p>
                  </Link>
                </NavigationMenu.Link>
              </li>

              <ListItem href="https://blog.lewiscasewell.com/" title="About">
                Find out more about me.
              </ListItem>
              <ListItem
                href="mailto:lewiscasewell@hotmail.co.uk?subject=Hello Lewis"
                title="Contact"
              >
                Shoot me an email.
              </ListItem>
              <ListItem href="https://github.com/lewiscasewell" title="Github">
                Check out all of my current projects.
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Projects <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List two">
              <ListItem
                title="Openweight"
                href="https://apps.apple.com/gb/app/openweight/id6449994612"
              >
                Bodyweight tracker for iOS. Built with react-native and node.
                Uses WatermelonDB for online/offline data sync.
              </ListItem>
              <ListItem
                title="react-native-patterns"
                href="https://github.com/lewiscasewell/react-native-patterns"
              >
                Component library for react-native that allows you to build
                reproducible abstract patterns.
              </ListItem>
              <ListItem title="gm" href="https://gm.lewiscasewell.com">
                Crypto portfolio CLI written in Go. Can either download for
                windows or macOs
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link
            className="NavigationMenuLink"
            href="https://blog.lewiscasewell.com"
          >
            Blog
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator className="NavigationMenuIndicator">
          <div className="Arrow" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="ViewportPosition">
        <NavigationMenu.Viewport className="NavigationMenuViewport" />
      </div>
    </NavigationMenu.Root>
  );
};

export default Navbar;
