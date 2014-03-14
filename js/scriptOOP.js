$(document).ready(function () {

  $('#addRecord, #saveRecord').click(function () {
    $('#saveForm, #addRecord').toggleClass('hidden');
  });

  $('#saveForm').submit(function (e) {
    e.preventDefault();

    $.ajax({
      type: 'post',
      url: 'php/save_information.php',
      data: {
        id: Number($('#city').find(':selected').val()) || Number($('#region').find(':selected').val()) || Number($('#country').find(':selected').val()),
        information: $(this).find('textarea').val()
      },
      success: function (data) {
        if (data === 'inserted') {
          $(this).find('textarea').val('');
        }
      }
    });

  });

  $('#city').change(function () {
    getTable();
  });

  $(document).on('click', '.showRecord', function () {
    var $viewRecordBtn = $('#viewRecordBtn');
    var target = $viewRecordBtn.data('target');
    $(target).find('.modal-body').html('');
    $(target).find('.modal-body').html($(this).data('text'));
    $viewRecordBtn.click();
  });

  $('#country').change(function () {
    getList('region', 'country')
  });
  $('#region').change(function () {
    getList('city', 'region')
  });


  function getTable() {
    $.ajax({
      type: 'post',
      url: 'php/get_information.php',
      data: {
        id: $('#city').find(':selected').val() || $('#' + obj).val()
      },
      success: function (json) {
        var data = JSON.parse(json);
        var $table = $('<table>', {'class': 'table table-hover'});
        var len = data.length;
        var $showResults = $('#showResults');
        var $tr;

        for (var i = 0; i < len; i++) {
          $tr = $('<tr><td>' + data[i].information + '</td>' +
            '<td width="90"><button class="btn btn-default showRecord" data-id="' + data[i].id_ui + '" data-text="' + data[i].information + '">view</button></td>' +
            '<td width="90"><button class="btn btn-default">change</button></td></tr>');
          $tr.appendTo($table);
        }
        $($table).appendTo('.table-responsive');

        $showResults.find('h3').text('Results: ' + len);
        $showResults.removeClass('hidden');
      }
    });
  }

  function getList(type, obj) {
    var hiddenStr = '#showResults, #addRecord, #saveForm';
    $('fieldset').attr('disabled', 'disabled');
    $('#wait').toggleClass('hidden');
    $(hiddenStr).addClass('hidden');
    $('.table-responsive').empty();
    $('#saveForm').find('textarea').val('');
    $('#city').html('<option>select city</option>');

    $.post('cities.php', {type: type, id: $('#' + obj).val()}, onAjaxSuccess);

    function onAjaxSuccess(data) {
      var out = document.getElementById(type);
      for (var i = out.length - 1; i >= 0; i--) {
        out.options[i] = null;
      }
      try {
        eval(data);
      }
      catch (e) {
      }

      $('#wait').toggleClass('hidden');
      $('fieldset').removeAttr('disabled');
      $('#addRecord').removeClass('hidden');

      getTable();
    }
  }

});
