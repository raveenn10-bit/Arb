import Image from "next/image";
import { Reveal } from "./reveal";
import { clients, type Client } from "@/lib/site";

export function ClientWall({ limit, className = "" }: { limit?: number; className?: string }) {
  const list: Client[] = limit ? clients.slice(0, limit) : clients;
  return (
    <Reveal as="ul" stagger={0.04} y={18} className={`border-line grid grid-cols-2 border-t border-l sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ${className}`}>
      {list.map((c) => (
        <li
          key={c.slug}
          data-reveal
          className={`group border-line relative flex aspect-[16/9] items-center justify-center border-r border-b p-5 sm:p-7 ${c.dark ? "bg-ink" : "bg-white"}`}
        >
          <Image
            src={`/images/clients/${c.slug}.webp`}
            alt={c.name}
            width={320}
            height={180}
            sizes="(min-width: 1280px) 15vw, (min-width: 640px) 28vw, 45vw"
            className="h-full max-h-20 w-auto max-w-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.04]"
          />
        </li>
      ))}
    </Reveal>
  );
}
