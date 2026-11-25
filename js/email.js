// Sends the contact form to the Netlify function, which emails it through Resend.
const form = document.getElementById('contactForm');
const alertBox = form.querySelector('.alert');
const button = form.querySelector('button[type="submit"]');
const isFr = document.documentElement.lang === 'fr';

const MESSAGES = {
  sent: isFr ? 'Votre message a bien été envoyé' : 'Your message has been sent',
  error: isFr
    ? "Le message n'a pas pu être envoyé, réessayez ou écrivez-moi par e-mail."
    : 'Your message could not be sent, please try again or email me directly.',
};

function showAlert(text) {
  alertBox.textContent = text;
  alertBox.style.display = 'grid';
  setTimeout(() => {
    alertBox.style.display = 'none';
  }, 4000);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  button.disabled = true;

  const payload = {
    name: form.querySelector('#name').value,
    email: form.querySelector('#email').value,
    message: form.querySelector('#message').value,
    website: form.querySelector('#website').value,
  };

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    showAlert(MESSAGES.sent);
    form.reset();
  } catch (err) {
    console.error(err);
    showAlert(MESSAGES.error);
  } finally {
    button.disabled = false;
  }
});
