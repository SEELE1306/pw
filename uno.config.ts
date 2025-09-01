
import { defineConfig } from 'unocss'
import { presetAttributify } from 'unocss'
import { transformerDirectives } from 'unocss'
import presetWind4 from '@unocss/preset-wind4'
import presetWebFonts from '@unocss/preset-web-fonts'

export default defineConfig({
    presets: [
        presetWind4({
            preflights: {
                reset: true,
            }
        }),
        presetAttributify(),
        presetWebFonts({
            provider: 'google',
            fonts: {
                sans: 'Inter',
                serif: 'Shippori Mincho',
                mono: 'Roboto Mono',
            },
        }),
    ],

    theme: {
        colors: {
            accent: '#a57562',
            normal: '#a3a5aa',
            muted: '#6e7074',
            vibrant: '#b5bac1',
            brand: {
                primary: '#262626',
                secondary: '#232323',
                tertiary: '#212121',
                quarternary: '#282828',
                slate: '#191919',
            },
        },
    },

    rules: [
        [/^m-(\d+)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
        [/^p-(\d+)$/, match => ({ padding: `${match[1] / 4}rem` })],

        
        ['bold', { 'font-weight': 700 }],
        ['regular', { 'font-weight': 500 }],
        ['light', { 'font-weight': 300 }],

        ['sans', { 'font-family': 'Inter, sans-serif' }],
        ['serif', { 'font-family': 'Shippori Mincho, serif' }],
        ['mono', { 'font-family': 'Roboto Mono, monospace' }],
    ],

    shortcuts: [
        {
            'btn': 'p-2 m-4 bg-brand-tertiary border-4 border-accent rounded-2xl',
            'text-btn': 'text-3xl text-center font-serif font-bold text-vibrant',
        },
    ],

    transformers: [
        transformerDirectives(),
    ],

    preflights: [
       {
            getCSS: ({ theme }) => `
                h1 {
                    @apply text-4xl font-serif font-bold text-accent mb-4;
                }
                h2 {
                    @apply text-xl font-sans font-bold text-accent mb-2;
                }
                h3 {
                    @apply text-lg font-sans font-bold text-accent;
                }
            `,
       }, 
    ]
})