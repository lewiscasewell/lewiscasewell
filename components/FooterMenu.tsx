import {
  DiscordLogoIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

const FooterMenu = () => {
  return (
    <footer className="FooterMenuRoot">
      <Link href="https://github.com/lewiscasewell" className="FooterMenuItem">
        <GitHubLogoIcon className="Icon" />
      </Link>
      <Link href="https://twitter.com/developer2395" className="FooterMenuItem">
        <TwitterLogoIcon className="Icon" />
      </Link>
      <Link
        href="https://www.linkedin.com/in/lewis-casewell-bb1769182/"
        className="FooterMenuItem"
      >
        <LinkedInLogoIcon className="Icon" />
      </Link>
      <Link
        href="https://discord.com/users/case#9923"
        className="FooterMenuItem"
      >
        <DiscordLogoIcon className="Icon" />
      </Link>
    </footer>
  );
};

export default FooterMenu;
