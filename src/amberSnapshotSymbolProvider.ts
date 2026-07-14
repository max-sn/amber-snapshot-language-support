import * as vscode from "vscode";

export class AmberSnapshotSymbolProvider
    implements vscode.DocumentSymbolProvider {

    provideDocumentSymbols(
        document: vscode.TextDocument
    ): vscode.DocumentSymbol[] {

        const symbols: vscode.DocumentSymbol[] = [];

        for (let i = 0; i < document.lineCount; i++) {
            const text = document.lineAt(i).text;

            const match = /^# name:\s+(.+)$/.exec(text);
            if (!match) {
                continue;
            }

            const name = match[1];

            let endLine = document.lineCount - 1;

            for (let j = i + 1; j < document.lineCount; j++) {
                if (document.lineAt(j).text === "# ---") {
                    endLine = j;
                    break;
                }
            }

            const range = new vscode.Range(
                i,
                0,
                endLine,
                document.lineAt(endLine).text.length
            );

            symbols.push(
                new vscode.DocumentSymbol(
                    name,
                    "",
                    vscode.SymbolKind.Function,
                    range,
                    range
                )
            );
        }

        return symbols;
    }
}