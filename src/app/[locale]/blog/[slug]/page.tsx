import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localizedSlugUrl } from "@/i18n/urls";
import type { AppLocale } from "@/i18n/urls";
import { SITE_NAME, localeByCode } from "@/data/site";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { BLOG_POSTS, postBySlug } from "@/data/blog";
import styles from "@/components/blog/BlogPageContent.module.css";

const BASE = "https://seherezada.net";

/**
 * Vsaka objava dobi svojo statično stran. Slug pride iz src/data/blog.ts —
 * nova objava tam pomeni novo stran tukaj, brez dodatnega dela.
 */
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

/** Slug, ki ga ni med objavami, vrne 404 namesto prazne strani. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const tm = await getTranslations({ locale, namespace: "meta" });
  const post = postBySlug(slug);

  if (!post) {
    return { title: tm("objavaNiNajdena") };
  }

  // Kanonični naslov kaže na to stran v tem jeziku, ne na slovensko.
  const url = localizedSlugUrl("/blog/[slug]", post.slug, locale as AppLocale);

  return {
    title: tm("objavaNaslov", { naslov: post.title }),
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.isoDate,
      authors: [post.author.name],
      siteName: SITE_NAME,
      locale: localeByCode(locale).hreflang.replace("-", "_"),
      images: [{ url: `${BASE}${post.coverImage}`, width: 1200, height: 630, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  // Drobtine bere Google in jih pokaže pod naslovom v zadetkih.
  const tn = await getTranslations({ locale, namespace: "navigacija" });
  const post = postBySlug(slug);

  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main>
      {/* Isti členi, kot jih gost vidi v drobtinah nad naslovom. */}
      <BreadcrumbJsonLd
        items={[
          { name: tn("domov"), path: "/" },
          { name: tn("blog"), path: "/blog" },
          { name: post.title },
        ]}
      />
      <SiteNavbar activeRoute="blog" />

      <article className={styles.blogSection}>
        <div className={styles.container}>
          <div className={styles.singleArticleWrapper}>
            <nav aria-label="Drobtice" className={styles.breadcrumbNav}>
              <Link href="/" className={styles.breadcrumbLink}>
                {tn("domov")}
              </Link>
              <span className={styles.breadcrumbSeparator}>/</span>
              <Link href="/blog" className={styles.breadcrumbLink}>
                {tn("blog")}
              </Link>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span className={styles.breadcrumbCurrent}>{post.title}</span>
            </nav>

            <span className={styles.singleCategoryPill}>{post.category}</span>

            <h1 className={styles.singleTitle}>{post.title}</h1>
            <p className={styles.singleExcerpt}>{post.excerpt}</p>

            <div className={styles.singleAuthorBar}>
              <div className={styles.singleAuthorLeft}>
                <div>
                  <span className={styles.singleAuthorName}>{post.author.name}</span>
                  <span className={styles.singleAuthorRole}>{post.author.role}</span>
                </div>
              </div>

              <div className={styles.singleMetaRight}>
                <span className={styles.singleMetaItem}>
                  <time dateTime={post.isoDate}>{post.date}</time>
                </span>
                <span className={styles.metaDot} />
                <span className={styles.singleMetaItem}>{post.readTime}</span>
              </div>
            </div>

            <figure className={styles.singleCoverContainer}>
              <Image
                src={post.coverImage}
                alt={post.imageCaption || post.title}
                width={1200}
                height={630}
                priority
                className={styles.singleCoverImg}
              />
              {post.imageCaption && (
                <figcaption className={styles.singleCaption}>{post.imageCaption}</figcaption>
              )}
            </figure>

            <div
              className={styles.singleBodyHtml}
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            {related.length > 0 && (
              <div className={styles.singleActionFooter}>
                <Link href="/blog" className={styles.breadcrumbLink}>
                  &larr; Vse objave
                </Link>
              </div>
            )}
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
