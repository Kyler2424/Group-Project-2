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
            <button onclick="addItem('${jersey.name}', ${jersey.price}, '${jersey.imageUrl}')">Add to Cart</button>
          </div>
        `);
      });
    });
  }

  // Load jerseys
  loadJerseys();
});

// Function to add an item to the cart
function addItem(name, price, imageUrl) {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push({ name: name, price: price, imageUrl: imageUrl });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Display an "Added to Cart" message
    showMessage('Added to Cart');
}

// Function to show messages
function showMessage(message) {
    // Create a message element
    var messageElement = $('<div class="cart-message"></div>').text(message);

    // Append the message to the body or a specific container
    $('body').append(messageElement);

    // Style the message (optional, you can also do this in CSS)
    $('.cart-message').css({
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'green',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        zIndex: 1000
    });

    // Automatically remove the message after 2 seconds
    setTimeout(function() {
        $('.cart-message').fadeOut('slow', function() {
            $(this).remove();
        });
    }, 2000);
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

// Function to display cart items and calculate the subtotal
function displayCartItems() {
    // Retrieve cart items from local storage or initialize an empty array if none exist
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    // Select the HTML element where cart items will be displayed
    var cartList = $('#cartItems');
    // Initialize subtotal to zero
    var subtotal = 0;

    // Clear any existing items in the cart list to avoid duplication
    cartList.empty();

    // Iterate over each item in the cart
    cartItems.forEach(function(item) {
        // Create a new list item element for each cart item
        var li = $('<li></li>');
        // Append an image element for the item's image
        li.append(`<img src="${item.imageUrl}" alt="${item.name}" style="width:50px; height:auto;">`);
        // Append a text node with the item's name and price
        li.append(`${item.name} - Price: $${item.price}`);
        // Add the list item to the cart list in the DOM
        cartList.append(li);

        // Add the item's price to the subtotal
        subtotal += item.price;
    });

    // Display the calculated subtotal in the designated HTML element
    // Assuming there is an element with the ID 'subtotal' to display the subtotal value
    $('#subtotal').text(`Subtotal: $${subtotal.toFixed(2)}`);
}

// Ensure this function is called when the document is ready, particularly when the cart page is loaded
$(document).ready(function() {
    // Check if the current page is the cart page based on its pathname
    if (window.location.pathname.endsWith('cart.html')) {
        // If it's the cart page, display the cart items
        displayCartItems();
    }
});
