import fs from 'fs';
import nwbuild from 'nw-builder';

const nwManifest = {
  name: 'jumpy-guy',
  version: '1.0.0',
  main: 'index.html',
  window: {
    title: 'Jumpy Guy',
    width: 1280,
    height: 720,
    position: 'center',
    resizable: true,
    icon: 'public/icon-512.png'
  }
};

fs.writeFileSync('dist/package.json', JSON.stringify(nwManifest, null, 2));

const targets = [
  { platform: 'linux', arch: 'x64', folder: 'linux-x64' },
  { platform: 'win', arch: 'x64', folder: 'win-x64' },
];

for (const target of targets) {
  console.log(`Building NW.js desktop binary for ${target.folder}...`);
  await nwbuild({
    mode: 'build',
    flavor: 'normal',
    platform: target.platform,
    arch: target.arch,
    srcDir: 'dist',
    glob: false,
    outDir: `releases/${target.folder}`,
    cacheDir: '.nw-cache',
  });
}

console.log('Desktop builds complete! Check the releases/ folder.');
