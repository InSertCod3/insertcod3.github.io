Welcome! This is the first post on my dev blog.

I build software for a living, and I want a place to write down what I'm working on, what broke, and what I learned fixing it. If it saves you an afternoon, great.

## What to expect

- Notes from real projects, frontend and backend
- Debugging stories and the fixes that worked
- Tools, patterns and design decisions

## Say hi

If something here sparks a question, you can [book a virtual coffee](booking.html) and we'll talk it through.

---

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
