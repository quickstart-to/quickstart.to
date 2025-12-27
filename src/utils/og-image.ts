import satori from 'satori';
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const WIDTH = 1200;
const HEIGHT = 630;

// 字体缓存
let fontCache: { inter: Buffer; notoSansSC: Buffer } | null = null;

/**
 * 加载本地字体文件
 */
async function loadFonts() {
  if (fontCache) {
    return fontCache;
  }

  // 使用项目根目录的相对路径
  const fontsDir = join(process.cwd(), 'src', 'assets', 'fonts');

  // 加载本地字体文件
  const [inter, notoSansSC] = await Promise.all([
    readFile(join(fontsDir, 'inter-bold.ttf')),
    readFile(join(fontsDir, 'noto-sans-sc-bold.ttf')),
  ]);

  fontCache = { inter, notoSansSC };
  return fontCache;
}

interface OgImageOptions {
  title: string;
  description?: string;
  category?: string;
}

/**
 * 生成 OG 图片 SVG
 */
export async function generateOgImageSvg(options: OgImageOptions): Promise<string> {
  const { title, category } = options;
  const fonts = await loadFonts();

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          padding: '60px',
        },
        children: [
          // Logo / Site name
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: '40px',
                left: '60px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              },
              children: [
                {
                  type: 'span',
                  props: {
                    style: {
                      fontSize: '28px',
                      fontWeight: 700,
                      color: '#ffffff',
                      fontFamily: 'Inter',
                    },
                    children: 'quickstart.to',
                  },
                },
              ],
            },
          },
          // Category tag
          category && {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                padding: '8px 20px',
                borderRadius: '20px',
                background: 'rgba(139, 92, 246, 0.3)',
                border: '1px solid rgba(139, 92, 246, 0.5)',
                marginBottom: '24px',
              },
              children: {
                type: 'span',
                props: {
                  style: {
                    fontSize: '18px',
                    color: '#c4b5fd',
                    fontFamily: 'Inter',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  },
                  children: category,
                },
              },
            },
          },
          // Title
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                maxWidth: '900px',
              },
              children: {
                type: 'span',
                props: {
                  style: {
                    fontSize: title.length > 30 ? '48px' : '64px',
                    fontWeight: 700,
                    color: '#ffffff',
                    fontFamily: 'Inter, Noto Sans SC',
                    lineHeight: 1.2,
                  },
                  children: title,
                },
              },
            },
          },
          // Tagline
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: '40px',
                display: 'flex',
              },
              children: {
                type: 'span',
                props: {
                  style: {
                    fontSize: '20px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontFamily: 'Inter',
                  },
                  children: 'The TL;DR of everything',
                },
              },
            },
          },
        ].filter(Boolean),
      },
    },
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        {
          name: 'Inter',
          data: fonts.inter,
          weight: 700,
          style: 'normal',
        },
        {
          name: 'Noto Sans SC',
          data: fonts.notoSansSC,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );

  return svg;
}

/**
 * 生成 OG 图片 PNG Buffer
 */
export async function generateOgImagePng(options: OgImageOptions): Promise<Buffer> {
  const svg = await generateOgImageSvg(options);
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return png;
}

/**
 * 生成默认 OG 图片
 */
export async function generateDefaultOgImage(): Promise<Buffer> {
  return generateOgImagePng({
    title: 'quickstart.to',
    category: undefined,
  });
}
