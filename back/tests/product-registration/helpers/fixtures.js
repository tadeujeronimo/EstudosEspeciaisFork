/**
 * Fixture: a minimal 1x1 pixel JPEG binary buffer.
 *
 * Using a real (tiny) image binary means multer's fileFilter validates the
 * mimetype correctly without needing actual files on disk.
 */

// 1×1 red JPEG — smallest valid JPEG binary
const JPEG_1PX = Buffer.from(
  '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8U' +
    'HRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgN' +
    'DRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy' +
    'MjL/wAARCAABAAEDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUEB' +
    'AQBAQAAAAAAAAAAAAAAAAAEBP/EABYRAQEBAAAAAAAAAAAAAAAAAAARIf/aAAwDAQACEQMR' +
    'AD8Amo3OoliOSqGGLSp0AAAAASUVORK5CYII=',
  'base64'
);

// 1×1 red PNG
const PNG_1PX = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8' +
    '/5+hHgAHggJ/PchI6QAAAABJRU5ErkJggg==',
  'base64'
);

// A small PDF header (not an image — used to test format rejection)
const PDF_BYTES = Buffer.from('%PDF-1.4 fake pdf content');

// A buffer larger than 5 MB (used to test size limit rejection)
const LARGE_IMAGE = Buffer.alloc(6 * 1024 * 1024, 0xff); // 6 MB of 0xFF

module.exports = { JPEG_1PX, PNG_1PX, PDF_BYTES, LARGE_IMAGE };
