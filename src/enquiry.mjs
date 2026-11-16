// Client-side bounds protect the WhatsApp handoff; this is not a server trust boundary.
export const FIELD_LIMITS = Object.freeze({ name: 100, company: 150, phone: 40, service: 80, location: 200, message: 1500 });
const clean = (value, limit) => String(value ?? '')
  .replace(/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/g, ' ')
  .trim().slice(0, limit);
export function buildEnquiryMessage(formData) {
  const fields = [['name', 'Name'], ['company', 'Company'], ['phone', 'Phone / WhatsApp'], ['service', 'Service'], ['location', 'Project location'], ['message', 'Workforce requirement']];
  return 'Hello Pak Arab Manpower Supply LLC,\n\n' + fields.map(([key, label]) => `${label}: ${clean(formData.get(key), FIELD_LIMITS[key])}`).join('\n');
}
