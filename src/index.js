const subsrt = require('subsrt');

async function handleUpload(event) {
    const files = event.target.files;

    if (files.length === 0) {
        return;
    }

    try {
        const srtData = await files[0].text();

        const parsed = subsrt.parse(srtData);

        const data = parsed.map((x) => x.text).join('\n');

        const resultDiv = document.getElementById('result-div');

        resultDiv.textContent = data;
    } catch (err) {
        alert(`Something went wrong handling your file: ${err.toString()}`);
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function handleCopy(event) {
    const element = document.getElementById('result-div');
    const copyButton = document.getElementById('copy-to-clipboard');

    /* Select for copying */
    element.select();

    try {
        /* Perform copy. Might fail in some browsers */
        document.execCommand('copy');

        /* Deselect text */
        element.setSelectionRange(0, 0);

        /* Update button to indicate copy succeeded */
        copyButton.textContent = 'Copied.';

        await sleep(2000);

        /* Reset text after short sleep */
        copyButton.textContent = 'Copy Text to Clipboard';

    } catch (err) {
        alert('Failed to copy!');
    }
}

function main() {
    const srt = document.getElementById('srt-upload');

    srt.addEventListener('change', handleUpload);

    const copyButton = document.getElementById('copy-to-clipboard');

    copyButton.addEventListener('click', handleCopy);
}

window.addEventListener('load', () => {
    main();
});
