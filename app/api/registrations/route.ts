import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const allowedTypes = new Set(['hajj', 'oumra']);

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: 'Vous devez être connecté pour envoyer une inscription.' },
      { status: 401 },
    );
  }

  const formData = await request.formData();
  const registrationType = String(formData.get('registrationType') ?? '');

  if (!allowedTypes.has(registrationType)) {
    return NextResponse.json({ error: 'Type d’inscription invalide.' }, { status: 400 });
  }

  const requiredFields = ['firstName', 'lastName', 'birthDate', 'birthPlace', 'nationality', 'phone', 'passportNumber', 'passportExpiry', 'emergencyName', 'emergencyPhone'];
  for (const field of requiredFields) {
    if (!String(formData.get(field) ?? '').trim()) {
      return NextResponse.json({ error: `Le champ ${field} est obligatoire.` }, { status: 400 });
    }
  }

  const { data: registration, error } = await supabase
    .from('registrations')
    .insert({
      user_id: user.id,
      registration_type: registrationType,
      first_name: String(formData.get('firstName')),
      last_name: String(formData.get('lastName')),
      birth_date: String(formData.get('birthDate')),
      birth_place: String(formData.get('birthPlace')),
      nationality: String(formData.get('nationality')),
      phone: String(formData.get('phone')),
      email: user.email ?? null,
      address: String(formData.get('address') ?? ''),
      passport_number: String(formData.get('passportNumber')),
      passport_expiry: String(formData.get('passportExpiry')),
      emergency_contact_name: String(formData.get('emergencyName')),
      emergency_contact_phone: String(formData.get('emergencyPhone')),
      notes: String(formData.get('notes') ?? ''),
    })
    .select('id, registration_type, status, created_at')
    .single();

  if (error) {
    console.error('Registration insert error:', error);
    return NextResponse.json({ error: 'Impossible d’enregistrer votre inscription.' }, { status: 500 });
  }

  return NextResponse.json({ registration }, { status: 201 });
}
