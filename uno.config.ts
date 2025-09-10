import { 
    defineConfig, 
    presetAttributify, 
    transformerDirectives, 
    presetTypography, 
    presetWind4, 
    presetWebFonts 
} from 'unocss'


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
        presetTypography({
            selectorName: 'markdown',
            cssExtend: { },
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
            'post-title': 'text-4xl font-serif font-bold text-accent my-4',
            'post-default': 'text-normal markdown markdown-headings:font-bold markdown-headings:text-accent markdown-h2:text-2xl markdown-h3:text-lg markdown-h4:text-base markdown-p:mb-4',
            'link': 'inline-block text-normal hover:underline',
            'nav-link': 'block ml-8 sm:inline-block sm:m-0 text-normal hover:underline',
            'nav': 'w-100% m-8 hidden sm:flex sm:static sm:w-auto sm:gap-4 sm:justify-right',
        },
    ],

    breakpoints: {
        sm: '640px',
        md: '960px',
    },

    transformers: [
        transformerDirectives(),
    ],
})