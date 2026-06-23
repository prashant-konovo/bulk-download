function logMemoryUsage(label) {
  const mem = process.memoryUsage();

  console.log(`\n=== ${label} ===`);
  console.log(`RSS        : ${(mem.rss / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Heap Used  : ${(mem.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Heap Total : ${(mem.heapTotal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`External   : ${(mem.external / 1024 / 1024).toFixed(2)} MB`);
}

function startCpuMetrics() {
  return {
    cpu: process.cpuUsage(),
    time: Date.now(),
  };
}

function logCpuMetrics(label, start) {
  const cpu = process.cpuUsage(start.cpu);
  const elapsedMs = Date.now() - start.time;

  console.log(`\n=== ${label} ===`);
  console.log(`Elapsed Time : ${elapsedMs} ms`);
  console.log(`User CPU     : ${(cpu.user / 1000).toFixed(2)} ms`);
  console.log(`System CPU   : ${(cpu.system / 1000).toFixed(2)} ms`);
  console.log(
    `Total CPU    : ${((cpu.user + cpu.system) / 1000).toFixed(2)} ms`,
  );
}

module.exports = {
  logMemoryUsage,
  startCpuMetrics,
  logCpuMetrics,
};
