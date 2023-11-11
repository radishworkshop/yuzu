import {
  LucideProps,
  Copy,
  Check,
  X,
  Moon,
  BrainCircuit,
  SunMedium,
  Key,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  ExternalLink,
  Languages,
  Folder,
  Trash2,
  RefreshCw,
  Globe,
  Code2,
  Database,
  Menu,
  ScrollText,
  Archive,
  Loader2,
  PersonStanding,
  Puzzle,
  Edit,
  Megaphone,
  PencilRuler,
  ClipboardType,
  SquareStack,
  Users,
  Table2,
  Citrus,
  User,
  Power,
  PackageOpen,
} from "lucide-react"

export const Icons = {
  openSource: PackageOpen,
  power: Power,
  user: User,
  citrus: Citrus,
  users: Users,
  table: Table2,
  personStanding: PersonStanding,
  squareStack: SquareStack,
  clipboardType: ClipboardType,
  pencilRuler: PencilRuler,
  brainCircuit: BrainCircuit,
  megaphone: Megaphone,
  edit: Edit,
  spinner: Loader2,
  menu: Menu,
  puzzle: Puzzle,
  sun: SunMedium,
  moon: Moon,
  copy: Copy,
  key: Key,
  code: Code2,
  archive: Archive,
  sync: RefreshCw,
  trash: Trash2,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  folder: Folder,
  check: Check,
  globe: Globe,
  database: Database,
  doc: ScrollText,
  x: X,
  languages: Languages,
  addColumn: (props: LucideProps) => (
    <svg fill="none" height="20" width="20" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M5 5a1 1 0 0 1 1-1h3v12H6a1 1 0 0 1-1-1V5Z" fill="currentColor" fillOpacity="0.2"></path>
      <path clipRule="evenodd" d="M3 5a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3 1 1 0 1 1-2 0 1 1 0 0 0-1-1h-3v12h3a1 1 0 0 0 1-1 1 1 0 1 1 2 0 3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V5Zm3-1h3v12H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm10 3a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1V8a1 1 0 0 1 1-1Z" fill="currentColor" fillRule="evenodd"></path>
    </svg>
  ),
  addRow: (props: LucideProps) => (
    <svg fill="none" height="20" width="20" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M4 6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3H4V6Z" fill="currentColor" fillOpacity="0.2"></path>
      <path clipRule="evenodd" d="M15 3a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3 1 1 0 1 1 0-2 1 1 0 0 0 1-1v-3H4v3a1 1 0 0 0 1 1 1 1 0 1 1 0 2 3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h10Zm1 3v3H4V6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1Zm-6 7a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1H8a1 1 0 1 1 0-2h1v-1a1 1 0 0 1 1-1Z" fill="currentColor" fillRule="evenodd"></path>
    </svg>
  ),
  greenCheck: (props: LucideProps) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="12" fill="#1AAA55" />
      <path d="M7 12.9524L9.6 15.6667L16.3333 8" stroke="white" strokeWidth="2" strokeLinecap="square" />
    </svg>
  ),
  discord: (props: LucideProps) => (
    <svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M209.914 52.3C194.638 45.1524 178.303 39.9578 161.226 37C159.129 40.7918 156.678 45.8919 154.989 49.9491C136.835 47.219 118.849 47.219 101.029 49.9491C99.3397 45.8919 96.8338 40.7918 94.7177 37C77.6219 39.9578 61.2686 45.1715 45.9919 52.3378C15.1787 98.9007 6.82569 144.307 11.0022 189.069C31.4391 204.33 51.245 213.601 70.7167 219.668C75.5243 213.052 79.8121 206.018 83.5059 198.605C76.4709 195.932 69.7329 192.633 63.3662 188.803C65.0553 187.552 66.7074 186.244 68.3036 184.898C107.136 203.06 149.328 203.06 187.696 184.898C189.311 186.244 190.962 187.552 192.633 188.803C186.248 192.652 179.491 195.951 172.456 198.624C176.15 206.018 180.419 213.071 185.245 219.687C204.736 213.62 224.56 204.349 244.997 189.069C249.897 137.178 236.626 92.1892 209.914 52.3ZM88.7962 161.541C77.1393 161.541 67.5796 150.658 67.5796 137.406C67.5796 124.154 76.9351 113.252 88.7962 113.252C100.658 113.252 110.217 124.135 110.013 137.406C110.031 150.658 100.658 161.541 88.7962 161.541ZM167.203 161.541C155.546 161.541 145.986 150.658 145.986 137.406C145.986 124.154 155.342 113.252 167.203 113.252C179.064 113.252 188.624 124.135 188.42 137.406C188.42 150.658 179.064 161.541 167.203 161.541Z" />
    </svg>
  ),
  twitter: (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
    </svg>
  ),
  externalLink: ExternalLink,
  logo: (props: LucideProps) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="24" height="24" rx="12" fill="white" />
      <path d="M10.0193 18.2474H13.9724L13.9642 14.2198L18 7H6L10.0193 14.2364V18.2474Z" fill="black" />
    </svg>
  ),
  slash: (props: LucideProps) => (
    <svg fill="none" height="32" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" width="32" {...props}>
      <path d="M16.88 3.549L7.12 20.451"></path>
    </svg>
  ),
  yuzu: (props: LucideProps) => (
    <svg width="200" height="57" viewBox="0 0 200 57" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M39.0758 55.4903H19.7V35.7015L0 0H58.8164L39.0353 35.6199L39.0758 55.4903Z" fill="currentColor" />
      <path d="M79.8541 57C73.0172 57 67.4233 55.4087 63.0726 52.2262C58.7488 49.0165 56.5869 43.6714 56.5869 36.1911V12.6485H74.9493V34.6407C74.9493 38.9112 76.5842 41.0465 79.8541 41.0465C83.1239 41.0465 84.7588 38.9112 84.7588 34.6407V12.6485H103.121V36.1911C103.121 43.6442 100.932 48.9757 96.5545 52.1854C92.1767 55.3951 86.6099 57 79.8541 57Z" fill="currentColor" />
      <path d="M149.047 55.4903H107.621V44.6371L122.416 27.7452V27.5412H108.553V12.6485H148.115V23.5834L134.09 40.5977H149.047V55.4903Z" fill="currentColor" />
      <path d="M176.733 57C169.896 57 164.302 55.4087 159.951 52.2262C155.628 49.0165 153.466 43.6714 153.466 36.1911V12.6485H171.828V34.6407C171.828 38.9112 173.463 41.0465 176.733 41.0465C180.003 41.0465 181.638 38.9112 181.638 34.6407V12.6485H200V36.1911C200 43.6442 197.811 48.9757 193.433 52.1854C189.056 55.3951 183.489 57 176.733 57Z" fill="currentColor" />
    </svg>
  ),
  github: (props: LucideProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  ),
}
