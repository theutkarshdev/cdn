$(document).ready(function () {
  console.log('My CDN working...');
  var startValidate = $('[startValidate]');
  var nameFlag = false;
  emailFlag = false;
  phoneFlag = false;
  function validateInput(input, regex, errorMessage) {
    if (regex.test(input.val())) {
      input.css('border', '0').prev('.input-error').remove();
      var flag = true;
    } else {
      input.css('border', '1.5px solid #FF6666').prev('.input-error').remove();
      if (input.val() !== '') {
        input.before('<p class="input-error">' + errorMessage + '</p>');
      } else {
        input.before('<p class="input-error">*Required</p>');
      }
      var flag = false;
    }
    return flag;
  }

  function validateName() {
    var nameInput = $('[validate=name]');
    var regex = /^[a-zA-Z\s]+$/;
    validateInput(nameInput, regex, '*Invalid Name');
    nameFlag = validateInput(nameInput, regex, '*Invalid Name');
  }

  function validateEmail() {
    var emailInput = $('[validate=email]');
    var regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    validateInput(emailInput, regex, '*Invalid Email');
    emailFlag = validateInput(emailInput, regex, '*Invalid Email');
  }

  function validatePhone() {
    var phoneInput = $('[validate=phone]');
    var regex = /^\d{10}$/;
    validateInput(phoneInput, regex, '*Invalid Phone');
    phoneFlag = validateInput(phoneInput, regex, '*Invalid Phone');
  }

  startValidate.click(function (event) {
    event.preventDefault();
    var currentForm = $(this).closest('form');
    currentForm.find('[validate]').each(function () {
      var input = $(this);
      //console.log(input.attr('validate') + '=' + input.val());

      if (input.val() === '') {
        input
          .css('border', '1.5px solid #FF6666')
          .prev('.input-error')
          .remove();
        input.before('<p class="input-error">*Required</p>');
      } else {
        input.css('border', '0').prev('.input-error').remove();
        validateEmail();
        validateName();
        validatePhone();
      }
    });

    if (nameFlag && emailFlag && phoneFlag) {
      currentForm[0].reset();
      return true;
    } else {
      return false;
    }
  });

  var phoneInput = $('[validate=phone]');
  phoneInput
    .on('input', function () {
      var input = $(this).val();
      var numericInput = input.replace(/\D/g, ''); // Remove non-numeric characters

      if (numericInput.length > 10) {
        numericInput = numericInput.slice(0, 10); // Limit to 10 digits
      }

      $(this).val(numericInput);
    })
    .on('keypress', function (event) {
      if ($(this).val().length >= 10) {
        event.preventDefault();
      }
    });
});
