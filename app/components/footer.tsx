import { footerContent } from "~/constants";
import { Icon } from "@iconify/react";
import { Link } from "@heroui/react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent py-8 dark:border-gray-700">
      <div className="mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-6">
          <div className="flex space-x-6">
            <Link
              href={footerContent.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 hover:scale-110 transition-all duration-300 ease-in-out dark:text-gray-400 dark:hover:text-blue-400"
              aria-label="GitHub"
            >
              <Icon icon="lucide:github" className="h-16 w-16" />
            </Link>

            <Link
              href={footerContent.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 hover:scale-110 transition-all duration-300 ease-in-out dark:text-gray-400 dark:hover:text-blue-400"
              aria-label="LinkedIn"
            >
              <Icon icon="lucide:linkedin" className="h-16 w-16" />
            </Link>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} {footerContent.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
