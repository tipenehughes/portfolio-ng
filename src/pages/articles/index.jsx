import Head from 'next/head'
import Image from 'next/image'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { getAllArticles } from '@/lib/getAllArticles'

import zcli from '@/images/zcli.png'
import webhooks from '@/images/webhooks.jpg'

const posts = [
  {
    id: 1,
    title: 'Building your first Zendesk App with ZCLI',
    href: 'https://www.youtube.com/watch?v=brbbx646Va0',
    description:
      "ZCLI is the new command line interface for building Zendesk apps. In this video, you'll learn more about what ZCLI is, why we built it, and also walk through the process of building your first Zendesk app with ZCLI",
    imageUrl: zcli,
  },
  {
    id: 2,
    title: 'How to: Using webhooks at Zendesk',
    href: 'https://www.youtube.com/watch?v=j2Lbe9Ubt4Y',
    description:
      'In this video, we’ll take a look at what webhooks are, how they function, and how to use them at Zendesk.',
    imageUrl: webhooks,
  },
]

function Article({ article }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  )
}

function Video() {
  return (
    <div className="mx-auto  grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-1">
      {posts.map((post) => (
        <article
          key={post.id}
          className="flex flex-col items-start justify-between"
        >
          <div className="relative w-full">
            <Image
              src={post.imageUrl}
              alt=""
              className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
            />

            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
          </div>
          <div className="max-w-xl">
            <div className="group relative">
              <h3 className="mt-3 text-base font-semibold tracking-tight leading-6 text-zinc-800 dark:text-zinc-100">
                <a href={post.href} target="_blank">
                  <span className="absolute inset-0" />
                  {post.title}
                </a>
              </h3>
              <p className="mt-3 line-clamp-3 leading-6 text-sm text-zinc-600 dark:text-zinc-400">
                {post.description}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export default function ArticlesIndex({ articles }) {
  return (
    <>
      <Head>
        <title>Content - Tipene Hughes</title>
        <meta
          name="description"
          content="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
        />
      </Head>
      <div class="flex flex-col md:flex-row">
        <SimpleLayout title="Articles">
          <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
            <div className="flex max-w-3xl flex-col space-y-16">
              {articles.map((article) => (
                <Article key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </SimpleLayout>
        <SimpleLayout title="Videos">
          <div className="flex max-w-3xl flex-col space-y-16">
            <Video />
          </div>
        </SimpleLayout>
      </div>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      articles: (await getAllArticles()).map(({ component, ...meta }) => meta),
    },
  }
}
