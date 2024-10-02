import { visit } from 'unist-util-visit';
import type { Root } from 'mdast'

const remarkPrependUrl = (baseUrl: URL) => {
  return (tree: Root) => {
    visit(tree, 'link', (node) => {
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
