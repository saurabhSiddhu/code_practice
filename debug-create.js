#!/usr/bin/env node

const FileUtils = require('./src/utils/fileUtils');
const StringUtils = require('./src/utils/stringUtils');
const Logger = require('./src/utils/logger');

console.log('Starting debug test...');

try {
  // Test basic file creation
  const testName = 'debug-test';
  console.log('Creating solution path...');

  const solutionPath = FileUtils.getSolutionPath(testName);
  console.log('Solution path:', solutionPath);

  const solutionFilePath = FileUtils.getSolutionFilePath(testName);
  console.log('Solution file path:', solutionFilePath);

  // Test template loading
  console.log('Loading template...');
  const template = FileUtils.getTemplate('class');
  console.log('Template loaded, length:', template.length);

  // Test variable replacement
  const variables = {
    name: testName,
    title: StringUtils.toTitleCase(testName)
  };

  const content = FileUtils.replaceTemplateVariables(template, variables);
  console.log('Content generated, length:', content.length);

  // Test file writing
  console.log('Writing file...');
  FileUtils.writeFile(solutionFilePath, content);
  console.log('File written successfully!');

  // Verify file exists
  if (FileUtils.fileExists(solutionFilePath)) {
    console.log('✅ File exists and was created successfully');
  } else {
    console.log('❌ File was not created');
  }
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error('Stack:', error.stack);
}
