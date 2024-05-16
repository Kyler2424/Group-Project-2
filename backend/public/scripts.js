$(document).ready(function() {
    $('#login').click(function() {
      $('#login-form').toggle();
    });
  
    $('#login-button').click(function() {
      const username = $('#username').val();
      const password = $('#password').val();
      $.post('/api/users/login', { username, password })
        .done(function(data) {
          alert('Login successful!');
          $('#login-form').hide();
        })
        .fail(function() {
          alert('Login failed. Please check your credentials.');
        });
    });
  
    function loadJerseys() {
      $.get('/api/jerseys', function(jerseys) {
        $('#jerseys-container').empty();
        jerseys.forEach(jersey => {
          $('#jerseys-container').append(`
            <div class="jersey">
              <img src="${jersey.imageUrl}" alt="${jersey.name}">
              <h3>${jersey.name}</h3>
              <p>${jersey.description}</p>
              <p>$${jersey.price}</p>
              <button onclick="addItem('${jersey.name}', ${jersey.price})">Add to Cart</button>
            </div>
          `);
        });
      });
    }
  
    loadJerseys();
  });
  
  function addItem(name, price) {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push({ name: name, price: price });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
  
  // Cart page logic
  if (window.location.pathname.endsWith('cart.html')) {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var cartList = $('#cartItems');
    cartItems.forEach(function(item) {
      var li = $('<li>').text(item.name + ' - Price: $' + item.price);
      cartList.append(li);
    });
  
    $('#emptyCart').click(function() {
      cartItems = [];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      cartList.empty();
    });
  }
  