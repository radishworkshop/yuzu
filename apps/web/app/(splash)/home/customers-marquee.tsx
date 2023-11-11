import { cn } from "@/lib/utils"
import Marquee from "@/components/magicui/marquee"
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from "next/image"

const logos = [{
  name: "Seelfa", href: "https://www.seelfa.com", img: "seelfa.png", width: 64,
}, {
  name: "Summit", href: "https://www.summit.im", img: "summit.png", width: 112,
}, {
  name: "Supervideos", href: "https://www.supervideos.app", img: "supervideos.png", width: 128,
}, {
  name: "A Lot of Moving Parts", href: "https://www.alotofmoving.parts", img: "alotofmovingparts.png", width: 80,
}, {
  name: "Soft Networks", href: "https://www.softnet.works", img: "softnetworks.png", width: 128,
}, {
  name: "Payday Football", href: "https://www.paydayfootball.com", img: "paydayfootball.png", width: 160,
}]

const Logo = ({ name, href, img, width, dark }: { name: string, href: string, img: string, width: number, dark?: boolean }) => {
  return (
    <Link href={href} className={cn(`animate-fade-in cursor-pointer flex items-center relative`)} target="_blank" style={{
      height: 64,
      width: width,
    }}>
      <Image src={`/images/3p${dark ? '/dark' : '/light'}/${img}`} alt={name} fill style={{
        objectFit: 'contain'
      }} />
    </Link>
  );
};

export default function CustomersMarquee() {
return (
  <div className="w-full border-t">
    <div className="flex relative items-center justify-center">
      <Badge variant="outline" className="-top-3 mx-auto absolute bg-background">Used by developers at</Badge>
    </div>
    <div className="mx-auto max-w-7xl relative flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden pb-8 pt-10">
      <Marquee className="[--gap:6rem] dark:hidden" pauseOnHover>
        {logos.map((logo, idx) => (
          <Logo key={idx} {...logo} />
        ))}
      </Marquee>
      <Marquee className="[--gap:6rem] hidden dark:flex" pauseOnHover>
        {logos.map((logo, idx) => (
          <Logo key={idx} {...logo} dark />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background to-transparent"></div>
    </div>
  </div>
  );
};