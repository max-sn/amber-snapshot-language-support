"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmberSnapshotSymbolProvider = void 0;
const vscode = __importStar(require("vscode"));
class AmberSnapshotSymbolProvider {
    provideDocumentSymbols(document) {
        const symbols = [];
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
            const range = new vscode.Range(i, 0, endLine, document.lineAt(endLine).text.length);
            symbols.push(new vscode.DocumentSymbol(name, "", vscode.SymbolKind.Function, range, range));
        }
        return symbols;
    }
}
exports.AmberSnapshotSymbolProvider = AmberSnapshotSymbolProvider;
//# sourceMappingURL=amberSnapshotSymbolProvider.js.map