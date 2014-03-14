$(document).ready(function () {

  var app = {
    $addRecord: $('#addRecord'),
    $saveRecord: $('#saveRecord'),
    $saveForm: $('#saveForm'),
    $city: $('#city'),
    $country: $('#country'),
    $region: $('#region'),
    $wait: $('#wait'),
    $fieldset: $('fieldset'),
    $showResults: $('#showResults'),
    $document: $(document)
  };

  app.changeSelect = function () {
    var that = this;
    this.$country.change(function () {
      that.getList('region', 'country')
    });

    this.$region.change(function () {
      that.getList('city', 'region')
    });

    this.$city.change(function () {
      that.getTable();
    });

  };

  app.save = function () {
    this.$saveForm.submit(function (e) {
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
  };

  app.getTable = function () {
    var that = this;
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
        var $tr;

        for (var i = 0; i < len; i++) {
          $tr = $('<tr><td>' + data[i].information + '</td>' +
            '<td width="90"><button class="btn btn-default showRecord" data-id="' + data[i].id_ui + '" data-text="' + data[i].information + '">view</button></td>' +
            '<td width="90"><button class="btn btn-default">change</button></td></tr>');
          $tr.appendTo($table);
        }
        $($table).appendTo('.table-responsive');

        that.$showResults.find('h3').text('Results: ' + len);
        that.$showResults.removeClass('hidden');
      }
    });
  };

  app.getList = function (type, obj) {
    var that = this;
    var hiddenStr = '#showResults, #addRecord, #saveForm';

    that.$fieldset.attr('disabled', 'disabled');
    that.$wait.toggleClass('hidden');
    that.$saveForm.find('textarea').val('');
    that.$city.html('<option>select city</option>');

    $(hiddenStr).addClass('hidden');
    $('.table-responsive').empty();

    $.post('cities.php', {type: type, id: $('#' + obj).val()}, function (data) {
      var out = document.getElementById(type);
      for (var i = out.length - 1; i >= 0; i--) {
        out.options[i] = null;
      }
      try {
        eval(data);
      }
      catch (e) {
      }

      that.$wait.toggleClass('hidden');
      that.$fieldset.removeAttr('disabled');
      that.$addRecord.removeClass('hidden');
      that.getTable();
    });
  };

  app.showRecord = function () {
    this.$document.on('click', '.showRecord', function () {
      var $viewRecordBtn = $('#viewRecordBtn');
      var target = $viewRecordBtn.data('target');
      $(target).find('.modal-body').html('');
      $(target).find('.modal-body').html($(this).data('text'));
      $viewRecordBtn.click();
    });
  };

  app.toggleHidden = function (target) {
    target.toggleClass('hidden');
  };

  app.action = function () {
    var that = this;
    that.$addRecord.click(function () {
      that.toggleHidden(that.$addRecord);
      that.toggleHidden(that.$saveForm);
    });

    that.$saveRecord.click(function () {
      that.toggleHidden(that.$addRecord);
      that.toggleHidden(that.$saveForm);
    })
  };

  app.changeSelect();
  app.save();
  app.showRecord();
  app.action();

});
