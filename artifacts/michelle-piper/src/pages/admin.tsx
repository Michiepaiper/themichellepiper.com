import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = "tmp_admin_pw";

type Contact = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  createdAt: string;
};
type Enrollment = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  course: string;
  createdAt: string;
};
type AdminTestimonial = {
  id: number;
  name: string;
  role: string;
  text: string;
  approved: boolean;
  createdAt: string;
};
type Subscriber = {
  id: number;
  email: string;
  createdAt: string;
};
type Submissions = {
  contacts: Contact[];
  enrollments: Enrollment[];
  testimonials: AdminTestimonial[];
  subscribers: Subscriber[];
};

const apiBase = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/api`;

export default function Admin() {
  const { toast } = useToast();
  const [password, setPassword] = useState<string | null>(() =>
    sessionStorage.getItem(STORAGE_KEY),
  );
  const [pwInput, setPwInput] = useState("");
  const [data, setData] = useState<Submissions | null>(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"contacts" | "enrollments" | "testimonials" | "subscribers">("contacts");

  const loadData = async (pw: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/admin/submissions`, {
        headers: { "X-Admin-Password": pw },
      });
      if (res.status === 401) {
        sessionStorage.removeItem(STORAGE_KEY);
        setPassword(null);
        toast({ title: "Session expired", description: "Please sign in again.", variant: "destructive" });
        return;
      }
      if (!res.ok) throw new Error("Failed to load");
      const json = (await res.json()) as Submissions;
      setData(json);
    } catch {
      toast({ title: "Could not load submissions", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (password) loadData(password);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwInput }),
      });
      const json = (await res.json()) as { ok: boolean };
      if (json.ok) {
        sessionStorage.setItem(STORAGE_KEY, pwInput);
        setPassword(pwInput);
        setPwInput("");
      } else {
        toast({ title: "Incorrect password", variant: "destructive" });
      }
    } catch {
      toast({ title: "Login failed", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setPassword(null);
    setData(null);
  };

  const handleDeleteTestimonial = async (id: number) => {
    if (!password) return;
    if (!confirm("Delete this testimonial? This cannot be undone.")) return;
    try {
      const res = await fetch(`${apiBase}/admin/testimonials/${id}`, {
        method: "DELETE",
        headers: { "X-Admin-Password": password },
      });
      if (!res.ok) throw new Error();
      toast({ title: "Testimonial deleted" });
      loadData(password);
    } catch {
      toast({ title: "Could not delete", variant: "destructive" });
    }
  };

  const fmt = (iso: string) => new Date(iso).toLocaleString();

  if (!password) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-background px-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-card border border-border p-8 space-y-5">
          <div className="text-center">
            <h1 className="text-2xl font-serif font-bold">Admin Access</h1>
            <p className="text-sm text-muted-foreground mt-2">Enter the admin password to view submissions.</p>
          </div>
          <Input
            type="password"
            required
            value={pwInput}
            onChange={(e) => setPwInput(e.target.value)}
            placeholder="Password"
            className="rounded-none"
            autoFocus
          />
          <Button type="submit" disabled={loading} className="w-full rounded-none bg-foreground text-background uppercase tracking-widest text-xs py-5">
            {loading ? "Checking..." : "Sign In"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-xl font-bold tracking-widest">ADMIN</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">The Michelle Piper</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-none" onClick={() => password && loadData(password)} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh"}
            </Button>
            <Button variant="outline" className="rounded-none" onClick={handleLogout}>
              Sign Out
            </Button>
          </div>
        </div>
        <div className="container mx-auto px-6 flex gap-6 border-t border-border">
          {(["contacts", "enrollments", "testimonials", "subscribers"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-4 text-xs uppercase tracking-widest font-semibold border-b-2 transition-colors ${
                tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t} ({data ? data[t].length : 0})
            </button>
          ))}
        </div>
      </header>

      <main className="container mx-auto px-6 py-10">
        {!data ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : tab === "contacts" ? (
          data.contacts.length === 0 ? (
            <p className="text-muted-foreground">No contact submissions yet.</p>
          ) : (
            <div className="space-y-4">
              {data.contacts.map((c) => (
                <div key={c.id} className="border border-border bg-card p-6">
                  <div className="flex flex-wrap justify-between gap-2 mb-3">
                    <h3 className="font-serif text-lg font-bold">{c.fullName}</h3>
                    <span className="text-xs text-muted-foreground">{fmt(c.createdAt)}</span>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3 text-sm mb-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">Email</p>
                      <a href={`mailto:${c.email}`} className="text-primary hover:underline break-all">{c.email}</a>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">Phone</p>
                      <a href={`tel:${c.phone}`} className="hover:underline">{c.phone}</a>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">Service</p>
                      <p>{c.service}</p>
                    </div>
                  </div>
                  <p className="text-sm whitespace-pre-wrap border-l-2 border-primary pl-4">{c.message}</p>
                </div>
              ))}
            </div>
          )
        ) : tab === "enrollments" ? (
          data.enrollments.length === 0 ? (
            <p className="text-muted-foreground">No training enrollments yet.</p>
          ) : (
            <div className="space-y-4">
              {data.enrollments.map((e) => (
                <div key={e.id} className="border border-border bg-card p-6">
                  <div className="flex flex-wrap justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-serif text-lg font-bold">{e.fullName}</h3>
                      <p className="text-xs uppercase tracking-widest text-primary">{e.course}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{fmt(e.createdAt)}</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">Email</p>
                      <a href={`mailto:${e.email}`} className="text-primary hover:underline break-all">{e.email}</a>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">Phone</p>
                      <a href={`tel:${e.phone}`} className="hover:underline">{e.phone}</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : tab === "subscribers" ? (
          data.subscribers.length === 0 ? (
            <p className="text-muted-foreground">No newsletter subscribers yet.</p>
          ) : (
            <div className="border border-border bg-card divide-y divide-border">
              <div className="flex justify-between items-center p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                  {data.subscribers.length} Subscriber{data.subscribers.length === 1 ? "" : "s"}
                </p>
                <a
                  href={`mailto:?bcc=${data.subscribers.map((s) => s.email).join(",")}`}
                  className="text-xs uppercase tracking-widest text-primary hover:underline"
                >
                  Email all (BCC)
                </a>
              </div>
              {data.subscribers.map((s) => (
                <div key={s.id} className="flex items-center justify-between p-4">
                  <a href={`mailto:${s.email}`} className="text-primary hover:underline break-all">{s.email}</a>
                  <span className="text-xs text-muted-foreground">{fmt(s.createdAt)}</span>
                </div>
              ))}
            </div>
          )
        ) : data.testimonials.length === 0 ? (
          <p className="text-muted-foreground">No testimonials yet.</p>
        ) : (
          <div className="space-y-4">
            {data.testimonials.map((t) => (
              <div key={t.id} className="border border-border bg-card p-6">
                <div className="flex flex-wrap justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold">{t.name}</h3>
                    <p className="text-xs uppercase tracking-widest text-primary">{t.role}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{fmt(t.createdAt)}</span>
                    <Button
                      variant="outline"
                      className="rounded-none text-xs h-8 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => handleDeleteTestimonial(t.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                <p className="text-sm whitespace-pre-wrap border-l-2 border-primary pl-4 italic">"{t.text}"</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
