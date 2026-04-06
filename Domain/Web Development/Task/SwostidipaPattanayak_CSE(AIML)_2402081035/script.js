
// CONTACT FORM 
function sendMessage() {

    var name    = document.getElementById('name').value;
    var email   = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;

    if (name === '' || email === '' || subject === '' || message === '') {
        alert('Please fill in all fields before sending.');
        return;
    }

    var successMsg = document.getElementById('success-msg');
    successMsg.style.display = 'block';

    document.getElementById('name').value    = '';
    document.getElementById('email').value   = '';
    document.getElementById('subject').value = '';
    document.getElementById('message').value = '';
}