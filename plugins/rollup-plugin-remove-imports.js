export default function removeImports() {
    return {
        name: 'remove-imports',
        renderChunk(code) {
            return code.replace(/import\s*[^;]*\s*;?/g, '');
        }
    };
}
