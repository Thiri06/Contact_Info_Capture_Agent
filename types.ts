export interface AttendeeForm {
  id?: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  location: string;
  company: string;
  jobTitle: string;
  source: 'MANUAL' | 'OCR';
  timestamp: Date;
}

export interface ExtractedField {
  value: string;
  confidence: number; // 0-100
}

export interface ExtractedAttendeeData {
  fullName: ExtractedField;
  phoneNumber: ExtractedField;
  email: ExtractedField;
  location: ExtractedField;
  company: ExtractedField;
  jobTitle: ExtractedField;
}

export enum Tab {
  MANUAL_ENTRY = 'MANUAL_ENTRY',
  OCR_CAPTURE = 'OCR_CAPTURE'
}

export enum UserRole {
  STAFF = 'STAFF',
  MANAGER = 'MANAGER'
}

export interface User {
  email: string;
  name: string;
  role: UserRole;
}

export enum SidebarItem {
  // Staff Items
  MY_EVENTS = 'MY_EVENTS',
  MY_SUBMISSIONS = 'MY_SUBMISSIONS',
  
  // Manager Items
  DASHBOARD = 'DASHBOARD',
  MANAGE_EVENTS = 'MANAGE_EVENTS',
  FORM_BUILDER = 'FORM_BUILDER',
  IMPORT_PRE_REGISTRATION = 'IMPORT_PRE_REGISTRATION',
  REVIEW_QUEUE = 'REVIEW_QUEUE',
  SUBMISSIONS_MONITOR = 'SUBMISSIONS_MONITOR',
  EXPORT_DATA = 'EXPORT_DATA',
  POST_EVENT_SUMMARY = 'POST_EVENT_SUMMARY'
}