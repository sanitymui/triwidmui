import { Router } from "express";

const feedsRouter = Router();

const ALLOWED_FEEDS = [
  "https://triwidmui-horor-indo.blogspot.com/feeds/posts/default",
  "https://triwidmui-en-horror.blogspot.com/feeds/posts/default",
];

feedsRouter.get("/feeds", async (req, res) => {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    res.status(400).json({ error: "Missing or invalid url query param" });
    return;
  }

  const base = url.split("?")[0];
  if (!ALLOWED_FEEDS.includes(base)) {
    res.status(403).json({ error: "Feed URL not allowed" });
    return;
  }

  try {
    const proxyUrl = `${base}?alt=json&max-results=20`;
    const upstream = await fetch(proxyUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; HorrorArchiveBot/1.0) AppleWebKit/537.36",
      },
    });

    if (!upstream.ok) {
      res.status(upstream.status).json({ error: "Upstream fetch failed" });
      return;
    }

    const data = await upstream.json();
    res.setHeader("Cache-Control", "public, max-age=300");
    res.json(data);
  } catch (err) {
    req.log.error({ err }, "Feed proxy error");
    res.status(502).json({ error: "Failed to fetch feed" });
  }
});

export default feedsRouter;
