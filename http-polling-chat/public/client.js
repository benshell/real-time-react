$(document).ready(function () {

    // Populate the message list DOM element with the messages stored in the array passed in.
    var populateMessageList = function (messages) {

        // Cache the jQuery selection result.
        var $messageList = $('#message-list');

        // Populate the message list.
        $messageList.empty();
        $.each(messages, function (index, message) {
            $messageList.append('<li class="message">' + message + '</li>');
        });

        // Scroll to bottom of element.
        $messageList.scrollTop($messageList.prop('scrollHeight'));
    };

    // Retrieve all the messages from the server and populate the message list DOM element with them.
    var refreshMessageList = function () {

        // Submit a GET request.
        $.ajax({
            type: 'GET',
            url: '/messages',
            success: function (messages) {
                console.log('Retrieved all messages from server: ', messages);

                // Populate the message list with the retrieved messages.
                populateMessageList(messages);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('Failed to retrieve all messages from server.', textStatus, errorThrown);
            }
        });

    };

    // Handle the `submit` event dispatched by the form.
    var handleFormSubmission = function (event) {

        // Cache the jQuery selection result.
        var $messageInput = $('#message-input');

        // Construct a payload using the message input value.
        var payload = JSON.stringify({
            message: $messageInput.val()
        });

        // Submit a POST request containing the payload.
        $.ajax({
            type: 'POST',
            url: '/messages/create',
            contentType: 'application/json',
            data: payload,
            success: function (messages) {
                console.log('Sent payload to server: ', payload)
                console.log('Retrieved all messages from server: ', messages);

                // Populate the message list with the retrieved messages.
                populateMessageList(messages);

                // Clear the message input and focus on it.
                $messageInput.val('').focus();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('Failed to send payload and/or retrieve all messages from server.', textStatus, errorThrown);
            }
        });

        // Prevent the default handling of the event from occurring.
        event.preventDefault();
    };

    // Associate the form submission event handler with the form's `submit` event.
    $('#message-form').on('submit', handleFormSubmission);

    // Refresh the message list immediately.
    refreshMessageList();

    // Refresh the message list every few seconds.
    window.setInterval(refreshMessageList, 10000);

});