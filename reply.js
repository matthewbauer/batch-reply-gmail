function whenNoneSelected(route) {
  return false;
}

function register(sdk) {
  function batchReply(event) {
    var contacts = [];
    for (var row in event.selectedThreadRowViews) {
      var thread = event.selectedThreadRowViews[row];
      contacts = contacts.concat(thread.getContacts());
    }

    var emails = [];
    for (var contact in contacts) {
      emails.push(contacts[contact].emailAddress);
    }

    sdk.Compose.openNewComposeView().then(function(composeView) {
      composeView.setBccRecipients(emails);
    });
  }

  sdk.Toolbars.registerToolbarButtonForList({
    title: 'Batch Reply',
    section: sdk.Toolbars.SectionNames.INBOX_STATE,
    iconUrl: '',
    onClick: batchReply,
    hasDropdown: false,
    hideFor: whenNoneSelected,
    keyboardShortcutHandle: null
  });
}

InboxSDK.load('1', 'sdk_batch-reply_7519231cdf').then(register);
