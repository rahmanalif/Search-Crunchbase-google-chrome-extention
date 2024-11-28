document.addEventListener("keydown", (event) => {
    if (event.altKey && event.key === "s") {
      const selectedText = window.getSelection().toString().trim();
      if (selectedText) {
        // Send the selected text to the background script
        chrome.runtime.sendMessage({ text: selectedText });
      }
    }
  });
  