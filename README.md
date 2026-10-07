# PersonalPortFolio
 My New Personal Portfilio 

## How to publish a post (delete this section later)

1. Create `posts/my-post-slug.md` and write it in Markdown.
2. Add an entry for it at the top of `posts/index.json`:

```json
{
  "slug": "my-post-slug",
  "title": "My post title",
  "date": "2026-10-20",
  "summary": "One sentence shown on the cards.",
  "tags": ["Python"],
  "readTime": "5 min read",
  "draft": false
}
```

3. Commit and push. Code blocks get syntax highlighting automatically:

```js
const greet = (name) => `Hello, ${name}!`;
console.log(greet("world"));
```