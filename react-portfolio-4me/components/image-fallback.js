export default function createPlaceholderURI(
  width = "100%", height = "100%", bgColor = "#fff000"
) {
  // const minLen = Math.min(width, height);
  const str = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <linearGradient id="lg" x1="0" x2="1" y1="0" y2="1">
          <stop stop-color="${bgColor}" offset="0"></stop>
          <stop stop-color="#f5f5f5" offset="0.5"></stop>
          <stop stop-color="${bgColor}" offset="1"></stop>
        </linearGradient>
        <rect fill="url(#lg)" width="${width}" height="${height}">
          <animate attributeName="opacity" values="0.4;0.99;0.4" dur="3s" repeatCount="indefinite" />
        </rect>
    </svg>
  `;
  // <rect fill="#f5f5f5" opacity="0.3" x="${(width - minLen) / 2}" y="${(height - minLen) / 2}" width="${minLen}" height="${minLen}">
  //   <animate
  //     attributeName="rx"
  //     values="0;${minLen / 2};0"
  //     dur="10s"
  //     repeatCount="indefinite" />
  // </rect>
  const cleaned = str
    .replace(/[\t\n\r]/gim, '') // Strip newlines and tabs
    .replace(/\s\s+/g, ' ') // Condense multiple spaces
    .replace(/'/gim, '\\i'); // Normalize quotes

  const encoded = encodeURIComponent(cleaned)
    .replace(/\(/g, '%28') // Encode brackets
    .replace(/\)/g, '%29');

  return `data:image/svg+xml;charset=UTF-8,${encoded}`;
}
