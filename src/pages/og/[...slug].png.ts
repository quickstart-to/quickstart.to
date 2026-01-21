import type { APIRoute, GetStaticPaths } from 'astro';
import { getAllQuickstarts } from '@utils/content';
import { getAllPeople } from '@utils/people';
import { generateOgImagePng, generateDefaultOgImage } from '@utils/og-image';
import { DEFAULT_VARIANT } from '@utils/variant';

export const getStaticPaths: GetStaticPaths = async () => {
  const allQuickstarts = await getAllQuickstarts();
  const allPeople = await getAllPeople();
  const paths: { params: { slug: string }; props: { title: string; category: string } }[] = [];

  // Generate OG image path for each quickstart
  for (const quickstart of allQuickstarts) {
    const { id, variant, category, entry } = quickstart;

    if (variant === DEFAULT_VARIANT) {
      // Default variant: /og/{id}.png
      paths.push({
        params: { slug: id },
        props: {
          title: entry.data.title,
          category,
        },
      });
    } else {
      // Other variants: /og/{id}/{variant}.png
      paths.push({
        params: { slug: `${id}/${variant}` },
        props: {
          title: entry.data.title,
          category,
        },
      });
    }
  }

  // Generate OG image path for each people profile
  for (const person of allPeople) {
    const { username, variant, entry } = person;
    const usernameWithoutAt = username.replace(/^@/, '');

    if (variant === DEFAULT_VARIANT) {
      // Default variant: /og/people/{username}.png
      paths.push({
        params: { slug: `people/${usernameWithoutAt}` },
        props: {
          title: entry.data.display_name,
          category: 'people',
        },
      });
    } else {
      // Other variants: /og/people/{username}/{variant}.png
      paths.push({
        params: { slug: `people/${usernameWithoutAt}/${variant}` },
        props: {
          title: entry.data.display_name,
          category: 'people',
        },
      });
    }
  }

  // Add default OG image
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
    // Return default image
    const defaultPng = await generateDefaultOgImage();
    return new Response(defaultPng, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
  }
};
