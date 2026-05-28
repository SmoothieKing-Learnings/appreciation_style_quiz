import html2canvas from 'html2canvas';

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
  const styleSentence = styleName ? ` My appreciation style is ${styleName}.` : '';
  const shareTitle = userName ? `${userName}'s Appreciation Style` : 'My Appreciation Style';
  const shareText = `Check out ${subject} Appreciation Style Profile!${styleSentence}`;

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
