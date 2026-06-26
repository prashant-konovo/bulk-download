const express = require("express");
const { ZipArchive } = require("archiver");
const path = require("path");
const { logMemoryUsage, logCpuMetrics, startCpuMetrics } = require("./utils");

const app = express();

app.get("/", (req, res) => {
  console.log("Serving the main page...");
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/bulk-download", (req, res) => {
  console.log("Starting bulk download process...");
  const folderPath = path.join(__dirname, "..", "storage");

  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", 'attachment; filename="files.zip"');

  const cpuMetrics = startCpuMetrics();

  logMemoryUsage("Before ZIP");

  const archive = new ZipArchive({
    zlib: { level: 9 },
  });

  archive.on("error", (err) => {
    console.error(err);
    res.status(500).end();
  });

  archive.on("end", () => {
    logMemoryUsage("After ZIP");
    logCpuMetrics("ZIP Download CPU Usage", cpuMetrics);
  });

  archive.pipe(res);

  archive.directory(folderPath, false);

  archive.finalize();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
