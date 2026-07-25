import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { copy, ensureDir, pathExists } from "fs-extra";

// This service is responsible for copying the template files and agent files to the users claude directory. It handles the installation process, including checking for existing files and overwriting them if necessary.

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = join(__dirname, "..", "templates");

export type FileStatus = "installed" | "skipped" | "overwritten";

export interface InstallResult {
	file: string;
	status: FileStatus;
}

export interface InstallOptions {
	force?: boolean;
	cwd?: string;
}

interface TemplateEntry {
	source: string;
	target: string;
}

const TEMPLATE_MANIFEST: TemplateEntry[] = [
	{ source: "CLAUDE.md", target: "CLAUDE.md" },
	{
		source: "agents/code-reviewer.md",
		target: ".claude/agents/code-reviewer.md",
	},
	{
		source: "agents/security-reviewer.md",
		target: ".claude/agents/security-reviewer.md",
	},
	{
		source: "agents/branch-code-reviewer.md",
		target: ".claude/agents/branch-code-reviewer.md",
	},
	{
		source: "agents/branch-security-reviewer.md",
		target: ".claude/agents/branch-security-reviewer.md",
	},
	{ source: "settings/settings.json", target: ".claude/settings.json" },
];

export class InstallService {
	async install(options: InstallOptions = {}): Promise<InstallResult[]> {
		const targetRoot = options.cwd ?? process.cwd();
		const force = options.force ?? false;
		const results: InstallResult[] = [];

		for (const entry of TEMPLATE_MANIFEST) {
			const sourcePath = join(TEMPLATES_DIR, entry.source);
			const targetPath = join(targetRoot, entry.target);

			const alreadyExists = await pathExists(targetPath);

			if (alreadyExists && !force) {
				results.push({ file: entry.target, status: "skipped" });
				continue;
			}

			await ensureDir(dirname(targetPath));
			await copy(sourcePath, targetPath, { overwrite: true });

			results.push({
				file: entry.target,
				status: alreadyExists ? "overwritten" : "installed",
			});
		}

		return results;
	}
}
