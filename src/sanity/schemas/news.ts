export const newsSchema = {
  name: "news",
  title: "News Article",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        { name: "fr", title: "French", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en" },
    },
    { name: "publishedAt", title: "Published At", type: "datetime" },
    {
      name: "image",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "object",
      fields: [
        { name: "fr", title: "French", type: "text", rows: 3 },
        { name: "en", title: "English", type: "text", rows: 3 },
      ],
    },
    {
      name: "content",
      title: "Content",
      type: "object",
      fields: [
        { name: "fr", title: "French", type: "array", of: [{ type: "block" }] },
        {
          name: "en",
          title: "English",
          type: "array",
          of: [{ type: "block" }],
        },
      ],
    },
    { name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] },
  ],
};
