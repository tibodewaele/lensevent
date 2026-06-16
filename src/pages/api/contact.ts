import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  const voornaam  = (data.get('voornaam')   as string) || '';
  const achternaam = (data.get('achternaam') as string) || '';
  const email     = (data.get('email')      as string) || '';
  const telefoon  = (data.get('telefoon')   as string) || '';
  const stad      = (data.get('stad')       as string) || '';
  const datum     = (data.get('datum')      as string) || '';
  const bedrijf   = (data.get('bedrijf')    as string) || '';
  const booth     = (data.get('booth')      as string) || '';
  const opmerkingen = (data.get('opmerkingen') as string) || '';

  const naam = `${voornaam} ${achternaam}`.trim();

  const prijsMap: Record<string, string> = {
    'Gold Photobooth': '€340',
    'Luxe Photobooth': '€400',
  };
  const totaalprijs = prijsMap[booth] || '—';

  // Sla op in Google Sheets
  try {
    await fetch('https://script.google.com/macros/s/AKfycbyCvbCHTTHBrWZX-VwWMV5DBBoiRGNGHD7TSzB5fKjRdyfbHl88I4HG7cDgP6md-mO3tw/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        naam, email, telefoon,
        locatie: stad, datum, formule: booth,
        template: '—', totaalprijs,
        status: 'Aangevraagd',
        opmerkingen,
      }),
    });
  } catch (err) {
    console.error('Sheets fout:', err);
  }

  const bookingPayload = Buffer.from(JSON.stringify({
    naam, email, telefoon, stad, datum, bedrijf, booth, opmerkingen,
  })).toString('base64url');

  const approvalUrl = `https://www.lensevent.be/api/approve?data=${bookingPayload}`;

  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  const datumFormatted = datum
    ? new Date(datum).toLocaleDateString('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' })
    : '—';

  try {
    // 1. Auto-reply naar de klant
    await resend.emails.send({
      from: 'Lens Event <noreply@lensevent.be>',
      to: email,
      subject: 'Je aanvraag is goed ontvangen — Lens Event OOOH!',
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
                  <td style="padding:36px 36px 28px;">
                    <p style="margin:0 0 8px;font-family:Poppins,system-ui,sans-serif;font-size:22px;font-weight:700;color:#15110f;">
                      Hoi ${voornaam}! 👋
                    </p>
                    <p style="margin:0 0 24px;color:#7a6f64;font-size:16px;line-height:1.6;">
                      Super dat je interesse hebt in onze photobooth! We hebben je aanvraag goed ontvangen en nemen <strong style="color:#15110f;">binnen 24 uur</strong> contact met je op.
                    </p>

                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f1e8;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
                      <tr><td>
                        <p style="margin:0 0 12px;font-family:Poppins,system-ui,sans-serif;font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#b9842f;">Jouw aanvraag</p>
                        ${booth   ? `<p style="margin:0 0 6px;font-size:15px;color:#1c1714;"><strong>Formule:</strong> ${booth}</p>` : ''}
                        ${datum   ? `<p style="margin:0 0 6px;font-size:15px;color:#1c1714;"><strong>Datum:</strong> ${datumFormatted}</p>` : ''}
                        ${stad    ? `<p style="margin:0 0 6px;font-size:15px;color:#1c1714;"><strong>Locatie:</strong> ${stad}</p>` : ''}
                        ${bedrijf ? `<p style="margin:0 0 6px;font-size:15px;color:#1c1714;"><strong>Bedrijf:</strong> ${bedrijf}</p>` : ''}
                        ${opmerkingen ? `<p style="margin:0;font-size:15px;color:#1c1714;"><strong>Opmerkingen:</strong> ${opmerkingen}</p>` : ''}
                      </td></tr>
                    </table>

                    <p style="margin:0 0 32px;color:#7a6f64;font-size:15px;line-height:1.6;">
                      Heb je vragen? Stuur ons gerust een berichtje via <a href="https://wa.me/32492528448" style="color:#d8a24a;font-weight:600;">WhatsApp</a> of mail naar <a href="mailto:contact@lensevent.be" style="color:#d8a24a;font-weight:600;">contact@lensevent.be</a>.
                    </p>

                    <p style="margin:0;font-size:15px;color:#1c1714;">
                      Tot snel! 🎉<br>
                      <strong>Tibo — Lens Event</strong>
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

    // 2. Notificatie + goedkeuringsknop naar Tibo
    await resend.emails.send({
      from: 'Lens Event <noreply@lensevent.be>',
      to: 'contact@lensevent.be',
      subject: `📩 Nieuwe aanvraag: ${naam}${datum ? ' — ' + datumFormatted : ''}`,
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
                    <p style="margin:6px 0 0;font-size:13px;color:#c8bcae;letter-spacing:.25em;text-transform:uppercase;">Nieuwe aanvraag</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:36px 36px 28px;">
                    <p style="margin:0 0 20px;font-family:Poppins,system-ui,sans-serif;font-size:20px;font-weight:700;color:#15110f;">
                      Je hebt een nieuwe aanvraag! 🎉
                    </p>

                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f1e8;border-radius:12px;padding:20px 24px;margin-bottom:28px;">
                      <tr><td>
                        <p style="margin:0 0 12px;font-family:Poppins,system-ui,sans-serif;font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#b9842f;">Aanvraagdetails</p>
                        <p style="margin:0 0 6px;font-size:15px;"><strong>Naam:</strong> ${naam}</p>
                        <p style="margin:0 0 6px;font-size:15px;"><strong>E-mail:</strong> <a href="mailto:${email}" style="color:#d8a24a;">${email}</a></p>
                        <p style="margin:0 0 6px;font-size:15px;"><strong>Telefoon:</strong> <a href="tel:${telefoon}" style="color:#d8a24a;">${telefoon}</a></p>
                        ${booth    ? `<p style="margin:0 0 6px;font-size:15px;"><strong>Formule:</strong> ${booth}</p>` : ''}
                        ${datum    ? `<p style="margin:0 0 6px;font-size:15px;"><strong>Datum:</strong> ${datumFormatted}</p>` : ''}
                        ${stad     ? `<p style="margin:0 0 6px;font-size:15px;"><strong>Locatie:</strong> ${stad}</p>` : ''}
                        ${bedrijf  ? `<p style="margin:0 0 6px;font-size:15px;"><strong>Bedrijf:</strong> ${bedrijf}</p>` : ''}
                        ${opmerkingen ? `<p style="margin:0;font-size:15px;"><strong>Opmerkingen:</strong> ${opmerkingen}</p>` : ''}
                      </td></tr>
                    </table>

                    <p style="margin:0 0 20px;color:#7a6f64;font-size:15px;line-height:1.6;">
                      Klik op de knop hieronder om de boeking te bevestigen. ${naam} ontvangt dan automatisch een officiële bevestigingsmail.
                    </p>

                    <table cellpadding="0" cellspacing="0" style="width:100%;">
                      <tr><td align="center">
                        <a href="${approvalUrl}" style="display:inline-block;background:#d8a24a;color:#15110f;font-family:Poppins,system-ui,sans-serif;font-weight:700;font-size:16px;padding:16px 36px;border-radius:999px;text-decoration:none;">
                          ✓ Bevestig de boeking van ${voornaam}
                        </a>
                      </td></tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="background:#f7f1e8;padding:20px 36px;border-top:1px solid #e7ddcd;">
                    <p style="margin:0;font-size:12px;color:#7a6f64;text-align:center;">
                      Lens Event · <a href="https://www.lensevent.be" style="color:#b9842f;">www.lensevent.be</a>
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

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Email error:', err);
    return new Response(JSON.stringify({ ok: false }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
