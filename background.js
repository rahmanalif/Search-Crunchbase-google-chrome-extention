chrome.commands.onCommand.addListener((command) => {
  if (command === "search_with_crunchbase") {
    // Execute a script in the active tab to get the selected text
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          function: getSelectedText
        },
        (results) => {
          if (results[0].result) {
            const searchQuery = `${results[0].result} crunchbase`;
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
            chrome.tabs.create({ url: searchUrl });
          }
        }
      );
    });
  }
});

// Function to get the selected text
function getSelectedText() {
  return window.getSelection().toString().trim();
}
