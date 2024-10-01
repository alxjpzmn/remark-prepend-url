import { expect } from 'chai';
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import { VFile } from 'vfile';
import plugin from './index.js';

const processMarkdown = async (markdown: string): Promise<VFile> => {
  const processor = remark().use(remarkParse).use(plugin, new URL('https://acme.com'));
  const file = await processor.process(markdown);
  return file;
};

describe('Remark Prepend URL', () => {
  it('should convert relative URLs to absolute URLs', async () => {
    const markdown = '[Posts](/posts)';
    const file = await processMarkdown(markdown);

    expect(String(file)).to.equal('[Posts](https://acme.com/posts)\n');
  });

  it('should not modify absolute URLs', async () => {
    const markdown = '[Test](https://acme.com/path)';
    const file = await processMarkdown(markdown);

    expect(String(file)).to.equal('[Test](https://acme.com/path)\n');
  });

  it('should convert only relative URLs', async () => {
    const markdown = `[Relative](/posts) [Absolute](https://acme.com/path)`;
    const file = await processMarkdown(markdown);

    expect(String(file)).to.equal(`[Relative](https://acme.com/posts) [Absolute](https://acme.com/path)\n`);
  });

  it('should convert multiple relative links', async () => {
    const markdown = `[Relative](/posts) [Relative 2](/about)`;
    const file = await processMarkdown(markdown);

    expect(String(file)).to.equal(`[Relative](https://acme.com/posts) [Relative 2](https://acme.com/about)\n`);
  });

  it('should throw an error on invalid urls', async () => {
    const markdown = `[Invalid](///)`;
    try {
      await processMarkdown(markdown);

      expect.fail('Expected an error to be thrown for invalid URLs, but none was thrown.');
    } catch (error) {

      expect((error as Error).message).to.contain('Invalid URL');
    }

  });

  it('should ignore non-link nodes', async () => {
    const markdown = `[Posts](/posts) **Bold Text**`;
    const file = await processMarkdown(markdown);

    expect(String(file)).to.equal(`[Posts](https://acme.com/posts) **Bold Text**\n`);
  });

  it('should handle empty markdown', async () => {
    const markdown = '';
    const file = await processMarkdown(markdown);

    expect(String(file)).to.equal('');
  });
});

