import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();
  const payload = {
    name: form.get("name"),
    email: form.get("email"),
    message: form.get("message"),
    t: new Date().toISOString(),
  };
  // TODO: buraya gerçek e-posta/discord/slack entegrasyonu eklenebilir
  console.log("CONTACT_FORM", payload); // pm2 logs'ta görürsün
  return NextResponse.json({ ok: true });
}
