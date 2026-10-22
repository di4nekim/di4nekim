const SITE_URL = "https://di4nekim.vercel.app";

export default function sitemap() {
  const lastModified = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/after-hours`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
