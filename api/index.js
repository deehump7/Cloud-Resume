const { TableClient } = require("@azure/data-tables");

module.exports = async function (context, req) {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    const tableName = "visitors";
    const client = TableClient.fromConnectionString(connectionString, tableName);

    const partitionKey = "counter";
    const rowKey = "visits";

    try {
        let entity = await client.getEntity(partitionKey, rowKey);

        const currentCount = typeof entity.count === "object"
            ? entity.count.value
            : Number(entity.count);

        const newCount = currentCount + 1;

        await client.updateEntity({
            partitionKey,
            rowKey,
            count: newCount,
            etag: entity.etag
        }, "Replace");

        context.res = {
            status: 200,
            headers: { "Content-Type": "text/plain" },
            body: String(newCount)
        };

    } catch (error) {
        if (error.statusCode === 404) {
            await client.createEntity({
                partitionKey,
                rowKey,
                count: 1
            });

            context.res = {
                status: 200,
                headers: { "Content-Type": "text/plain" },
                body: "1"
            };
        } else {
            context.log.error("Visitor counter error:", error.message);
            context.res = {
                status: 500,
                body: "Internal server error: " + error.message
            };
        }
    }
};
