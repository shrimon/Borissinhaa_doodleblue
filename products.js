
    $(function() {
      var aa = null;
      var resize_canvas = function() {
        $('#main-canvas').width($('#canvas-div').width());
      }
      resize_canvas();
      $(window).resize(resize_canvas);
      var update_pivot_select = function() {
        var algo = $('#sort-select').val();
        var pivot_algo = sorting.is_pivot_algo(algo);
        $('#pivot-select').prop('disabled', !pivot_algo);
        $('#pivot-select-div').toggleClass('hidden', !pivot_algo);
      }
      update_pivot_select();
      $('#sort-select').change(update_pivot_select);

      $('#sort-btn').click(function() {
        if (aa !== null) aa.cancel();

        var n = parseInt($('#array-size').val());
        var interval = parseInt($('#interval').val());
        var algo = $('#algo-select').val();
        var pivot_type = $('#pivot-select').val();
        var sort_fn = sorting.get_sort_fn(algo, pivot_type);

        if (algo === 'bitonic_mergesort') {
          var n2 = 1;
          while (n2 < n) n2 *= 2;
          $('#array-size').val(n2);
          n = n2;
        }

        var ary = [];
        for (var i = 0; i < n; i++) {
          ary.push(Math.random() - 0.5);
        }
        var init = $('#init-select').val();
        if (init === 'sorted') {
          ary.sort(function(a, b) { return a - b; });
        } else if (init === 'reversed') {
          ary.sort(function(a, b) {return b - a; });
        }

        var canvas = document.getElementById('main-canvas');
        aa = new sorting.AnimatedArray(ary, canvas, interval);
        sort_fn(aa);
      });
    });