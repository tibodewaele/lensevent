import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  const secret    = (data.get('secret')    as string) || '';
  const naam      = (data.get('naam')      as string) || '';
  const email     = (data.get('email')     as string) || '';
  const datum     = (data.get('datum')     as string) || '';
  const fotolink  = (data.get('fotolink')  as string) || '';

  if (secret !== import.meta.env.ADMIN_SECRET) {
    return new Response(JSON.stringify({ ok: false, error: 'Ongeldig wachtwoord.' }), {
      status: 401, headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!naam || !email || !datum || !fotolink) {
    return new Response(JSON.stringify({ ok: false, error: 'Vul alle velden in.' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }

  const voornaam = naam.split(' ')[0];

  const eventDate = new Date(datum);
  const sendDate = new Date(eventDate);
  sendDate.setDate(sendDate.getDate() + 1);
  sendDate.setHours(10, 0, 0, 0);

  const sendAt = sendDate > new Date() ? sendDate.toISOString() : undefined;

  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: 'Lens Event <noreply@lensevent.be>',
      to: email,
      subject: 'Waren jouw foto\'s geslaagd? Geef ons een positieve review! ⭐',
      ...(sendAt ? { scheduledAt: sendAt } : {}),
      html: `
        <!DOCTYPE html>
        <html lang="nl">
        <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
        <body style="margin:0;padding:0;background:#f7f1e8;font-family:Inter,system-ui,sans-serif;color:#1c1714;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f1e8;padding:40px 16px;">
            <tr><td align="center">
              <table width="100%" style="max-width:560px;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(20,12,6,.12);">
                <tr>
                  <td style="background:#15110f;padding:28px 36px;text-align:center;">
                    <p style="margin:0;font-family:Poppins,system-ui,sans-serif;font-weight:800;font-size:22px;color:#fff;letter-spacing:.04em;">
                      Lens <span style="color:#d8a24a;">Event</span>
                    </p>
                    <p style="margin:6px 0 0;font-size:13px;color:#c8bcae;letter-spacing:.25em;text-transform:uppercase;">OOOH!</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:36px 36px 32px;">
                    <p style="margin:0 0 20px;font-family:Poppins,system-ui,sans-serif;font-size:20px;font-weight:700;color:#15110f;">
                      Dag ${voornaam},
                    </p>

                    <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#1c1714;">
                      Ik hoop dat jullie genoten hebben van de photobooth op jullie feest.
                    </p>

                    <p style="margin:0 0 24px;font-size:16px;line-height:1.7;color:#1c1714;">
                      Ik hoor graag wat jullie ervan vonden – feedback helpt ons om de service voortdurend te verbeteren.
                    </p>

                    <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#1c1714;">
                      Waren jullie echt tevreden? Dan zou ik het enorm waarderen als je een positieve review wil achterlaten op Google. Dit helpt ons enorm. Het zorgt ervoor dat mensen ons makkelijker kunnen vinden en kan heel eenvoudig via deze knop:
                    </p>

                    <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                      <tr><td>
                        <a href="https://g.page/r/CZ8EdevZ7-1HEAE/review" style="display:inline-block;background:#d8a24a;color:#15110f;font-family:Poppins,system-ui,sans-serif;font-weight:700;font-size:15px;padding:14px 28px;border-radius:999px;text-decoration:none;">
                          ⭐ Laat een review achter
                        </a>
                      </td></tr>
                    </table>

                    <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#1c1714;">
                      Alle foto's van het event kunnen jullie bekijken en downloaden via deze link:
                    </p>

                    <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                      <tr><td>
                        <a href="${fotolink}" style="display:inline-block;background:#15110f;color:#f7f1e8;font-family:Poppins,system-ui,sans-serif;font-weight:700;font-size:15px;padding:14px 28px;border-radius:999px;text-decoration:none;">
                          📸 Bekijk jullie foto's
                        </a>
                      </td></tr>
                    </table>

                    <p style="margin:0 0 28px;font-size:16px;line-height:1.7;color:#1c1714;">
                      Alvast bedankt voor jullie vertrouwen en hopelijk tot een volgende keer!
                    </p>

                    <p style="margin:0;font-size:15px;line-height:1.8;color:#1c1714;">
                      Met vriendelijke groeten<br><br>
                      <strong>Tibo De Waele</strong><br>
                      Lens Event – OOOH! Photobooth<br>
                      <a href="tel:+32492528448" style="color:#b9842f;text-decoration:none;">+32 492 528 448</a><br>
                      <a href="mailto:contact@lensevent.be" style="color:#b9842f;text-decoration:none;">contact@lensevent.be</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="background:#f7f1e8;padding:20px 36px;border-top:1px solid #e7ddcd;">
                    <p style="margin:0;font-size:12px;color:#7a6f64;text-align:center;">
                      Lens Event · Eeklo · <a href="https://www.lensevent.be" style="color:#b9842f;">www.lensevent.be</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    });

    return new Response(JSON.stringify({ ok: true, scheduled: !!sendAt, sendAt: sendAt || 'direct' }), {
      status: 200, headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('After-event email fout:', err);
    return new Response(JSON.stringify({ ok: false, error: 'Er ging iets mis bij het versturen.' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
};
