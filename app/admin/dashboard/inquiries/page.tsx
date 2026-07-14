import { db } from "@/lib/db";
import { resolveContactAction } from "@/lib/actions/contact";

export default async function AdminInquiriesPage() {
  const messages = await db.contactMessage.findMany({
    where: { resolved: false },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="font-garamond text-2xl font-bold text-[#2e3a28]">Inquiries</h1>
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="border border-[#2e3a28]/10 bg-surface p-5 rounded-xs space-y-2">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-text-primary">{message.name}</span>
                <span className="text-text-muted text-xs ml-2">{message.email}</span>
              </div>
              <form action={resolveContactAction.bind(null, message.id)}>
                <button type="submit" className="text-xs font-ui tracking-wider text-primary font-bold cursor-pointer shrink-0">
                  Archive / Resolve
                </button>
              </form>
            </div>
            <p className="text-xs font-manrope text-text-muted font-bold">{message.subject}</p>
            <p className="text-sm font-garamond text-text-secondary">{message.message}</p>
          </div>
        ))}
        {messages.length === 0 && <p className="text-center text-text-muted py-12">No open inquiries.</p>}
      </div>
    </div>
  );
}
