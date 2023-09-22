import { glob } from 'glob'
import fs from 'fs'
import path from 'path'
import { logger } from '@/src/utils/logger'

export const getFilesFromGlobs = (
  dir: string,
  globs: string[],
  ignore: string[]
): string[] => {
  let results: string[] = []

  for (const pattern of globs) {
    const options = {
      cwd: dir,
      ignore: ignore,
      absolute: true
    }

    logger.info(`🍋 Finding matches to ${pattern}...`)

    const files = glob.sync(pattern, options)
    results = results.concat(files)
  }

  return results
}


export const getAllFiles = (filePath: string, exts: string[], ignoreDirs: string[] = [], arrayOfFiles: string[] = []) => {

  if (fs.existsSync(filePath)) {
    // Check if it's a file or directory
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      return getAllFilesHelper(filePath, ['.jsx', '.tsx'], ignoreDirs);
    } else if (stat.isFile() && ['.jsx', '.tsx'].includes(path.extname(filePath))) {
      return [filePath]
    } else {
      logger.warn('File is not .jsx or .tsx');
      return []
    }
  } else {
    logger.warn('File or directory does not exist');
    return []
  }
};

const getAllFilesHelper = (dirPath: string, exts: string[], ignoreDirs: string[] = [], arrayOfFiles: string[] = []) => {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      // Check if this directory is in the ignore list
      if (!ignoreDirs.includes(file)) {
        arrayOfFiles = getAllFilesHelper(fullPath, exts, ignoreDirs, arrayOfFiles);
      }
    } else {
      const ext = path.extname(file);
      if (exts.includes(ext)) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}
