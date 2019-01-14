var fs   = require("fs");
var path = require("path");

module.exports = plugin;

function plugin(srcDir)
{
    return function(files, metalsmith, done)
    {
        var metadata  = metalsmith.metadata();
        var jsonFiles = fs.readdirSync(srcDir).filter(fn => fn.endsWith(".json"));

        for (var f in jsonFiles) {
            var filePath = srcDir + jsonFiles[f];
            var ns       = path.basename(jsonFiles[f], ".json");

            if (!metadata[ns]) {
                var rawContents  = fs.readFileSync(filePath, "utf8");
                var jsonContents = JSON.parse(rawContents);

                metadata[ns] = jsonContents;
            }
        }

        done();
    };
}
