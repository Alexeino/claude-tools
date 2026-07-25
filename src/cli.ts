#!/usr/bin/env node

import { Command } from "commander";
import { registerInitCommands } from "./commands/init.js";

const program = new Command();

program
	.name("claude")
	.description("CLI tool for interacting with Claude AI")
	.version("1.0.0");

registerInitCommands(program);

program.parse();
