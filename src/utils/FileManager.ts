import * as fs from 'node:fs';
import * as path from 'path';

export async function clearPath(targetPath: string): Promise<void> {
    try {
        const entries = await fs.promises.readdir(targetPath, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(targetPath, entry.name);

            if (entry.isDirectory()) {
              await clearPath(fullPath);
              await fs.promises.rmdir(fullPath);
            } else {
              await fs.promises.unlink(fullPath);
            }
          }
    } catch (error) {
        console.log(`[ERROR] PATH NOT CLEARED ${error}`)
    }
}

export async function saveFile(fileName: string, fileContent: string, filePath: string = './'): Promise<void> {
	try {
		await fs.promises.mkdir(filePath, { recursive: true });
		await fs.writeFile(`${filePath}${fileName}`, fileContent, err => {
			if (err) {
				console.error(err);
			}
		});
	} catch (error) {
		console.log(`[ERROR] FILE NOT SAVED: ${error}`);
	}
}
