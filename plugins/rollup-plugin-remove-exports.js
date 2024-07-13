export default function removeExports() {
    return {
        name: 'remove-exports',
        renderChunk(code) {
            return code.replace(/export\s*\{[^}]+\}\s*;?/g, '');
        }
    };
}
