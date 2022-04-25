'use strict';

module.exports = {
  name: 'plugin-run-deps',
  factory: (require) => {
    const { Configuration, Manifest, Project } = require('@yarnpkg/core');
    const { structUtils } = require('@yarnpkg/core');
    const { Command, Option } = require('clipanion');

    class RunDepsCommand extends Command {
      workspace = Option.String();
      commandName = Option.String();
      args = Option.Proxy();

      static paths = [['run-deps']];
      static usage = Command.Usage({
        description: 'Run command for each project dependency',
        details: `
          This command search for project dependencies and executes the command on each dependent project.
        `,
        examples: [['Run the test command', 'yarn run-deps @ima/api test']],
      });

      async execute() {
        const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
        const { project } = await Project.find(configuration, this.context.cwd);

        const workspace = project.getWorkspaceByIdent(structUtils.parseIdent(this.workspace));
        const requiredWorkspaces = new Set([workspace]);

        for (const dependencyType of Manifest.hardDependencies) {
          for (const descriptor of workspace.manifest.getForScope(dependencyType).values()) {
            const matchingWorkspace = project.tryWorkspaceByDescriptor(descriptor);

            if (matchingWorkspace === null) {
              continue;
            }

            requiredWorkspaces.add(matchingWorkspace);
          }
        }

        let exitCode = 0;
        for (const ws of requiredWorkspaces) {
          if (!ws.manifest.scripts.has(this.commandName)) {
            continue;
          }

          const commandExitCode = await this.cli.run(['run', this.commandName, ...this.args], {
            cwd: ws.cwd,
          });

          if (commandExitCode > 0) {
            exitCode = 1;
          }
        }

        return exitCode;
      }
    }

    return {
      commands: [RunDepsCommand],
    };
  },
};
