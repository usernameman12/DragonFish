function formatDate() {
    const now = new Date();
    return now.toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  }

  function saveHistory(domain) {
    const entry = {
      url: `https://${domain}`,
      timestamp: formatDate()
    };
    let history = JSON.parse(localStorage.getItem("red_history") || "[]");
    history.unshift(entry);
    localStorage.setItem("red_history", JSON.stringify(history));
    renderHistory();
  }

  function renderHistory() {
    const history = JSON.parse(localStorage.getItem("red_history") || "[]");
    const list = document.getElementById("historyList");
    list.innerHTML = "";

    history.forEach(item => {
      const row = document.createElement("div");
      row.className = "history-item"; // update to fix history bugs (history was redirecting to the main url. istead of the proxied one)
      row.innerHTML = `
        <a class="history-url" href="../static/iframe.html#${item.url}" target="_blank">${item.url}</a>
        <span class="timestamp">${item.timestamp}</span>
      `;
      list.appendChild(row);
    });
  }

  function launch() {
const input = document.getElementById("urlInput");
const domain = input.value.trim();
if (!domain) return alert("Please enter a valid domain.");

const formattedUrl = `../static/iframe.html#https://${domain}`;
document.getElementById("loader").style.display = "block";

setTimeout(() => {
  const newTab = window.open("about:blank");
  const iframeHtml = `
    <html>
      <head>
        <title>Loading...</title>
        <style>
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
            background: black;
          }
          iframe {
            border: none;
            width: 100%;
            height: 100%;
          }
        </style>
      </head>
      <body>
        <iframe src="${formattedUrl}" allowfullscreen></iframe>
      </body>
    </html>
  `;

  newTab.document.write(iframeHtml);
  newTab.document.close();

  saveHistory(domain);
  document.getElementById("loader").style.display = "none";
  input.value = "";
}, 1000); // simulated delay for coolness
}

  renderHistory();