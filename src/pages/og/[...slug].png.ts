import type { APIRoute, GetStaticPaths } from 'astro';
import { getAllQuickstarts } from '@utils/content';
import { generateOgImagePng, generateDefaultOgImage } from '@utils/og-image';
import { defaultLang, supportedLangs, type Lang } from '@i18n/config';

export const getStaticPaths: GetStaticPaths = async () => {
  const allQuickstarts = await getAllQuickstarts();
  const paths: { params: { slug: string }; props: { title: string; category: string } }[] = [];

  // 为每个内容生成 OG 图片路径
  for (const quickstart of allQuickstarts) {
    const { id, lang, category, entry } = quickstart;

    if (lang === defaultLang) {
      // 英文：/og/{id}.png
      paths.push({
        params: { slug: id },
        props: {
          title: entry.data.title,
          category,
        },
      });
    } else {
      // 其他语言：/og/{lang}/{id}.png
      paths.push({
        params: { slug: `${lang}/${id}` },
        props: {
          title: entry.data.title,
          category,
        },
      });
    }
  }

  // 添加默认 OG 图片
  paths.push({
    params: { slug: 'default' },
    props: {
      title: 'quickstart.to',
      category: '',
    },
  });

  return paths;
};

export const GET: APIRoute = async ({ props }) => {
  const { title, category } = props as { title: string; category: string };

  try {
    const png = await generateOgImagePng({
      title,
      category: category || undefined,
    });

    return new Response(png, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error generating OG image:', error);
    // 返回默认图片
    const defaultPng = await generateDefaultOgImage();
    return new Response(defaultPng, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
  }
};
