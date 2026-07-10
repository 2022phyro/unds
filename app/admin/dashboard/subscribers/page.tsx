import { db } from "@/lib/db";
import { unsubscribeAction } from "@/lib/actions/newsletter";

export default async function AdminSubscribersPage() {
  const subscribers = await db.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="font-garamond text-2xl font-bold text-[#2e3a28]">Subscribers</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-manrope border border-[#2e3a28]/10">
          <thead>
            <tr className="border-b border-[#2e3a28]/10 font-ui tracking-wider text-text-muted">
              <th className="p-2">Email</th>
              <th className="p-2">Source</th>
              <th className="p-2">Subscribed</th>
              <th className="p-2" />
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub) => (
              <tr key={sub.id} className="border-b border-[#2e3a28]/5">
                <td className="p-2 font-bold">{sub.email}</td>
                <td className="p-2">{sub.source ?? "—"}</td>
                <td className="p-2">{sub.createdAt.toLocaleDateString()}</td>
                <td className="p-2">
                  <form action={unsubscribeAction.bind(null, sub.id)}>
                    <button type="submit" className="text-red-700 cursor-pointer">
                      Scrub / Unsubscribe
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-text-muted">
                  No subscribers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
