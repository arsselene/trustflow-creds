import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const projectRoot = '/vercel/share/v0-project';

try {
  console.log('Removing node_modules...');
  const nodeModulesPath = path.join(projectRoot, 'node_modules');
  if (fs.existsSync(nodeModulesPath)) {
    fs.rmSync(nodeModulesPath, { recursive: true, force: true });
  }

  console.log('Removing corrupted package-lock.json...');
  const lockFilePath = path.join(projectRoot, 'package-lock.json');
  if (fs.existsSync(lockFilePath)) {
    fs.unlinkSync(lockFilePath);
  }

  console.log('Running npm install to regenerate package-lock.json...');
  execSync('npm install', {
    cwd: projectRoot,
    stdio: 'inherit'
  });

  console.log('Dependencies rebuilt successfully!');
} catch (error) {
  console.error('Error rebuilding dependencies:', error.message);
  process.exit(1);
}
