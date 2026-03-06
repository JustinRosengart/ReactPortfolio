const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove imports
    content = content.replace(/import \{.*Builder.*\} from '.*';\n/g, '');
    content = content.replace(/import \{ EditableText \} from '.*';\n/g, '');
    content = content.replace(/import \{ EditableImage \} from '.*';\n/g, '');
    content = content.replace(/import \{ EditableList \} from '.*';\n/g, '');

    // Replace <EditableText value={X} path={Y} /> with {X}
    content = content.replace(/<EditableText\s+value=\{([^}]+)\}\s+path=[\"'][^\"']+[\"'](?:\s+multiline)?\s*\/>/g, '{$1}');

    // Special cases where the EditableText value was a string literal
    content = content.replace(/<EditableText\s+value=[\"']([^\"']+)[\"']\s+path=[\"'][^\"']+[\"'](?:\s+multiline)?\s*\/>/g, '$1');

    // ProjectGallery / ProjectsPage image replacements
    content = content.replace(/<EditableImage\s+path=[\"'][^\"']+[\"']\s+value=\{([^}]+)\}\s+alt=\{([^}]+)\}\s+className=[\"']([^\"']+)[\"']\s*\/>/g, '<img src={$1} alt={$2} className="$3" />');
    content = content.replace(/<EditableImage\s+path=[\"'][^\"']+[\"']\s+value=[\"']([^\"']*)[\"']\s+className=[\"']([^\"']+)[\"']\s*\/>/g, '<img src="$1" className="$2" alt="" />');

    // Replace App.tsx Builder logic
    content = content.replace(/<BuilderProvider>\s*/, '');
    content = content.replace(/\s*<\/BuilderProvider>/, '');
    content = content.replace(/<BuilderPanel \/>\n/, '');

    // Remove Context uses
    content = content.replace(/\s*const \{.*isBuilderMode.*\} = useBuilder\(\);\n/g, '');
    content = content.replace(/\s*const \{.*content.*\} = useBuilder\(\);\n/g, '');

    // ProfilePage / ProjectDetailPage specific logic for 'isBuilderMode'
    content = content.replace(/\{\(isBuilderMode \|\| ([^)]+)\) && \(/g, '{$1 && (');
    content = content.replace(/\{!isBuilderMode && \(/g, '{true && (');
    content = content.replace(/\{isBuilderMode \? \([\s\S]*?\) : \(([\s\S]*?)\)\}/g, '$1');

    fs.writeFileSync(filePath, content);
    console.log('Processed', filePath);
}

const filesToProcess = [
    'src/App.tsx',
    'src/components/Footer.tsx',
    'src/pages/ContactPage.tsx',
    'src/pages/LandingPage.tsx',
    'src/pages/PrivacyPolicyPage.tsx',
    'src/pages/ProjectsPage.tsx',
    'src/pages/ProjectDetailPage.tsx',
    'src/components/ProjectGallery.tsx'
];

filesToProcess.forEach(f => {
    try {
        processFile(path.resolve(f));
    } catch(e) {
        console.error('Error on', f, e.message);
    }
});
