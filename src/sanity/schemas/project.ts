export const projectSchema = {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        {
          name: "fr",
          title: "French",
          type: "string",
          validation: (r: { required: () => unknown }) => r.required(),
        },
        {
          name: "en",
          title: "English",
          type: "string",
          validation: (r: { required: () => unknown }) => r.required(),
        },
      ],
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en" },
    },
    {
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        { name: "fr", title: "French", type: "text" },
        { name: "en", title: "English", type: "text" },
      ],
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["education", "girls", "digital", "culture", "solidarity"],
      },
    },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["active", "completed", "ongoing"] },
      initialValue: "active",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    },
    { name: "donateUrl", title: "Donate URL", type: "url" },
    {
      name: "location",
      title: "Location",
      type: "object",
      fields: [
        { name: "city", title: "City", type: "string" },
        { name: "lat", title: "Latitude", type: "number" },
        { name: "lng", title: "Longitude", type: "number" },
      ],
    },
  ],
};
