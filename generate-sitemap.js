const fs = require('fs');

const DOMAIN = 'https://jameenseva.in';
const files = fs.readdirSync('.');

// Sirf HTML files ko filter karein (sitemap.html ko chhod kar)
const htmlFiles = files.filter(file => file.endsWith('.html') && file !== 'sitemap.html');

// 1. GENERATE sitemap.xml
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

htmlFiles.forEach(file => {
    xml += '  <url>\n';
    xml += `    <loc>${DOMAIN}/${file}</loc>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '  </url>\n';
});

xml += '</urlset>';
fs.writeFileSync('sitemap.xml', xml);

// 2. GENERATE sitemap.html
let htmlContent = `<!DOCTYPE html>
<html lang="hi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sitemap - JameenSeva.in</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background-color: #f9fafb; color: #111827; }
        h1 { color: #0f766e; }
        ul { list-style-type: none; padding: 0; }
        li { margin: 8px 0; background: white; padding: 10px 15px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        a { text-decoration: none; color: #0f766e; font-weight: bold; }
        a:hover { text-decoration: underline; color: #15803d; }
    </style>
</head>
<body>
    <h1>JameenSeva.in All Pages Sitemap</h1>
    <ul>\n`;

htmlFiles.forEach(file => {
    let pageName = file.replace('.html', '').toUpperCase();
    htmlContent += `        <li><a href="${DOMAIN}/${file}">${pageName} (${file})</a></li>\n`;
});

htmlContent += `    </ul>
</body>
</html>`;

fs.writeFileSync('sitemap.html', htmlContent);

console.log('Both sitemap.xml and sitemap.html updated successfully!');
