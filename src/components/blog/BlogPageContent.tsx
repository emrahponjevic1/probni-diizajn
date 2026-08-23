"use client";

import { useState, useEffect, useMemo } from "react";
import styles from "./BlogPageContent.module.css";
import {
  BLOG_POSTS,
  BlogPost,
} from "./BlogData";

// Clean Vector SVG Icons (No external library dependencies)
const BookIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
    <path d="M6 6h10" />
    <path d="M6 10h10" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const ShareIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SparklesIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

export default function BlogPageContent() {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync state with URL parameter (e.g., /blog?post=marinada-orientalski-zar)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const postParam = params.get("post");

    if (postParam && BLOG_POSTS.some((p) => p.id === postParam)) {
      setActivePostId(postParam);
    }

    const handlePopState = () => {
      const currentParams = new URLSearchParams(window.location.search);
      const curPost = currentParams.get("post");
      if (curPost && BLOG_POSTS.some((p) => p.id === curPost)) {
        setActivePostId(curPost);
      } else {
        setActivePostId(null);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Featured Post (for archive view)
  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find((p) => p.isFeatured) || BLOG_POSTS[0];
  }, []);

  // Grid Posts (all posts except featured)
  const gridPosts = useMemo(() => {
    return BLOG_POSTS.filter((p) => p.id !== featuredPost.id);
  }, [featuredPost]);

  // Active Post Data (for single post view)
  const activePost = useMemo(() => {
    if (!activePostId) return null;
    return BLOG_POSTS.find((p) => p.id === activePostId) || null;
  }, [activePostId]);

  // Related Posts (for single post view bottom section)
  const relatedPosts = useMemo(() => {
    if (!activePost) return [];
    return BLOG_POSTS.filter((p) => p.id !== activePost.id).slice(0, 3);
  }, [activePost]);

  // Navigate to single post
  const openSinglePost = (postId: string) => {
    setActivePostId(postId);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("post", postId);
      window.history.pushState({ postId }, "", url.toString());
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Navigate back to archive
  const backToArchive = () => {
    setActivePostId(null);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("post");
      window.history.pushState({}, "", url.pathname);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Copy link share action
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      });
    }
  };


  return (
    <div className={styles.blogPageRoot}>
      <div className={styles.ambientGlowTop} />

      {/* =========================================================================
          VIEW 1: SINGLE POST READING MODE
          ========================================================================= */}
      {activePost ? (
        <article className={styles.blogSection}>
          <div className={styles.container}>
            <div className={styles.singleArticleWrapper}>
              {/* Breadcrumb Navigation */}
              <nav aria-label="Drobtice" className={styles.breadcrumbNav}>
                <button
                  type="button"
                  onClick={backToArchive}
                  className={styles.breadcrumbLink}
                >
                  Domov
                </button>
                <span className={styles.breadcrumbSeparator}>/</span>
                <button
                  type="button"
                  onClick={backToArchive}
                  className={styles.breadcrumbLink}
                >
                  Blog
                </button>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbCurrent}>
                  {activePost.category}
                </span>
              </nav>

              {/* Category Badge */}
              <div>
                <span className={styles.singleCategoryPill}>
                  <SparklesIcon />
                  <span>{activePost.category}</span>
                </span>
              </div>

              {/* Title & Excerpt */}
              <h1 className={styles.singleTitle}>{activePost.title}</h1>
              <p className={styles.singleExcerpt}>{activePost.excerpt}</p>

              {/* Author & Meta Row */}
              <div className={styles.singleAuthorBar}>
                <div className={styles.singleAuthorLeft}>
                  <img
                    src={activePost.author.image}
                    alt={activePost.author.name}
                    className={styles.singleAuthorImg}
                  />
                  <div>
                    <div className={styles.singleAuthorName}>
                      {activePost.author.name}
                    </div>
                    <div className={styles.singleAuthorRole}>
                      {activePost.author.role}
                    </div>
                  </div>
                </div>

                <div className={styles.singleMetaRight}>
                  <div className={styles.singleMetaItem}>
                    <span className={styles.singleMetaIcon}>
                      <CalendarIcon />
                    </span>
                    <span>{activePost.date}</span>
                  </div>
                  <span className={styles.metaDot}>•</span>
                  <div className={styles.singleMetaItem}>
                    <span className={styles.singleMetaIcon}>
                      <ClockIcon />
                    </span>
                    <span>{activePost.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Main Cover Image */}
              <div className={styles.singleCoverContainer}>
                <img
                  src={activePost.coverImage}
                  alt={activePost.title}
                  className={styles.singleCoverImg}
                />
              </div>
              <p className={styles.singleCaption}>{activePost.imageCaption}</p>

              {/* Rich Body Content */}
              <div
                className={styles.singleBodyHtml}
                dangerouslySetInnerHTML={{ __html: activePost.contentHtml }}
              />

              {/* Bottom Action Bar */}
              <div className={styles.singleActionFooter}>
                <button
                  type="button"
                  onClick={backToArchive}
                  className={styles.backToArchiveBtn}
                >
                  <ArrowLeftIcon />
                  <span>Nazaj na vse kulinarične objave</span>
                </button>

                <div className={styles.shareButtonGroup}>
                  <span className={styles.shareLabel}>Deli članek:</span>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className={styles.shareIconBtn}
                    title="Kopiraj povezavo do članka"
                    aria-label="Kopiraj povezavo"
                  >
                    {copiedLink ? <CheckIcon /> : <ShareIcon />}
                  </button>
                  {copiedLink && (
                    <span className={styles.toastCopied}>Povezava kopirana!</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles Section */}
          <div className={styles.relatedSection}>
            <div className={styles.relatedContainer}>
              <div className={styles.relatedHeader}>
                <div>
                  <span className={styles.gridSectionKicker}>
                    Nadaljujte z branjem
                  </span>
                  <h3 className={styles.relatedTitle}>Podobne Kulinarične Zgodbe</h3>
                </div>
                <button
                  type="button"
                  onClick={backToArchive}
                  className={styles.viewAllStoriesLink}
                >
                  <span>Vse objave</span>
                  <ArrowRightIcon />
                </button>
              </div>

              <div className={styles.postsGrid}>
                {relatedPosts.map((post) => (
                  <article
                    key={post.id}
                    className={styles.postCard}
                    onClick={() => openSinglePost(post.id)}
                  >
                    <div>
                      <div className={styles.cardImageWrapper}>
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className={styles.cardImg}
                        />
                        <span className={styles.categoryTagFloating}>
                          {post.category}
                        </span>
                      </div>

                      <div className={styles.cardContent}>
                        <div className={styles.cardMetaRow}>
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h4 className={styles.cardTitle}>{post.title}</h4>
                        <p className={styles.cardExcerpt}>{post.excerpt}</p>
                      </div>
                    </div>

                    <div className={styles.cardFooter}>
                      <div className={styles.cardAuthorMini}>
                        <img
                          src={post.author.image}
                          alt={post.author.name}
                          className={styles.cardAuthorAvatar}
                        />
                        <span className={styles.cardAuthorName}>
                          {post.author.name}
                        </span>
                      </div>
                      <span className={styles.cardActionLink}>
                        <span>Preberi</span>
                        <ArrowRightIcon />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </article>
      ) : (
        /* =========================================================================
            VIEW 2: ARCHIVE BLOG LISTING (HERO + CATEGORIES + 3-GRID)
            ========================================================================= */
        <section className={styles.blogSection}>
          <div className={styles.container}>
            {/* Header / Intro */}
            <div className={styles.blogHeader}>
              <div className={styles.chapterTagContainer}>
                <span className={styles.tagGhostWatermark}>BLOG</span>
                <div className={styles.chapterIndexTag}>
                  <span className={styles.chapterDash} />
                  <span>KULINARIČNI BLOG &amp; ZGODBE</span>
                  <span className={styles.chapterDash} />
                </div>
              </div>

              <h1 className={styles.pageTitle}>
                Zgodbe iz Naše Kuhinje, Skrivnosti Žara &amp; Tradicije
              </h1>

              <p className={styles.pageSubtitle}>
                Spoznajte umetnost orientalske kulinarične tradicije, skrivnosti
                priprave svežih jedi in zgodbe naših mojstrov peke in žara.
              </p>
            </div>

            {/* Featured Hero Story */}
            {featuredPost && (
              <div
                className={styles.featuredCard}
                onClick={() => openSinglePost(featuredPost.id)}
              >
                <div className={styles.featuredImageContainer}>
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className={styles.featuredImg}
                  />
                  <div className={styles.featuredBadgeFloating}>
                    <SparklesIcon />
                    <span>Izpostavljena zgodba</span>
                  </div>
                </div>

                <div className={styles.featuredContent}>
                  <div className={styles.metaRow}>
                    <span>{featuredPost.category}</span>
                    <span className={styles.metaDot}>•</span>
                    <span className={styles.metaMuted}>{featuredPost.readTime}</span>
                  </div>

                  <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
                  <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>

                  <div className={styles.featuredFooter}>
                    <div className={styles.authorSnippet}>
                      <img
                        src={featuredPost.author.image}
                        alt={featuredPost.author.name}
                        className={styles.authorImgMini}
                      />
                      <div>
                        <div className={styles.authorNameSnippet}>
                          {featuredPost.author.name}
                        </div>
                        <div className={styles.authorRoleSnippet}>
                          {featuredPost.author.role}
                        </div>
                      </div>
                    </div>

                    <span className={styles.readMoreBtn}>
                      <span>Preberi zgodbo</span>
                      <ArrowRightIcon />
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Grid Header & Articles Grid */}
            <div className={styles.gridHeadingRow}>
              <div>
                <span className={styles.gridSectionKicker}>Najnovejše objave</span>
                <h3 className={styles.gridSectionTitle}>Raziščite Kulinarične Zgodbe</h3>
              </div>
            </div>

            <div className={styles.postsGrid}>
              {gridPosts.map((post) => (
                <article
                  key={post.id}
                  className={styles.postCard}
                  onClick={() => openSinglePost(post.id)}
                >
                  <div>
                    <div className={styles.cardImageWrapper}>
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className={styles.cardImg}
                      />
                      <span className={styles.categoryTagFloating}>
                        {post.category}
                      </span>
                    </div>

                    <div className={styles.cardContent}>
                      <div className={styles.cardMetaRow}>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h4 className={styles.cardTitle}>{post.title}</h4>
                      <p className={styles.cardExcerpt}>{post.excerpt}</p>
                    </div>
                  </div>

                  <div className={styles.cardFooter}>
                    <div className={styles.cardAuthorMini}>
                      <img
                        src={post.author.image}
                        alt={post.author.name}
                        className={styles.cardAuthorAvatar}
                      />
                      <span className={styles.cardAuthorName}>
                        {post.author.name}
                      </span>
                    </div>
                    <span className={styles.cardActionLink}>
                      <span>Preberi</span>
                      <ArrowRightIcon />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
