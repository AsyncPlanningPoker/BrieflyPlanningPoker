'use strict';

module.exports = {
  name: 'plugin-format-deps',
  factory: (require) => {
    const { Configuration, Manifest, Project } = require('@yarnpkg/core');
    const { structUtils } = require('@yarnpkg/core');
    const { Command, Option } = require('clipanion');

    class FormatDepsCommand extends Command {
      workspace = Option.String();
      prefix = Option.String('-p,--prefix');
      suffix = Option.String('-s,--suffix');
      ignore = Option.String('-i,--ignore');

      static paths = [['format-deps']];
      static usage = Command.Usage({
        description: 'Format and concat the project dependencies',
        details: `
          This command search for project dependencies and format the relative cwb.
        `,
        examples: [['Format the project dependencies', "yarn format-deps --prefix '**' --suffix '**' @ima/api"]],
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

        let wsArray = [...requiredWorkspaces];
        if (this.ignore) {
          wsArray = wsArray.filter((ws) => {
            return !ws.relativeCwd.includes(this.ignore);
          });
        }

        const prefix = this.prefix || '';
        const suffix = this.suffix || '';
        const cwds = wsArray.map((ws) => {
          return `${prefix}${ws.relativeCwd}${suffix}`;
        });

        this.context.stdout.write(cwds.join(','));
      }
    }

    return {
      commands: [FormatDepsCommand],
    };
  },
};
