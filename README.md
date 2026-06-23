# Bulk Download Service

A small Express service that zips files from the `storage/` directory and streams the archive to the browser as a download.

## What This Project Does

- Serves a simple home page at `/`
- Provides a bulk download endpoint at `/bulk-download`
- Creates a ZIP in memory and streams it directly in the response
- Logs basic memory and CPU metrics around the ZIP operation

## Tech Stack

- Node.js
- Express
- Archiver

## Prerequisites

- Node.js 18+ (recommended)
- npm 9+ (or compatible npm version bundled with your Node.js install)

## Quick Start

1. Clone the repository.
2. Open a terminal in the project root.
3. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
node src/index.js
```

5. Open your browser:

```text
http://localhost:3000
```

6. Click **Start Bulk Download** to download `files.zip`.

## Project Structure

```text
bulk-download/
	src/
		index.js      # Express app and routes
		utils.js      # Memory and CPU logging helpers
	storage/        # Files included in the ZIP
	package.json
	README.md
```

## API Endpoints

### `GET /`

Returns a basic HTML page with a button that triggers the bulk download endpoint.

### `GET /bulk-download`

- Reads files from `storage/`
- Builds ZIP archive
- Streams it with headers:
	- `Content-Type: application/zip`
	- `Content-Disposition: attachment; filename="files.zip"`

## Development Notes

- Place sample files inside `storage/` before testing downloads.
- The ZIP operation is streamed, so output is not written to disk by default.
- Metrics are logged to the terminal when ZIP generation completes.

## Troubleshooting

### `TypeError: archiver is not a function`

This project uses `archiver@8`, which supports class-based usage via `ZipArchive`. If you see this error, check that:

- You have installed dependencies from `package.json` (`npm install`).
- You are running the latest code from `src/index.js`.
- Your local `node_modules` is not stale (if needed, delete it and run `npm install` again).

### Port already in use

If port `3000` is occupied, stop the other process or update the `PORT` value in `src/index.js`.

## Useful Commands

```bash
# Install dependencies
npm install

# Run the service
node src/index.js
```

## Future Improvements

- Add an npm `start` script in `package.json`
- Add `.env` support for configurable port
- Add tests for `/bulk-download`
- Add validation/error handling for missing `storage/` folder
