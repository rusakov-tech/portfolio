import { optimize } from 'svgo';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imagesDir = './public/images';

async function processFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const statsBefore = fs.statSync(filePath).size;

    if (ext === '.svg') {
        const svgCode = fs.readFileSync(filePath, 'utf-8');

        const result = optimize(svgCode, {
            path: filePath,
            multipass: true,
            plugins: ['removeDimensions', 'removeComments', 'removeMetadata'],
        });

        const optimized = result.data;
        if (optimized.length < statsBefore) {
            fs.writeFileSync(filePath, optimized, 'utf-8');

            console.log(`✅ Optimized SVG: ${filePath} (saved ${statsBefore - optimized.length} bytes)`);
        } else {
            console.log(`⏩ Skipped SVG (already optimized): ${filePath}`);
        }
    } else if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
        const buffer = await sharp(filePath)
            .toFormat(ext === '.png' ? 'png' : 'jpeg', { quality: 80 })
            .toBuffer();

        if (buffer.length < statsBefore) {
            fs.writeFileSync(filePath, buffer);

            console.log(`✅ Compressed image: ${filePath} (saved ${statsBefore - buffer.length} bytes)`);
        } else {
            console.log(`⏩ Skipped image (already optimized): ${filePath}`);
        }
    }
}

function walkDir(dir) {
    let files = [];

    fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            files = files.concat(walkDir(fullPath));
        } else {
            files.push(fullPath);
        }
    });

    return files;
}

async function run() {
    const files = walkDir(imagesDir);

    for (const filePath of files) {
        await processFile(filePath);
    }
}

run();
