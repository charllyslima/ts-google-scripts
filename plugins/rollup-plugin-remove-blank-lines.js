export default function removeBlankLines() {
    return {
        name: 'remove-blank-lines',
        generateBundle(options, bundle) {
            for (const fileName of Object.keys(bundle)) {
                const chunk = bundle[fileName];
                if (chunk.type === 'chunk') {
                    chunk.code = chunk.code.replace(/^\s*\n/gm, '');
                }
            }
        }
    };
}
