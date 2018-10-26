export interface BulkWrite {
    updateOne: {
        filter: { _id: string },
        update: {
          $set: {
            index: number}
                }
                };
}
