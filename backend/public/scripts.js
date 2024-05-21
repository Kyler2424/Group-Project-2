// Wait for the document to be ready
$(document).ready(function() {
  // Toggle the visibility of the login form when the login button is clicked
  $('#login').click(function() {
    $('#login-form').toggle();
  });

  // Handle the login button click event
  $('#login-button').click(function() {
    // Get the username and password from the input fields
    const username = $('#username').val();
    const password = $('#password').val();
    // Send a POST request to the server to log in the user
    $.post('/api/users/login', { username, password })
      .done(function(data) {
        // Show an alert if the login is successful
        alert('Login successful!');
        // Hide the login form
        $('#login-form').hide();
      })
      .fail(function() {
        // Show an alert if the login fails
        alert('Login failed. Please check your credentials.');
      });
  });

  // Function to load jerseys from the server and display them on the page
  function loadJerseys() {
    $.get('/api/jerseys', function(jerseys) {
      // Clear the jersey container before adding new jerseys
      $('#jerseys-container').empty();
      // Iterate over the jerseys and create HTML elements for each jersey
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

  // Load jerseys when the page is ready
  loadJerseys();
});

// Function to add an item to the cart
function addItem(name, price) {
  // Retrieve cart items from local storage or initialize an empty array
  var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  // Add the new item to the cart
  cartItems.push({ name: name, price: price });
  // Store the updated cart back into local storage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Check if the current page is the cart page
if (window.location.pathname.endsWith('cart.html')) {
  // Retrieve cart items from local storage or initialize an empty array
  var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  // Get the cart list element from the DOM
  var cartList = $('#cartItems');
  // Loop through the cart items and create list items for each
  cartItems.forEach(function(item) {
    var li = $('<li>').text(item.name + ' - Price: $' + item.price);
    // Append the list item to the cart list
    cartList.append(li);
  });

  // Handle the empty cart button click event
  $('#emptyCart').click(function() {
    // Clear the cart items array
    cartItems = [];
    // Update the cart items in local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // Remove all child nodes from the cart list
    cartList.empty();
  });
}
