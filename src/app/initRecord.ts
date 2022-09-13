import DB from './'
import {config} from "./config/db.config";

export class InitialRecordService {
    public resource = DB.Resource;

    public async insertInitialRecords(): Promise<void> {
        const {resources: resourceList} = config.initialRecord

        //insert/update Resource
        let resourceDataList = [];
        // pre-step to be ready to use bulk table id
        let resourceListLength = resourceList.length;
        //
        for (const resourceObj of resourceList) {
            // creating tableid from bulk

            resourceDataList.push({
                ...resourceObj,
                createdBy: 'SYSTEM',
                createdAt: new Date(),
            });
        }
        try {
            await this.resource.bulkCreate(resourceDataList,
                {
                    fields: ["resourceName","resourceDescription", "resourceLevelType", "createdBy", "createdAt"],
                    updateOnDuplicate: ["resourceName"]
                }
            );
        } catch (error) {
            console.log(error);
        }
    }
}