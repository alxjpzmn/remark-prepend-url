import { visit } from 'unist-util-visit';
import { Node } from 'unist';

interface LinkNode extends Node {
  url?: string;
}

const remarkPrependUrl = (baseUrl: URL) => {
  return (tree: Node) => {
    visit(tree, 'link', (node: LinkNode) => {
      if (node.url && node.url.startsWith('/')) {
        try {
          node.url = new URL(node.url, baseUrl).href;
        } catch (error) {
          throw new Error(`Invalid URL: ${node.url}`);
        }
      }
    });
  };
};

export default remarkPrependUrl;
