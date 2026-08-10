export type UserRole = 'admin' | 'agent' | 'client';
export type RegistrationType = 'hajj' | 'oumra';
export type RegistrationStatus =
  | 'pending'
  | 'review'
  | 'approved'
  | 'rejected'
  | 'completed';
export type PaymentMethod =
  | 'orange_money'
  | 'moov_money'
  | 'bank_transfer'
  | 'cash';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type DocumentType =
  | 'passport'
  | 'photo'
  | 'visa'
  | 'vaccination'
  | 'other';
