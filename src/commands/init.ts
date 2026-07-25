import chalk from "chalk";
import type { Command } from "commander";
import {
	type InstallResult,
	InstallService,
} from "../services/InstallService.js";

export function registerInitCommands(program: Command) {
	program
		.command("init")
		.description("Initialize Claude agents in the current project")
		.option("-f, --force", "overwrite existing agent files", false)
		.action(async (opts: { force: boolean }) => {
			const installService = new InstallService();
			const results = await installService.install({ force: opts.force });
			printResults(results);
		});
}

function printResults(results: InstallResult[]): void {
	const icons: Record<FileStatusKey, string> = {
		installed: chalk.green("+"),
		overwritten: chalk.yellow("~"),
		skipped: chalk.gray("="),
	};

	for (const { file, status } of results) {
		console.log(`  ${icons[status]} ${file} ${chalk.dim(`(${status})`)}`);
	}

	const skipped = results.filter((r) => r.status === "skipped");
	if (skipped.length > 0) {
		console.log(
			chalk.dim(
				`\n${skipped.length} file(s) already existed and were kept. Use --force to overwrite.`,
			),
		);
	}
}

type FileStatusKey = InstallResult["status"];
