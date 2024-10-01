# remark-prepend-url

This is a simple [remark](https://github.com/remarkjs/remark) plugin that allows you to prepend an absolute url (`https://acme.com`) to relative links (`/posts`).

Useful if you're using a static site generator like Astro with `.mdx` files and you'd like to prepare them for a full-text RSS feed.

## Install

```bash
npm install remark-prepend-url
```

## Use

```js
remark().use(remarkPrependUrl, new URL("https://acme.com"));
```

Given the following `example.md`

```md
...a [link]('/posts') for you.
```

Using `remark-prepend-url` like below:

```js
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import { read } from "to-vfile";
import { unified } from "unified";

const file = await unified()
  .use(remarkParse)
  .use(remarkPrependUrl, new URL("https://acme.com"))
  .use(remarkStringify)
  .process(await read("example.md"));

console.log(String(file));
```

will yield:

```js
...a [link]('https://acme.com/posts') for you.
```

### TypeScript

`remark-prepend-url` contains TypeScript type definitions. The package is ready for use with TypeScript.

### License

Distributed under the [MIT License](https://github.com/alxjpzmn/remark-prepend-url/blob/master/LICENSE).
