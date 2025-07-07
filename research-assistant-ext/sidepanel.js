// document.addEventListener("DOMContentLoaded", function () {
//   chrome.storage.local.get(["researchNotes"], function (result) {
//     document.getElementById("notes").value = result.researchNotes || "";
//   });
//   document.getElementById("save-btn").addEventListener("click", saveNotes);
//   document
//     .getElementById("summarize-btn")
//     .addEventListener("click", summarizeNotes);
//   document.getElementById("clear-btn").addEventListener("click", function () {
//     document.getElementById("notes").value = "";
//     document.getElementById("result").innerHTML = "";
//     chrome.storage.local.set({ researchNotes: "" }, function () {
//       alert("Notes cleared successfully!");
//     });
//   });
// });
// async function saveNotes() {
//   const notes = document.getElementById("notes").value;
//   chrome.storage.local.set({ researchNotes: notes }, function () {
//     alert("Notes saved successfully!");
//   });
// }
// async function summarizeNotes() {
//   try {
//     const [tab] = await chrome.tabs.query({
//       active: true,
//       currentWindow: true,
//     });

//     const [{ result }] = await chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       function: () => window.getSelection.toString(),
//     });
//     if (!result.trim()) {
//       alert("Please enter some notes or select text to summarize.");
//       return;
//     }
//     const response = await fetch("http://localhost:8080/api/research/process", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         content: result,
//         operation: "summarize",
//       }),
//     });
//     if (!response.ok) {
//       throw new Error("Failed to summarize notes");
//     }
//     const text = await response.text();
//     showResult(text.replace(/\n/g, "<br>"));
//   } catch (error) {
//     console.error("Error summarizing notes:", error);
//   }
// }
// function showResult(content) {
//   document.getElementById(
//     "result"
//   ).innerHTML = `<div class="result-item"><div class="result-content">${content}</div></div>`;
// }
document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get(["researchNotes"], function (result) {
    document.getElementById("notes").value = result.researchNotes || "";
  });

  document.getElementById("save-btn").addEventListener("click", saveNotes);
  document
    .getElementById("summarize-btn")
    .addEventListener("click", summarizeNotes);
  document.getElementById("clear-btn").addEventListener("click", function () {
    document.getElementById("notes").value = "";
    document.getElementById("result").innerHTML = "";
    chrome.storage.local.set({ researchNotes: "" }, function () {
      alert("Notes cleared successfully!");
    });
  });
});

async function saveNotes() {
  const notes = document.getElementById("notes").value;
  chrome.storage.local.set({ researchNotes: notes }, function () {
    alert("Notes saved successfully!");
  });
}

async function summarizeNotes() {
  try {
    const summarizeBtn = document.getElementById("summarize-btn");
    const loadingDiv = document.getElementById("loading");
    const resultDiv = document.getElementById("result");

    summarizeBtn.disabled = true;
    loadingDiv.classList.remove("hidden");
    resultDiv.innerHTML = "";

    const notes = document.getElementById("notes").value;

    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    const [{ result: selectedText }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => window.getSelection().toString(),
    });

    if (!notes.trim() && !selectedText.trim()) {
      alert("Please enter notes or select some text.");
      loadingDiv.classList.add("hidden");
      summarizeBtn.disabled = false;
      return;
    }

    const contentToSend = selectedText || notes;

    const response = await fetch("http://localhost:8080/api/research/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: contentToSend,
        operation: "summarize",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to summarize notes");
    }

    const summary = await response.text();
    loadingDiv.classList.add("hidden");
    showResult(summary);
    summarizeBtn.disabled = false;
  } catch (error) {
    console.error("Error summarizing notes:", error);
    document.getElementById("loading").classList.add("hidden");
    document.getElementById("summarize-btn").disabled = false;
  }
}

function showResult(content) {
  const resultDiv = document.getElementById("result");
  let i = 0;
  const interval = setInterval(() => {
    resultDiv.innerText = content.slice(0, i);
    i++;
    if (i > content.length) {
      clearInterval(interval);
    }
  }, 10);
}
