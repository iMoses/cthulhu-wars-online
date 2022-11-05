export function readFile(file, readAs = 'text') {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result));
    reader.addEventListener('error', reject);
    ({
      arrayBuffer: reader.readAsArrayBuffer,
      binaryString: reader.readAsBinaryString,
      dataURL: reader.readAsDataURL,
      text: reader.readAsText,
    }[readAs](file));
  });
}
