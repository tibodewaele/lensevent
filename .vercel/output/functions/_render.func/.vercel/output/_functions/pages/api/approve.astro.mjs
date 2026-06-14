import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const GET = async ({ url }) => {
  const encoded = url.searchParams.get("data");
  if (!encoded) {
    return new Response(errorPage("Ongeldige goedkeuringslink."), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }
  let booking;
  try {
    booking = JSON.parse(Buffer.from(encoded, "base64url").toString("utf-8"));
  } catch {
    return new Response(errorPage("De link kon niet worden verwerkt."), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }
  const { naam, email, booth, datum, stad } = booking;
  const datumFormatted = datum ? new Date(datum).toLocaleDateString("nl-BE", { day: "numeric", month: "long", year: "numeric" }) : "";
  const resend = new Resend(undefined                              );
  try {
    await resend.emails.send({
      from: "Lens Event <noreply@lensevent.be>",
      to: email,
      subject: "Je boeking is bevestigd! 🎉 — Lens Event",
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
                    <p style="margin:6px 0 0;font-size:13px;color:#c8bcae;letter-spacing:.25em;text-transform:uppercase;">Boeking bevestigd</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:36px 36px 28px;text-align:center;">
                    <p style="margin:0 0 8px;font-size:48px;">🎉</p>
                    <p style="margin:0 0 12px;font-family:Poppins,system-ui,sans-serif;font-size:22px;font-weight:700;color:#15110f;">
                      Je boeking is bevestigd!
                    </p>
                    <p style="margin:0 0 28px;color:#7a6f64;font-size:16px;line-height:1.6;">
                      Geweldig nieuws ${naam.split(" ")[0]}! Je boeking bij Lens Event is officieel bevestigd. We kunnen niet wachten om er een onvergetelijk feest van te maken. 🎊
                    </p>

                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f1e8;border-radius:12px;padding:20px 24px;margin-bottom:28px;text-align:left;">
                      <tr><td>
                        <p style="margin:0 0 12px;font-family:Poppins,system-ui,sans-serif;font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#b9842f;">Jouw boeking</p>
                        ${booth ? `<p style="margin:0 0 6px;font-size:15px;"><strong>Formule:</strong> ${booth}</p>` : ""}
                        ${datum ? `<p style="margin:0 0 6px;font-size:15px;"><strong>Datum:</strong> ${datumFormatted}</p>` : ""}
                        ${stad ? `<p style="margin:0;font-size:15px;"><strong>Locatie:</strong> ${stad}</p>` : ""}
                      </td></tr>
                    </table>

                    <p style="margin:0 0 28px;color:#7a6f64;font-size:15px;line-height:1.6;text-align:left;">
                      We nemen binnenkort contact op om alle details te bespreken. Heb je alvast vragen? Stuur ons een berichtje via <a href="https://wa.me/32492528448" style="color:#d8a24a;font-weight:600;">WhatsApp</a>.
                    </p>

                    <p style="margin:0;font-size:15px;color:#1c1714;text-align:left;">
                      Tot dan! 🎈<br>
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
      `
    });
    return new Response(successPage(naam), {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  } catch (err) {
    console.error("Approval email error:", err);
    return new Response(errorPage("Er ging iets mis bij het versturen van de bevestigingsmail."), {
      status: 500,
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }
};
function successPage(naam) {
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
      <p>${naam.split(" ")[0]} heeft automatisch een bevestigingsmail ontvangen. Alles is geregeld!</p>
      <a href="https://www.lensevent.be">← Terug naar de website</a>
    </div>
  </body>
  </html>`;
}
function errorPage(msg) {
  return `<!DOCTYPE html>
  <html lang="nl">
  <head><meta charset="utf-8"><title>Fout — Lens Event</title>
  <style>body{margin:0;padding:40px;background:#f7f1e8;font-family:system-ui;text-align:center;}
  h1{color:#15110f;}p{color:#7a6f64;}</style></head>
  <body><h1>Oeps</h1><p>${msg}</p></body>
  </html>`;
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
