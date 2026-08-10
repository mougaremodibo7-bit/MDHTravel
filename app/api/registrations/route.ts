import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const allowedTypes = new Set(['hajj', 'oumra']);
const allowedMimeTypes = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
]);
const maxFileSize = 25 * 1024 * 1024;
const requiredFields = [
  'firstName', 'lastName', 'birthDate', 'birthPlace', 'nationality', 'phone',
  'passportNumber', 'passportExpiry', 'emergencyName', 'emergencyPhone',
];

function getFile(formData: FormData, name: string) {
  const value = formData.get(name);
  return value instanceof File && value.size > 0 ? value : null;
}

function getExtension(file: File) {
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (extension && /^[a-z0-9]+$/.test(extension)) return extension;
  if (file.type === 'application/pdf') return 'pdf';
  if (file.type === 'image/png') return 'png';
  if (file.type === 'image/webp') return 'webp';
  return 'jpg';
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Vous devez être connecté pour envoyer une inscription.' }, { status: 401 });
  }

  const formData = await request.formData();
  const registrationType = String(formData.get('registrationType') ?? '');

  if (!allowedTypes.has(registrationType)) {
    return NextResponse.json({ error: 'Type d’inscription invalide.' }, { status: 400 });
  }

  for (const field of requiredFields) {
    if (!String(formData.get(field) ?? '').trim()) {
      return NextResponse.json({ error: `Le champ ${field} est obligatoire.` }, { status: 400 });
    }
  }

  const passportFile = getFile(formData, 'passportFile');
  const photoFile = getFile(formData, 'photoFile');
  const otherDocuments = formData
    .getAll('otherDocuments')
    .filter((value): value is File => value instanceof File && value.size > 0);

  if (!passportFile || !photoFile) {
    return NextResponse.json({ error: 'Le passeport et la photo sont obligatoires.' }, { status: 400 });
  }

  const files: Array<{ file: File; documentType: 'passport' | 'photo' | 'other' }> = [
    { file: passportFile, documentType: 'passport' },
    { file: photoFile, documentType: 'photo' },
    ...otherDocuments.map((file) => ({ file, documentType: 'other' as const })),
  ];

  for (const { file } of files) {
    if (!allowedMimeTypes.has(file.type)) {
      return NextResponse.json({ error: `Type de fichier non autorisé : ${file.name}` }, { status: 400 });
    }
    if (file.size > maxFileSize) {
      return NextResponse.json({ error: `Le fichier ${file.name} dépasse 25 Mo.` }, { status: 400 });
    }
  }

  const { data: registration, error: registrationError } = await supabase
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

  if (registrationError || !registration) {
    console.error('Registration insert error:', registrationError);
    return NextResponse.json({ error: 'Impossible d’enregistrer votre inscription.' }, { status: 500 });
  }

  const uploadedPaths: string[] = [];
  const documentIds: string[] = [];

  try {
    for (const [index, item] of files.entries()) {
      const safeName = item.file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
      const path = `${user.id}/${registration.id}/${item.documentType}-${index}-${crypto.randomUUID()}.${getExtension(item.file)}`;

      const { error: uploadError } = await supabase.storage
        .from('registration-documents')
        .upload(path, item.file, {
          contentType: item.file.type,
          upsert: false,
        });

      if (uploadError) throw uploadError;
      uploadedPaths.push(path);

      const { data: document, error: documentError } = await supabase
        .from('registration_documents')
        .insert({
          registration_id: registration.id,
          document_type: item.documentType,
          file_name: safeName,
          storage_path: path,
          mime_type: item.file.type,
          file_size: item.file.size,
        })
        .select('id')
        .single();

      if (documentError || !document) {
        throw documentError ?? new Error('Impossible d’enregistrer les métadonnées du document.');
      }

      documentIds.push(document.id);
    }
  } catch (error) {
    console.error('Document upload error:', error);
    await supabase.storage.from('registration-documents').remove(uploadedPaths);
    await supabase.from('registration_documents').delete().eq('registration_id', registration.id);
    await supabase.from('registrations').delete().eq('id', registration.id).eq('user_id', user.id);

    return NextResponse.json(
      { error: 'Impossible d’envoyer les documents. Votre inscription n’a pas été conservée.' },
      { status: 500 },
    );
  }

  return NextResponse.json({
    registration,
    documents: documentIds,
  }, { status: 201 });
}
