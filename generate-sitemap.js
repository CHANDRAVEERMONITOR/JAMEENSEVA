const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://jameenseva.in';
const files = fs.readdirSync('.');

// Sirf HTML files ko filter karein
const htmlFiles = files.filter(file => file.endsWith('.html'));

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
console.log('Sitemap.xml updated successfully with ' + htmlFiles.length + ' pages!');
