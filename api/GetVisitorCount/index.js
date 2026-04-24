const { TableClient } = require("@azure/data-tables");

module.exports = async function (context, req) {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    const tableName = "visitors";
    const client = TableClient.fromConnectionString(connectionString, tableName);
    const partitionKey = "counter";
    const rowKey = "visits";

    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    };

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
            headers,
            body: JSON.stringify({ count: newCount })  // ✅ proper JSON
        };
    } catch (error) {
        if (error.statusCode === 404) {
            await client.createEntity({ partitionKey, rowKey, count: 1 });
            context.res = {
                status: 200,
                headers,
                body: JSON.stringify({ count: 1 })  // ✅ proper JSON
            };
        } else {
            context.log.error("Visitor counter error:", error.message);
            context.res = {
                status: 500,
                headers,
                body: JSON.stringify({ error: error.message })
            };
        }
    }
};
