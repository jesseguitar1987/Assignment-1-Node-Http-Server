/*server.js optimized to minimize duplication with a clean control flow
 while still keping it readable*/

"use strict";

//Built-in dependencies based on the assigment requirements
const http = require("http");
const os = require("os");
const { URL } = require("url");

//Many hosts, such as Render, require biding to 0.0.0.0 so it's set as a constant
const BINDING_ADDRESS = "0.0.0.0"; 

//Uses Number() in case string conversion is needed
const BINDING_PORT = Number(process.env.PORT) || 3000;


function htmlDocument(documentTitle, innerHtml) {
    return `<!doctype html>
    <html lang="en">
    <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${documentTitle}</title>
    <style>
    /*Basic styling*/
    body { font-family: system-ui, sans-serif; line-height: 1.6; padding: 22px;}
    code {background: #dedede; border-radius: 8px; padding: 3px 7px;}
    </style>
    </head>
    <body>
    ${innerHtml}
    </body>
    </html>
    `;
}

    const server = http.createServer((req, res) => {

    // Has full url
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname;
    const name = url.searchParams.get("name");

    // Gets current date
    const dateNow = new Date().toLocaleString();

    // Basic routing
    if (path === "/") {
        const hello = name ? `Hi, ${name}!` : "Hello from Node.js!";
        const htmlBody = `
        <h1>${hello}</h1>
        <h2>Current date/time: ${dateNow}</h2>
        <p>Try: <code>/?name=Jesse</code></p>
        <p>Try other routes: <code>/about</code>, <code>/time</code></p>
        `;
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8"});
        return res.end(htmlDocument("home", htmlBody));
    }

    // Routing for about page
    if (path === "/about") {
        const htmlBody = `
        <h1>About</h1>
        <h2>Hostname: ${os.hostname()}</h2>
        <p>System uptime (seconds): ${os.uptime()}</p>
        <p><a href="/">Go back home</a></p>
        `;
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8"});
        return res.end(htmlDocument("About", htmlBody));
    }

    // Routing for time page
    if (path === "/time") {
        const htmlBody = `
        <h1>Time</h1>
        <h2>Current date/time: ${dateNow}</h2>
        <p><a href="/">Go back home</a></p>
        `;
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8"});
        return res.end(htmlDocument("Time", htmlBody));
    }

    // Returns 404 error if user enters a path not listed
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    return res.end(
        htmlDocument(
            "Page Not Found",
            `<h1>404 - Page Not Found</h1><p>No route for <code>${path}</code></p><p><a href="/">Back home</a></p>`
        )
    );
});

//Server listens on port and address defined at top
server.listen(BINDING_PORT, BINDING_ADDRESS, () => {
 console.log(`Server running at http://${BINDING_ADDRESS}:${BINDING_PORT}`);
});











































