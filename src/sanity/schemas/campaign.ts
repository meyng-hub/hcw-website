export const campaignSchema = {
  name: "campaign",
  title: "Fundraising Campaign",
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
    { name: "active", title: "Active", type: "boolean", initialValue: true },
    { name: "goalAmount", title: "Goal (€)", type: "number" },
    { name: "raisedAmount", title: "Raised (€)", type: "number" },
    { name: "donorCount", title: "Donor Count", type: "number" },
    { name: "endsAt", title: "End Date", type: "datetime" },
    { name: "image", title: "Campaign Image", type: "image" },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "object",
      fields: [
        { name: "fr", title: "French", type: "text" },
        { name: "en", title: "English", type: "text" },
      ],
    },
  ],
};
