document.addEventListener('DOMContentLoaded', function () {
  document
    .getElementById('contactForm')
    .addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('name').value;
      var email = document.getElementById('email').value;
      var message = document.getElementById('message').value;

      // Create JSON object with data to send
      var data = {
        sender: {
          name: 'Tuss',
          email: 'noreply@tristan-berger.com',
        },
        to: [{ email: 'tristan.berger6@gmail.com', name: 'Tuss' }], // Replace with actual recipient email and name
        subject: 'Message from ' + name,
        textContent: 'Email: ' + email + '\n\nMessage: ' + message,
      };

      const data = JSON.stringify(undefined);

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true; // Set credentials mode to include cookies

      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
          console.log(this.responseText);
        }
      });

      xhr.open('POST', 'https://api.brevo.com/v3/smtp/email');
      xhr.setRequestHeader('accept', 'application/json');
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('api-key', '');

      xhr.send(JSON.stringify(data)); // Send JSON data as payload
    });
});
