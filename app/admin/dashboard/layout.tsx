import Link from "next/link";
import { db } from "@/lib/db";
import { logoutAction } from "@/lib/actions/auth";

const NAV_ITEMS = [
  { href: "/admin/dashboard/albums", label: "Albums" },
  { href: "/admin/dashboard/tournaments", label: "Tournaments" },
  { href: "/admin/dashboard/inquiries", label: "Inquiries" },
  { href: "/admin/dashboard/subscribers", label: "Subscribers" },
  { href: "/admin/dashboard/users", label: "Users" },
];

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const [albumCount, tournamentCount, openInquiries, subscriberCount] = await Promise.all([
    db.album.count(),
    db.tournamentConfig.count(),
    db.contactMessage.count({ where: { resolved: false } }),
    db.newsletterSubscriber.count(),
  ]);

  const counts: Record<string, number> = {
    Albums: albumCount,
    Tournaments: tournamentCount,
    Inquiries: openInquiries,
    Subscribers: subscriberCount,
  };

  return (
    <div className="min-h-screen  flex flex-col lg:flex-row">
      <aside className="w-full lg:w-56 shrink-0 border-b lg:border-b-0 lg:border-r border-[#2e3a28]/10 bg-[color-mix(in_srgb,var(--surface)_95%,black)]  p-4 lg:p-6 space-y-6">
        <div>
          <span className="font-garamond text-lg font-bold text-primary">UNDS Admin</span>
        </div>
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between px-3 py-2 rounded-xs text-xs font-ui tracking-wider text-text-secondary hover:bg-[#2e3a28]/5 hover:text-primary transition-colors"
            >
              <span>{item.label}</span>
              <span className="text-[10px] font-bold bg-[#2e3a28]/10 text-primary px-1.5 py-0.5 rounded-xs">
                {counts[item.label]}
              </span>
            </Link>
          ))}
        </nav>
        <form action={logoutAction} className="pt-4 border-t border-[#2e3a28]/10">
          <button type="submit" className="text-xs font-ui btn btn-primary tracking-wider text-red-500 cursor-pointer">
            Sign Out
          </button>
        </form>
      </aside>
      <main className="flex-1 p-4 lg:p-8 text-left">{children}</main>
    </div>
  );
}
