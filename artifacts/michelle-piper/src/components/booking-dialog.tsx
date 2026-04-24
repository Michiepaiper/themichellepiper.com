import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useCreateBooking, useListTakenSlots } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

const SLOT_HOUR_START = 9;
const SLOT_HOUR_END = 17;
const SLOT_MINUTES = 15;
const TZ = "Africa/Lagos";

type DayOption = { iso: string; label: string; weekday: string; isWeekend: boolean };

function getNextDays(count: number): DayOption[] {
  const out: DayOption[] = [];
  const now = new Date();
  for (let i = 0; out.length < count && i < count + 14; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const weekday = d.toLocaleDateString("en-GB", { weekday: "short", timeZone: TZ });
    const isWeekend = weekday === "Sat" || weekday === "Sun";
    if (isWeekend) continue;
    const iso = d.toLocaleDateString("en-CA", { timeZone: TZ });
    const label = d.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: TZ });
    out.push({ iso, label, weekday, isWeekend });
  }
  return out;
}

function buildSlotsForDate(dateIso: string): { iso: string; label: string }[] {
  const slots: { iso: string; label: string }[] = [];
  const [y, m, d] = dateIso.split("-").map(Number);
  for (let h = SLOT_HOUR_START; h < SLOT_HOUR_END; h++) {
    for (let min = 0; min < 60; min += SLOT_MINUTES) {
      const watString = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}T${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}:00+01:00`;
      const dateObj = new Date(watString);
      slots.push({
        iso: dateObj.toISOString(),
        label: `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`,
      });
    }
  }
  return slots;
}

export default function BookingDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const days = useMemo(() => getNextDays(10), []);
  const [selectedDate, setSelectedDate] = useState<string>(days[0]?.iso ?? "");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep] = useState<"slot" | "details" | "done">("slot");
  const [confirmedSlot, setConfirmedSlot] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: takenList = [], refetch: refetchTaken } = useListTakenSlots();
  const taken = useMemo(
    () => new Set((takenList as unknown as (string | Date)[]).map((s) => new Date(s).toISOString())),
    [takenList],
  );

  const createBooking = useCreateBooking();

  useEffect(() => {
    if (open) {
      setStep("slot");
      setSelectedSlot(null);
      setSelectedDate(days[0]?.iso ?? "");
      void refetchTaken();
    }
  }, [open, days, refetchTaken]);

  const slots = useMemo(() => (selectedDate ? buildSlotsForDate(selectedDate) : []), [selectedDate]);
  const now = Date.now();
  const minSlotTime = now + 60 * 60_000;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedSlot) return;
    const fd = new FormData(e.currentTarget);
    const payload = {
      fullName: String(fd.get("fullName") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      slotStart: selectedSlot,
      notes: String(fd.get("notes") ?? "").trim() || undefined,
    };
    try {
      const res = await createBooking.mutateAsync({ data: payload });
      setConfirmedSlot(res.slotStart);
      setStep("done");
      void refetchTaken();
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: string } } })?.response?.data?.error ??
        "Could not save booking. Please try again.";
      toast({ title: "Booking failed", description: msg, variant: "destructive" });
    }
  };

  const formatConfirmed = (iso: string) =>
    new Date(iso).toLocaleString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: TZ,
    });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-none max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <p className="text-primary uppercase tracking-widest text-xs font-semibold">Free 15-min Consultation</p>
          <DialogTitle className="font-serif text-2xl">Book a call with Michelle</DialogTitle>
          <DialogDescription>
            Pick a time that works for you (West Africa Time, GMT+1). You'll get an instant confirmation by email.
          </DialogDescription>
        </DialogHeader>

        {step === "slot" && (
          <div className="space-y-6 mt-2">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3 flex items-center gap-2">
                <CalendarDays className="w-4 h-4" /> Choose a day
              </p>
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                {days.map((d) => (
                  <button
                    key={d.iso}
                    onClick={() => {
                      setSelectedDate(d.iso);
                      setSelectedSlot(null);
                    }}
                    className={`min-w-[72px] flex flex-col items-center px-3 py-3 border transition-colors ${
                      selectedDate === d.iso
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background border-border hover:border-primary"
                    }`}
                  >
                    <span className="text-[10px] uppercase tracking-widest opacity-70">{d.weekday}</span>
                    <span className="font-serif text-lg mt-1">{d.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Available 15-minute slots
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {slots.map((s) => {
                  const isTaken = taken.has(s.iso);
                  const isPast = new Date(s.iso).getTime() < minSlotTime;
                  const disabled = isTaken || isPast;
                  const selected = selectedSlot === s.iso;
                  return (
                    <button
                      key={s.iso}
                      disabled={disabled}
                      onClick={() => setSelectedSlot(s.iso)}
                      className={`px-3 py-2.5 text-sm border transition-colors ${
                        selected
                          ? "bg-primary text-primary-foreground border-primary"
                          : disabled
                            ? "bg-muted/50 text-muted-foreground/50 border-border line-through cursor-not-allowed"
                            : "bg-background border-border hover:border-primary"
                      }`}
                      title={isTaken ? "Already booked" : isPast ? "Too soon" : ""}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
              {slots.every((s) => taken.has(s.iso) || new Date(s.iso).getTime() < minSlotTime) && (
                <p className="text-sm text-muted-foreground mt-3">No openings on this day — please pick another.</p>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <Button
                onClick={() => setStep("details")}
                disabled={!selectedSlot}
                className="rounded-none bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-serif tracking-widest uppercase px-8 py-5"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === "details" && selectedSlot && (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="bg-muted/40 border border-border p-4">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Selected slot</p>
              <p className="font-serif text-lg mt-1">{formatConfirmed(selectedSlot)} (WAT)</p>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Full Name</label>
              <Input required name="fullName" className="rounded-none focus-visible:ring-primary" placeholder="Your name" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Email</label>
                <Input required type="email" name="email" className="rounded-none focus-visible:ring-primary" placeholder="you@email.com" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Phone / WhatsApp</label>
                <Input required name="phone" className="rounded-none focus-visible:ring-primary" placeholder="+234..." />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">What would you like to discuss? (optional)</label>
              <Textarea name="notes" rows={3} className="rounded-none focus-visible:ring-primary" placeholder="A quick line so Michelle can prepare..." />
            </div>
            <div className="flex justify-between pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep("slot")}
                className="rounded-none"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={createBooking.isPending}
                className="rounded-none bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-serif tracking-widest uppercase px-8 py-5"
              >
                {createBooking.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm Booking"}
              </Button>
            </div>
          </form>
        )}

        {step === "done" && confirmedSlot && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/15 flex items-center justify-center">
              <CalendarDays className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-serif text-2xl">Almost there — check your inbox</h3>
            <p className="text-muted-foreground">
              Your requested slot is
            </p>
            <p className="font-serif text-xl text-primary">{formatConfirmed(confirmedSlot)} (WAT)</p>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              We've sent a confirmation link to your email address. Please click it to secure your slot — it will be held for 2 hours. Once confirmed, Michelle will reach out with the call details.
            </p>
            <Button
              onClick={() => onOpenChange(false)}
              className="rounded-none bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-serif tracking-widest uppercase px-8 py-5 mt-4"
            >
              Got it
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
