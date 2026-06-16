import type { APIRoute } from 'astro';

export const prerender = false;

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzIB8fLlBCCZWa2oojJYMPeLykkRmwrShNRoluoGm52Rnqsd54UbyArdjPgQgqiAt-dsA/exec';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  const secret      = (data.get('secret')      as string) || '';
  const email       = (data.get('email')        as string) || '';
  const datum       = (data.get('datum')        as string) || '';
  const templateUrl = (data.get('templateUrl')  as string) || '';

  if (secret !== import.meta.env.ADMIN_SECRET) {
    return new Response(JSON.stringify({ ok: false, error: 'Ongeldig wachtwoord.' }), {
      status: 401, headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!email || !datum || !templateUrl) {
    return new Response(JSON.stringify({ ok: false, error: 'Vul alle velden in.' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updateTemplate: true, email, datum, templateUrl }),
    });
    const text = await res.text();
    if (text === 'not found') {
      return new Response(JSON.stringify({ ok: false, error: 'Geen boeking gevonden met dit e-mailadres en deze datum.' }), {
        status: 404, headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('update-template fout:', err);
    return new Response(JSON.stringify({ ok: false, error: 'Er ging iets mis.' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
};
