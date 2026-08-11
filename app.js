const SUPABASE_URL = 'https://bhpscrmwsmcwmvapemxz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_lj2RFmTiDKIMr7K-suRbCA_yOuLekl9';

let supabaseClient;

document.addEventListener('DOMContentLoaded', () => {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  const menuBtn = document.querySelector('#menuBtn');
  const navLinks = document.querySelector('#navLinks');
  menuBtn?.addEventListener('click', () => navLinks.classList.toggle('open'));

  document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));

  document.querySelector('#registrationForm')?.addEventListener('submit', submitRegistration);
});

async function submitRegistration(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const message = document.querySelector('#formMessage');
  const button = form.querySelector('button[type="submit"]');
  const data = Object.fromEntries(new FormData(form).entries());

  button.disabled = true;
  button.textContent = 'Envoi en cours...';
  message.textContent = '';

  const { data: registration, error } = await supabaseClient
    .from('travel_registrations')
    .insert({
      service: data.service,
      full_name: data.full_name.trim(),
      birth_date: data.birth_date || null,
      birth_place: data.birth_place?.trim() || null,
      phone: data.phone.trim(),
      email: data.email?.trim() || null,
      passport_number: data.passport_number?.trim() || null,
      travel_date: data.travel_date || null,
      notes: data.notes?.trim() || null
    })
    .select('dossier_number')
    .single();

  button.disabled = false;
  button.textContent = 'Envoyer mon inscription';

  if (error) {
    console.error(error);
    message.textContent = 'Impossible d’envoyer le dossier. Vérifiez les informations et réessayez.';
    message.style.color = '#b42318';
    return;
  }

  message.textContent = `Inscription enregistrée. Votre numéro de dossier est ${registration.dossier_number}. Conservez-le précieusement.`;
  message.style.color = '#16794a';
  form.reset();
}
