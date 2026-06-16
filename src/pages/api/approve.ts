import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const encoded = url.searchParams.get('data');

  if (!encoded) {
    return new Response(errorPage('Ongeldige goedkeuringslink.'), {
      status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  let booking: Record<string, string>;
  try {
    booking = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf-8'));
  } catch {
    return new Response(errorPage('De link kon niet worden verwerkt.'), {
      status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  const { naam, email, booth, datum, stad } = booking;
  const voornaam = naam.split(' ')[0];

  // Update status in Google Sheets
  try {
    await fetch('https://script.google.com/macros/s/AKfycbxpC-hFXxJ2plahi7Eh-d9iucXcJoLtfuMe7GodNx46WFeOa7QecdPe3E7ssZ-d64Q1nQ/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updateStatus: true, email, status: 'Bevestigd' }),
    });
  } catch (err) {
    console.error('Sheets update fout:', err);
  }

  const eventDate = datum ? new Date(datum) : null;

  const datumFormatted = eventDate
    ? eventDate.toLocaleDateString('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  const datumMetDag = eventDate
    ? eventDate.toLocaleDateString('nl-BE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  // Plan herinneringsmail 14 dagen voor het evenement
  if (eventDate) {
    const reminderDate = new Date(eventDate);
    reminderDate.setDate(reminderDate.getDate() - 14);
    reminderDate.setHours(9, 0, 0, 0);

    const sendAt = reminderDate > new Date() ? reminderDate.toISOString() : undefined;
    try {
        await resend.emails.send({
          from: 'Lens Event <noreply@lensevent.be>',
          to: email,
          subject: `Nog 2 weken tot jullie feest! 🎉 — Lens Event OOOH!`,
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
                          Jullie feest komt steeds dichterbij! Wij kijken er alvast naar uit om er een topfeest van te maken! 🎉
                        </p>

                        <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#1c1714;">
                          Indien jullie nog geen template gekozen hebben, kan je dit hier doen.
                        </p>

                        <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                          <tr><td>
                            <a href="https://www.lensevent.be/templates" style="display:inline-block;background:#d8a24a;color:#15110f;font-family:Poppins,system-ui,sans-serif;font-weight:700;font-size:15px;padding:14px 28px;border-radius:999px;text-decoration:none;">
                              Kies je template →
                            </a>
                          </td></tr>
                        </table>

                        <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#1c1714;">
                          De levering van de OOOH! Photobooth gebeurt op <strong>${datumMetDag}</strong> tussen 13:00 en 14:00 uur door een bezorger, tenzij we dit op aanvraag anders besproken hebben. Indien je toch graag een ander uur wil, stuur gerust een mail naar <a href="mailto:contact@lensevent.be" style="color:#b9842f;font-weight:600;">contact@lensevent.be</a> dan bekijken we wat er mogelijk is.
                        </p>

                        <p style="margin:0 0 8px;font-size:16px;line-height:1.7;color:#1c1714;">
                          Momenteel gaat het feest door op:
                        </p>

                        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f1e8;border-radius:12px;padding:16px 20px;margin-bottom:16px;">
                          <tr><td>
                            <p style="margin:0;font-size:16px;font-weight:600;color:#15110f;">${stad || '—'}</p>
                          </td></tr>
                        </table>

                        <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#1c1714;">
                          Kunnen jullie een exacte locatie nog vermelden indien deze locatie niet exact is? Anders kunnen wij de locatie niet terugvinden in ons databestand.
                        </p>

                        <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#1c1714;">
                          De ophaling vindt plaats op de volgende dag tussen 11:00u en 12:00u. Dit dienen jullie zelf af te spreken met de zaal. Indien wij geen verdere info horen gaan we ervan uit dat dit in orde is. Indien jullie dit zelf graag anders willen, gelieve dit telefonisch of via mail door te geven.
                        </p>

                        <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#1c1714;">
                          We vragen graag dat er bij de levering even iemand aanwezig is, zodat we alles kunnen demonstreren en jullie zeker weten dat alles correct werkt.
                        </p>

                        <p style="margin:0 0 24px;font-size:16px;line-height:1.7;color:#1c1714;">
                          Dit contract dient ondertekend te worden vóór of tijdens de levering. Indien het voor jullie niet mogelijk is om het vooraf af te drukken en te ondertekenen, brengen wij zelf een exemplaar mee. We willen wel meegeven dat de booth enkel kan worden achtergelaten wanneer het contract getekend is, conform onze afspraken met de verzekeringsmaatschappij.
                        </p>

                        <p style="margin:0 0 28px;font-size:16px;line-height:1.7;color:#1c1714;">
                          Alvast bedankt voor de samenwerking! Mocht er nog iets onduidelijk zijn of als jullie bijkomende vragen hebben, aarzel zeker niet om ons te contacteren.
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
      } catch (err) {
        console.error('Reminder email schedule fout:', err);
      }
  }

  try {
    await resend.emails.send({
      from: 'Lens Event <noreply@lensevent.be>',
      to: email,
      subject: 'Je boeking is bevestigd! 🎊 — Lens Event OOOH!',
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
                      Hallo ${naam},
                    </p>

                    <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#1c1714;">
                      Bedankt voor je boeking van de OOOH! Photobooth. Wat een feest gaat dit worden! 🎊
                    </p>

                    <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#1c1714;">
                      Super dat je hebt gekozen voor een premium template. Daarmee wordt jullie fotostrip echt uniek en helemaal op maat.
                    </p>

                    <p style="margin:0 0 8px;font-size:16px;line-height:1.7;color:#1c1714;">
                      Je kan alvast hier een kijkje nemen in onze collectie:
                    </p>

                    <table cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
                      <tr><td>
                        <a href="https://www.lensevent.be/templates" style="display:inline-block;background:#d8a24a;color:#15110f;font-family:Poppins,system-ui,sans-serif;font-weight:700;font-size:15px;padding:14px 28px;border-radius:999px;text-decoration:none;">
                          Bekijk onze templates →
                        </a>
                      </td></tr>
                    </table>

                    <p style="margin:0 0 24px;font-size:16px;line-height:1.7;color:#1c1714;">
                      Kies je template en zorg ervoor dat hij helemaal afgestemd is op jouw feest. Vervolgens vul je het formulier in en druk je op bevestigen. De factuur zal je later via mail ontvangen.
                    </p>

                    <p style="margin:0 0 28px;font-size:16px;line-height:1.7;color:#1c1714;">
                      Indien je nog vragen hebt, aarzel niet om te mailen naar <a href="mailto:contact@lensevent.be" style="color:#b9842f;font-weight:600;">contact@lensevent.be</a>.
                    </p>

                    <p style="margin:0 0 6px;font-size:16px;line-height:1.7;color:#1c1714;">
                      Tot binnenkort. We zullen er een prachtig feest van maken met prachtige herinneringen!
                    </p>

                    <p style="margin:24px 0 0;font-size:15px;line-height:1.8;color:#1c1714;">
                      Met vriendelijke groeten<br><br>
                      <strong>Tibo De Waele</strong><br>
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

    return new Response(successPage(naam), {
      status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (err) {
    console.error('Approval email error:', err);
    return new Response(errorPage('Er ging iets mis bij het versturen van de bevestigingsmail.'), {
      status: 500, headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
};

function successPage(naam: string) {
  return `<!DOCTYPE html>
  <html lang="nl">
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Boeking bevestigd — Lens Event</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">
  <style>body{margin:0;padding:0;background:#f7f1e8;font-family:Inter,system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;}
  .card{background:#fff;border-radius:16px;padding:48px 40px;max-width:480px;width:100%;box-shadow:0 10px 40px rgba(20,12,6,.12);text-align:center;}
  .icon{font-size:56px;margin-bottom:16px;}
  h1{font-family:Poppins,sans-serif;font-size:24px;font-weight:800;color:#15110f;margin:0 0 12px;}
  p{color:#7a6f64;font-size:16px;line-height:1.6;margin:0 0 24px;}
  a{display:inline-block;background:#15110f;color:#f7f1e8;font-family:Poppins,sans-serif;font-weight:700;padding:14px 28px;border-radius:999px;text-decoration:none;font-size:15px;}</style>
  </head>
  <body>
    <div class="card">
      <div class="icon">✅</div>
      <h1>Boeking bevestigd!</h1>
      <p>${naam.split(' ')[0]} heeft automatisch een bevestigingsmail ontvangen. Alles is geregeld!</p>
      <a href="https://www.lensevent.be">← Terug naar de website</a>
    </div>
  </body>
  </html>`;
}

function errorPage(msg: string) {
  return `<!DOCTYPE html>
  <html lang="nl">
  <head><meta charset="utf-8"><title>Fout — Lens Event</title>
  <style>body{margin:0;padding:40px;background:#f7f1e8;font-family:system-ui;text-align:center;}
  h1{color:#15110f;}p{color:#7a6f64;}</style></head>
  <body><h1>Oeps</h1><p>${msg}</p></body>
  </html>`;
}
