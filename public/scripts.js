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
        customAlert('Login successful!');
        // Hide the login form
        $('#login-form').hide();
      })
      .fail(function() {
        // Show an alert if the login fails
        customAlert('Login failed. Please check your credentials.');
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
            <button onclick="addItem('${jersey.name}', ${jersey.price}, '${jersey.imageUrl}', this)">Add to Cart</button>
          </div>
        `);
      });
    });
  }

  // Load jerseys
  loadJerseys();

  // Form submission handler for user registration
  $('#register-form').submit(function(e) {
    e.preventDefault();
    const username = $('#register-username').val();
    const password = $('#register-password').val();

    $.ajax({
      url: '/api/users/register',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ username, password }),
      success: function(response) {
        alert('User registered successfully. User ID: ' + response.id);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert('Failed to register user. Error: ' + textStatus + ' ' + errorThrown);
      }
    });
  });
});

// Function to add an item to the cart
function addItem(name, price, imageUrl, buttonElement) {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push({ name: name, price: price, imageUrl: imageUrl });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems();  // Update display after adding an item

    // Display an "Added to Cart" message
    showMessage('Added to Cart', buttonElement);
}

// Function to show messages
function showMessage(message, element) {
    var originalText = $(element).text();
    $(element).text(message).css({
        background: 'green',
        color: 'white'
    });
    setTimeout(function() {
        $(element).text(originalText).attr('style', '');
    }, 1000); // Duration of message display in milliseconds
}

// Check if the current page is the cart page
if (window.location.pathname.endsWith('cart.html')) {
  // Retrieve cart items from local storage or initialize an empty array
  var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  // Get the cart list element from the DOM
  var cartList = $('#cartItems');
  // Loop through the cart items and create list items for each
  cartItems.forEach(function(item) {
    var li = $('<li></li>');
    li.append(`<img src="${item.imageUrl}" alt="${item.name}" style="width:50px; height:auto;">`); // Display image
    li.append(`${item.name} - Price: $${item.price}`);
    li.append(`<button onclick="deleteItem(${cartItems.indexOf(item)})">Delete</button>`);
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
    // Update the subtotal display
    $('#subtotal').text('Subtotal: $0.00');
  });
}

// Function to display cart items and calculate the subtotal
function displayCartItems() {
    if (window.location.pathname.endsWith('cart.html')) {
        var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        var cartList = $('#cartItems');
        var subtotal = 0;

        cartList.empty();

        cartItems.forEach(function(item) {
            var li = $('<li></li>');
            li.append(`<img src="${item.imageUrl}" alt="${item.name}" style="width:50px; height:auto;">`);
            li.append(`${item.name} - Price: $${item.price}`);
            li.append(`<button onclick="deleteItem(${cartItems.indexOf(item)})">Delete</button>`);
            cartList.append(li);

            subtotal += item.price;
        });

        $('#subtotal').text(`Subtotal: $${subtotal.toFixed(2)}`);
    }
}

// Function to delete an item from the cart
function deleteItem(index) {
    var cartItems = JSON.parse(localStorage.getItem('cartItems'));
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems();  // Ensure this is called here
}

// Ensure this function is called when the document is ready, particularly when the cart page is loaded
$(document).ready(function() {
    // Check if the current page is the cart page based on its pathname
    if (window.location.pathname.endsWith('cart.html')) {
        // If it's the cart page, display the cart items
        displayCartItems();
    }
});

// Function to show custom alerts
function customAlert(message) {
    let alertBox = $('<div class="custom-alert"></div>').text(message);
    $('body').append(alertBox);
    alertBox.css({
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'rgba(0, 102, 182, 0.9)',
        color: 'white',
        padding: '15px',
        borderRadius: '5px',
        zIndex: 10000
    });
    setTimeout(function() {
        alertBox.fadeOut('slow', function() { alertBox.remove(); });
    }, 3000); // Duration of message display in milliseconds
}
