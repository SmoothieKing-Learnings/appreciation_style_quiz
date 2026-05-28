import html2canvas from 'html2canvas';

// Canonical public URL of the quiz. Pinned so the share message always
// directs recipients to the live GitHub Pages site, regardless of whether
// the share is triggered from local dev, the live site, or a Rise 360 iframe.
const QUIZ_URL = 'https://smoothieking-learnings.github.io/appreciation_style_quiz/';

/**
 * Capture an element as PNG and trigger the Web Share sheet (or download fallback).
 *
 * @param {string} elementId  ID of the DOM node to screenshot.
 * @param {string} filename   File name for the PNG.
 * @param {object} [options]
 * @param {string} [options.userName]   Personalizes the share text — e.g. "Sarah".
 * @param {string} [options.styleName]  Top style name (or joined "X and Y" for ties).
 */
export const exportAndShare = async (
  elementId,
  filename = 'appreciation-style-result.png',
  { userName = '', styleName = '' } = {}
) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return;
  }

  // Build the share text. Falls back to a generic "my" when no name is provided.
  const subject = userName ? `${userName}'s` : 'my';
  const styleSentence = styleName ? ` My type of appreciation is ${styleName}.` : '';
  const shareTitle = userName ? `${userName}'s Type of Appreciation` : 'My Type of Appreciation';
  // URL is appended to the text only. We intentionally do NOT also pass it
  // as the `url` field — receivers that honor both render the link twice
  // (once inline from text, once as a preview card from `url`).
  const shareText = `Check out ${subject} Type of Appreciation!${styleSentence} ${QUIZ_URL}`;

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#FFF9EF', // Ensure correct background
    });

    canvas.toBlob(async (blob) => {
      if (!blob) {
        console.error("Failed to create blob from canvas");
        return;
      }

      const file = new File([blob], filename, { type: 'image/png' });

      // Check if Web Share API is supported and can share files
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: shareTitle,
            text: shareText,
            files: [file]
          });
          return;
        } catch (shareError) {
          console.error("Error sharing:", shareError);
          // Fallback to download if user cancels or share fails
          downloadFallback(blob, filename);
        }
      } else {
        // Fallback to download
        downloadFallback(blob, filename);
      }
    }, 'image/png');
  } catch (error) {
    console.error("Error generating image:", error);
  }
};

function downloadFallback(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
