export function readFile(file: Blob, readAs = 'text') {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const readFunction = {
      arrayBuffer: reader.readAsArrayBuffer,
      binaryString: reader.readAsBinaryString,
      dataURL: reader.readAsDataURL,
      text: reader.readAsText,
    }[readAs];
    reader.addEventListener('load', () => resolve(reader.result));
    reader.addEventListener('error', reject);
    readFunction(file);
  });
}
