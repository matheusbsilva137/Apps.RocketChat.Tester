import { IAppAccessors, IConfigurationExtend, ILogger } from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { StartJob } from './slashcommand/startJob';
import { CancelJob } from './slashcommand/cancelJob';
import { CancelAllJobs } from './slashcommand/cancelAllJobs';

export class RocketChatTester extends App {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    public async extendConfiguration(configuration: IConfigurationExtend) {
        configuration.scheduler.registerProcessor({
            id: 'test',
            processor: async (job) => console.log('this works', job)
        });

        await configuration.slashCommands.provideSlashCommand(new StartJob(this));
        await configuration.slashCommands.provideSlashCommand(new CancelJob(this));
        await configuration.slashCommands.provideSlashCommand(new CancelAllJobs(this));
    }
}
