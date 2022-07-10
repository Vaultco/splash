//showError
  function showError(input,message){
    const formGroup = input.parent();
    formGroup.addClass('error');
    const small = formGroup.find('small');
    small.html(message);
  }

  //showSuccess
  function showSuccess(input){
    const formGroup = input.parent();
    formGroup.removeClass('error');
    formGroup.addClass('success');
    const small = formGroup.find('small');
    small.html('');
  }

  //valid email
  function isValidEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  //valid name 
  function isValidName(name){
    const re = /^[a-zA-Z.: ]+$/;
    return re.test(name);
  }

  // submit button clicked
  $(document).on('click','#contactForm',function(e){
    e.preventDefault();
    var value = true;
    var name = $('#name');
    var email = $('#email');
    var container =  $("input[name='cs']:checked").val();
    var condition =  $("input[name='cc']:checked").val();
    //container
    if(container){
      $('.radio_button_container_error').removeClass('error-vis');
    }else{
      $('.radio_button_container_error').addClass('error-vis');
      $('.radio_button_container_error').text('Select Container Size');
      value = false;
    }
    //condition
    if(condition){
      $('.radio_button_condition_error').removeClass('error-vis');
    }else{
      $('.radio_button_condition_error').addClass('error-vis');
      $('.radio_button_condition_error').text('Select Condition');
      value = false;
    }
  
    // check validation
    if($.trim(name.val()) === ''){
      showError(name,'Your Name is Required!');
      value = false;
    }else if(!isValidName(name.val())){
      showError(name,'Your Name is Not Valid!');
      value = false;
    }else if($.trim(name.val()).length < 3 ){
      showError(name,'Your Name Must be At least 3 Character!');
      value = false;
    }else{
      showSuccess(name);
    }
    //email
    if($.trim(email.val()) === ''){
      showError(email,'Your Email is Required!');
      value = false;

    }else if(!isValidEmail(email.val())){
      showError(email,'Your Email is Not Valid!');
      value = false;
    }else{
      showSuccess(email);
    }
  
    //submit
    if(value === true){
      var name = $('#name').val();
      var email = $('#email').val();
      var container =  $("input[name='cs']:checked").val();
      var condition =  $("input[name='cc']:checked").val();

      $.ajax({
        method:"POST",
        data:{name:name, email:email, container:container, condition:condition,},
        url:"mail.php",
        beforeSend: function() {
          $("#submit-btn").hide();
          $("#submiting-btn").show();
        },
        success:function(feedback,status){
          // console.log(feedback);
          // console.log(status);
          if(feedback == 200){
            $('#name').val('');
            $('#email').val('');
            //success message
            $('.form-message').text('Your Message Send Successfully!');
            $('.form-message').removeClass('sendError');
            $('.form-message').addClass('sendsuccess');
            
          }else{
            //error message
            $('.form-message').text('Error! while Processing...');
            $('.form-message').removeClass('sendsuccess');
            $('.form-message').addClass('sendError');
          }
          $(".for-error").removeClass('success');
          $("#submit-btn").show();
          $("#submiting-btn").hide();
        }
      });
    } 
  });