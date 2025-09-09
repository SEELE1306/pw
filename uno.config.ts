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

        breakpoints: {
            sm: '640px',
            lg: '960px',
        }
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

    /* Mainly to configure markdown elements */
    preflights: [
       {
            getCSS: ({ theme }) => `
                h1 {
                    @apply text-4xl font-serif font-bold text-accent my-4;
                }
                h2 {
                    @apply text-xl font-sans font-bold text-accent my-3;
                }
                h3 {
                    @apply text-lg font-sans font-bold text-accent my-2;
                }
                h4 {
                    @apply text-base font-sans font-bold text-accent my-1;
                }
                * {
                    @apply box-border;
                }
                p { 
                    @apply mb-4; 
                }
                .nav-links {
                    @apply w-100% bg-brand-secondary m-8 hidden;
                }
                .nav-links a {
                    @apply block text-lg ml-8 hover:underline;
                }
                .hamburger {
                    @apply block relative top-8 left-8 pb-4 mb-8 cursor-pointer;
                }
                .hamburger .line {
                    @apply block w-8 h-1 mb-2 bg-accent;                  
                }
                .blog-post {
                    @apply m-8 max-w-75vw;
                }

                @screen sm {
                    .hamburger {
                        @apply hidden;                    
                    }
                    .nav-links {
                        @apply flex static w-auto gap-4 justify-right bg-transparent;
                    }
                    .nav-links a {
                        @apply inline-block ml-0;
                    }
                    .blog-post {
                        @apply max-w-50vw;                    
                    }                
                }
            `,
       }, 
    ]
})