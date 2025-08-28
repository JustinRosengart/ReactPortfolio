# Theme-Anpassung Anleitung

## Akzentfarbe ändern

Um die Akzentfarbe der gesamten Anwendung zu ändern, öffne die Datei `src/config/theme.ts` und ändere die `ACCENT_COLOR` Variable:

```typescript
// Zeile 3 in src/config/theme.ts
const ACCENT_COLOR = 'purple'; // Ändere 'blue' zu einer anderen Farbe
```

## Verfügbare Farben

Du kannst aus folgenden Tailwind-Farben wählen:
- `'blue'` - Blau
- `'indigo'` - Indigo  
- `'purple'` - Lila
- `'green'` - Grün  
- `'red'` - Rot (aktuell eingestellt)
- `'orange'` - Orange
- `'pink'` - Pink
- `'cyan'` - Cyan
- `'teal'` - Teal

## Beispiel

**Für ein grünes Theme:**
```typescript
const ACCENT_COLOR = 'green';
```

**Für ein lila Theme:**
```typescript
const ACCENT_COLOR = 'purple';
```

## Was ändert sich?

Die Akzentfarbe wird verwendet für:
- ✨ **Navigation**: Aktive Menüpunkte
- 🔗 **Links**: Interaktive Textlinks
- 🎯 **Buttons**: Primäre Aktionsbuttons
- 🔍 **Focus-States**: Fokus-Ringe bei Eingabefeldern
- 🏷️ **Badges**: Technologie-Tags und Auszeichnungen

## Was bleibt neutral?

- 📝 **Text**: Haupttext bleibt schwarz/weiß je nach Theme
- 🖼️ **Hintergründe**: Seiten-Hintergründe bleiben neutral grau
- 📊 **Status-Farben**: Erfolg (grün), Fehler (rot), Warnung (gelb) bleiben unverändert

Nach der Änderung wird die neue Farbe automatisch in der gesamten Anwendung verwendet!