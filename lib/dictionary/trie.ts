import type { DictionaryNode } from '@/lib/types';

export class Trie {
  private root: DictionaryNode;

  constructor() {
    this.root = {
      isWord: false,
      children: new Map(),
    };
  }

  insert(word: string): void {
    let node = this.root;
    const upperWord = word.toUpperCase();
    
    for (const char of upperWord) {
      if (!node.children.has(char)) {
        node.children.set(char, {
          isWord: false,
          children: new Map(),
        });
      }
      node = node.children.get(char)!;
    }
    
    node.isWord = true;
  }

  search(word: string): boolean {
    let node = this.root;
    const upperWord = word.toUpperCase();
    
    for (const char of upperWord) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char)!;
    }
    
    return node.isWord;
  }

  startsWith(prefix: string): boolean {
    let node = this.root;
    const upperPrefix = prefix.toUpperCase();
    
    for (const char of upperPrefix) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char)!;
    }
    
    return true;
  }

  getNode(prefix: string): DictionaryNode | null {
    let node = this.root;
    const upperPrefix = prefix.toUpperCase();
    
    for (const char of upperPrefix) {
      if (!node.children.has(char)) {
        return null;
      }
      node = node.children.get(char)!;
    }
    
    return node;
  }

  getRoot(): DictionaryNode {
    return this.root;
  }

  // Build trie from word list
  static fromWordList(words: string[]): Trie {
    const trie = new Trie();
    for (const word of words) {
      // Only add words with 4+ letters as per Squaredle rules
      if (word.length >= 4) {
        trie.insert(word);
      }
    }
    return trie;
  }

  // Serialize trie for caching
  serialize(): string {
    return JSON.stringify(this.serializeNode(this.root));
  }

  private serializeNode(node: DictionaryNode): Record<string, unknown> {
    const obj: Record<string, unknown> = {
      isWord: node.isWord,
      children: {},
    };
    
    node.children.forEach((child, char) => {
      (obj.children as Record<string, unknown>)[char] = this.serializeNode(child);
    });
    
    return obj;
  }

  // Deserialize trie from cache
  static deserialize(data: string): Trie {
    const trie = new Trie();
    const parsed = JSON.parse(data);
    trie.root = Trie.deserializeNode(parsed);
    return trie;
  }

  private static deserializeNode(obj: Record<string, unknown>): DictionaryNode {
    const node: DictionaryNode = {
      isWord: obj.isWord as boolean,
      children: new Map(),
    };
    
    for (const [char, childObj] of Object.entries(obj.children as Record<string, Record<string, unknown>>)) {
      node.children.set(char, Trie.deserializeNode(childObj));
    }
    
    return node;
  }

  // Get all words in trie (for debugging)
  getAllWords(): string[] {
    const words: string[] = [];
    this.collectWords(this.root, '', words);
    return words;
  }

  private collectWords(node: DictionaryNode, prefix: string, words: string[]): void {
    if (node.isWord) {
      words.push(prefix);
    }
    
    node.children.forEach((child, char) => {
      this.collectWords(child, prefix + char, words);
    });
  }
}