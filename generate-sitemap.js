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

// Categories define karne ke liye helper function
function categorizeFiles(files) {
    let cats = {
        bihar: [],
        states: [],
        yojana: [],
        amin: [],
        admin: [],
        others: []
    };

    files.forEach(file => {
        let lower = file.toLowerCase();
        if (lower.includes('bihar') || lower.includes('patna') || lower.includes('araria') || lower.includes('arwal') || lower.includes('aurangabad') || lower.includes('darbhanga')) {
            cats.bihar.push(file);
        } else if (lower.includes('up') || lower.includes('uttar') || lower.includes('mp') || lower.includes('delhi') || lower.includes('punjab') || lower.includes('jharkhand')) {
            cats.states.push(file);
        } else if (lower.includes('yojana') || lower.includes('sarkari') || lower.includes('pm') || lower.includes('scheme') || lower.includes('blog')) {
            cats.yojana.push(file);
        } else if (lower.includes('amin') || lower.includes('partner') || lower.includes('surveyor') || lower.includes('booking')) {
            cats.amin.push(file);
        } else if (lower.includes('admin') || lower.includes('login') || lower.includes('dashboard')) {
            cats.admin.push(file);
        } else {
            cats.others.push(file);
        }
    });

    return cats;
}

let categories = categorizeFiles(htmlFiles);

// 2. GENERATE Professional Category-wise sitemap.html
let htmlContent = `<!DOCTYPE html>
<html lang="hi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sitemap - JameenSeva.in</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background-color: #f4f6f9; color: #333; }
        .container { max-width: 1100px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        h1 { color: #0f766e; border-bottom: 3px solid #0f766e; padding-bottom: 12px; font-size: 26px; text-align: center; }
        .category-section { margin-top: 30px; }
        h2 { color: #1e293b; font-size: 18px; border-left: 4px solid #0f766e; padding-left: 10px; margin-bottom: 15px; background: #f8fafc; padding-top: 6px; padding-bottom: 6px; border-radius: 0 6px 6px 0; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 12px; }
        .card { background: #f9fafb; border: 1px solid #e2e8f0; padding: 12px 16px; border-radius: 8px; transition: all 0.2s ease; }
        .card:hover { border-color: #0f766e; background: #f0fdf4; transform: translateY(-2px); box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
        .card a { text-decoration: none; color: #0f766e; font-weight: 600; font-size: 14px; display: block; word-break: break-all; }
        .card a:hover { color: #15803d; }
    </style>
</head>
<body>
    <div class="container">
        <h1>JameenSeva.in - All Pages Sitemap</h1>\n`;

function renderCategory(title, filesArray) {
    if (filesArray.length === 0) return '';
    let html = `        <div class="category-section">\n`;
    html += `            <h2>${title}</h2>\n`;
    html += `            <div class="grid">\n`;
    filesArray.forEach(file => {
        let pageName = file.replace('.html', '').replace(/-/g, ' ').toUpperCase();
        html += `                <div class="card"><a href="${DOMAIN}/${file}">${pageName}</a></div>\n`;
    });
    html += `            </div>\n`;
    html += `        </div>\n`;
    return html;
}

htmlContent += renderCategory("📍 Bihar Land Records & Services", categories.bihar);
htmlContent += renderCategory("🌍 Other States & Regional Services", categories.states);
htmlContent += renderCategory("📜 Sarkari Yojana & Blogs", categories.yojana);
htmlContent += renderCategory("👷 Amin & Partner Program", categories.amin);
htmlContent += renderCategory("⚙️ Admin Panel & Authentication", categories.admin);
htmlContent += renderCategory("📂 Other Useful Pages", categories.others);

htmlContent += `    </div>
</body>
</html>`;

fs.writeFileSync('sitemap.html', htmlContent);
console.log('Category-wise sitemap updated successfully!');
