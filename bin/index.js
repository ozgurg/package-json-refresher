#!/usr/bin/env node
"use strict";

const fs = require("fs")
const { execSync } = require("child_process");
const rimraf = require("rimraf");
const chalk = require("chalk");
const log = console.log;

const PACKAGE_JSON_PATH = "./package.json";
const PACKAGE_JSON_BACKUP_PATH = "./.package.json.backup";

let packageJson = "";
let dependencies = "";
let devDependencies = "";


if (!isPackageJsonExists()) {
	_error(`"${PACKAGE_JSON_PATH}" does not exist.`);
}

backupPackageJson();

packageJson = readPackageJson();
if (!packageJson) {
	_error(`"${PACKAGE_JSON_PATH}" is not a valid JSON file.`);
}

dependencies = getDependencies();
devDependencies = getDevDependencies();
if (!dependencies && !devDependencies) {
	_error(`There are no "dependencies" or "devDependencies" in "${PACKAGE_JSON_PATH}".`);
}


deleteNodeModulesFolder();
deleteLockFile();

deleteDependencies();
deleteDevDependencies();

savePackageJson();

installDependencies();
installDevDependencies();

removeBackedUpPackageJson();

_success(`"${PACKAGE_JSON_PATH}" is successfully refreshed.`);


function isPackageJsonExists() {
	return fs.existsSync(PACKAGE_JSON_PATH);
}

function backupPackageJson() {
	fs.copyFileSync(PACKAGE_JSON_PATH, PACKAGE_JSON_BACKUP_PATH);

	_info(`"${PACKAGE_JSON_PATH}" is backed up.`);
}

function readPackageJson() {
	const packageJson = fs.readFileSync(PACKAGE_JSON_PATH);
	try {
		return JSON.parse(packageJson.toString());
	} catch (e) {
		return false;
	}
}

function getDependencies() {
	return packageJson["dependencies"] ? Object.keys(packageJson["dependencies"]) : false;
}

function getDevDependencies() {
	return packageJson["devDependencies"] ? Object.keys(packageJson["devDependencies"]) : false;
}

function deleteDependencies() {
	delete packageJson["dependencies"];

	if (dependencies) {
		_info(`"dependencies" deleted.`);
	}
}

function deleteDevDependencies() {
	delete packageJson["devDependencies"];

	if (devDependencies) {
		_info(`"devDependencies" deleted.`);
	}
}

function savePackageJson() {
	fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(packageJson, null, 4));

	if (dependencies || devDependencies) {
		_info(`"${PACKAGE_JSON_PATH}" updated without "dependencies" and "devDependencies"`);
	}
}

function deleteNodeModulesFolder() {
	rimraf.sync("./node_modules");

	_info(`"node_modules" deleted.`);
}

function deleteLockFile() {
	rimraf.sync("./package-lock.json");

	_info(`"package-lock.json" deleted.`);
}

function installDependencies() {
	if (dependencies) {
		_info(`Starting to install "dependencies"...`);

		execSync(`npm i ${dependencies.join(" ")} --save`);

		_info(`"dependencies" installed.`);
	}
}

function installDevDependencies() {
	if (devDependencies) {
		_info(`Starting to install "devDependencies"...`);

		execSync(`npm i ${devDependencies.join(" ")} --save-dev`);

		_info(`"devDependencies" installed.`);
	}
}

function removeBackedUpPackageJson() {
	fs.unlinkSync(PACKAGE_JSON_BACKUP_PATH);

	_info(`"${PACKAGE_JSON_BACKUP_PATH}" deleted.`);
}

function _info(message) {
	log(chalk.grey(`[INFO] ${message}`));
}

function _error(message) {
	log(chalk.red(`[ERROR] ${message}`));
	process.exit(1);
}

function _success(message) {
	log(chalk.green(`[DONE] ${message}`));
	process.exit(0);
}