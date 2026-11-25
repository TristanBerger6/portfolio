# Readme

https://tristan-berger.com

## Contact form

The form posts to `/api/contact`, a Netlify function (`netlify/functions/contact.mjs`) that sends the message through [Resend](https://resend.com).

Set these environment variables in Netlify (Site configuration → Environment variables):

| Variable | Example |
| --- | --- |
| `RESEND_API_KEY` | `re_...` (Resend → API Keys) |
| `CONTACT_TO` | the inbox that receives messages |
| `CONTACT_FROM` | `Portfolio <contact@tristan-berger.com>` (domain must be verified in Resend) |
